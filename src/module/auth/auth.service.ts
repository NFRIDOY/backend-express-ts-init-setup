import config, { constants } from "../../../config";
import { AcademicSemesterModel } from "../../academicSemester/academicSemester.model";
import { IStudent } from "../../student/student.interface";
import { StudentModel } from "../../student/student.model";
import { ILoginUser } from "./auth.interface";
import { AuthModel } from "./auth.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./auth.utils";
import AppError from "../../../errors/AppError";
import mongoose from "mongoose";
import { IFaculty } from "../../faculty/faculty.interface";
import { AcademicDepartmentModel } from "../../academicDepartment/academicDepartment.model";
import { FacultyModel } from "../../faculty/faculty.model";
import generateCode from "../../faculty/faculty.generateCode";
import { AdminModel } from "../../admin/admin.model";
import { AuthRole } from "./auth.constant";


const createAuthIntoDB = async (auth: ILoginUser): Promise<ILoginUser> => {
    const result = await AuthModel.create(auth)
    return result;
}
const createStudentIntoDB = async (password: string, payload: IStudent) => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction(); // Start the Transaction
        // console.log({ password })
        // console.log({ payload: payload })
        const authData: Partial<ILoginUser> = {};

        authData.password = password || config.default_pass as string;

        //set student role
        // authData.role = "student";
        authData.role = AuthRole.STUDENT;

        // get academicSemester
        const academicSemester = await AcademicSemesterModel.findOne({
            _id: payload?.admissionSemester
        })

        if (!academicSemester) {
            throw new AppError(404, 'Academic semester not found');
        }

        //set manually generated it
        // authData.id = '2030100002';
        // authData.id = String('2025' + Math.floor(100000 + Math.random()* 900000));

        // Genareted ID
        authData.id = await generateStudentId(academicSemester);

        //set status
        authData.status = "in-progress";

        const newAuth = await AuthModel.create([authData], { session }) // add on the session
        // console.log('newAuth', newAuth);

        if (!newAuth.length) throw new AppError(500, "Auth Creation Failed")

        //create a student
        // if (Object.keys(newAuth).length) {
        if (newAuth.length && payload) {
            // set id as student id, _id as auth
            payload.id = newAuth[0].id;
            payload.auth = newAuth[0]._id; //reference _id

            const newStudent = await StudentModel.create([payload], { session }); // add on the session

            await session.commitTransaction() // sucessfull Transition
            await session.endSession() // End Isolation
            return newStudent;
        }
    } catch (err) {
        await session.abortTransaction() // Unsucessfull Transition
        await session.endSession(); // End Isolation
        throw new AppError(500, "Student Creation Into DB Faild", (config.NODE_ENV === constants.development && err));
    }
}

const createFacultyIntoDB = async (password: string, payload: IFaculty) => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction(); // Start the Transaction
        // console.log({ password })
        // console.log({ payload })
        const authData: Partial<ILoginUser> = {};

        authData.password = password || config.default_pass as string;

        //set faculty role
        // authData.role = 'faculty';
        authData.role = AuthRole.FACULTY;

        // get academicSemester
        const academicDepartment = await AcademicDepartmentModel.findOne({
            _id: payload?.academicDepartment
        })

        if (!academicDepartment) {
            throw new AppError(404, 'Academic Department not found');
        }
        // console.log("academicDepartment", academicDepartment)
        // INFO: Genareted Faculty ID 
        authData.id = await generateFacultyId(academicDepartment);

        //set status
        authData.status = "in-progress";

        const newAuth = await AuthModel.create([authData], { session }) // add on the session
        // console.log('newAuth', newAuth);

        if (!newAuth.length) throw new AppError(500, "Auth Creation Failed")

        // INFO: getall facultyCodes
        const existingCodes = await FacultyModel.find({}, 'facultyCode').lean();
        const existingCodeSet = new Set(existingCodes.map(doc => doc.facultyCode));

        // console.log("existingCodes", existingCodes)
        // console.log("codeSet", existingCodeSet)

        // await session.abortTransaction()
        // throw new AppError(500, "existingCodes")

        //create a student
        // if (Object.keys(newAuth).length) {
        if (newAuth.length && payload) {
            // set id as student id, _id as auth
            payload.id = newAuth[0].id;
            payload.auth = newAuth[0]._id; //reference _id
            payload.facultyCode = await generateCode(payload?.name, existingCodeSet)

            const newFaculty = await FacultyModel.create([payload], { session }); // add on the session

            await session.commitTransaction() // sucessfull Transition
            await session.endSession() // End Isolation
            return newFaculty;
        }
    } catch (err) {
        await session.abortTransaction() // Unsucessfull Transition
        await session.endSession(); // End Isolation
        throw new AppError(500, "Faculty Creation Into DB Faild", (config.NODE_ENV === constants.development && err));
    }
}

// admin
const createAdminIntoDB = async (password: string, payload: IFaculty) => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction(); // Start the Transaction
        // console.log({ password })
        // console.log({ payload })
        const authData: Partial<ILoginUser> = {};

        authData.password = password || config.default_pass as string;

        //set admin role
        // authData.role = 'admin';
        authData.role = AuthRole.ADMIN;

        // TODO: Genareted Admin ID 
        authData.id = await generateAdminId();

        //set status
        authData.status = "in-progress";

        const newAuth = await AuthModel.create([authData], { session }) // add on the session
        // console.log('newAuth', newAuth);

        if (!newAuth.length) throw new AppError(500, "Auth Creation Failed")

        //create a student
        // if (Object.keys(newAuth).length) {
        if (newAuth.length && payload) {
            // set id as student id, _id as auth
            payload.id = newAuth[0].id;
            payload.auth = newAuth[0]._id; //reference _id
            // payload.facultyCode = await generateCode(payload?.name, existingCodeSet)

            const newAdmin = await AdminModel.create([payload], { session }); // add on the session

            await session.commitTransaction() // sucessfull Transition
            await session.endSession() // End Isolation
            return newAdmin;
        }
    } catch (err) {
        await session.abortTransaction() // Unsucessfull Transition
        await session.endSession(); // End Isolation
        throw new AppError(500, "Admin Creation Into DB Faild", (config.NODE_ENV === constants.development && err));
    }
}

const getAllAuthFromDB = async (): Promise<ILoginUser[]> => {
    const result = await AuthModel.find();
    return result;
}
const getSingleAuthByAuthIdFromDB = async (id: string): Promise<ILoginUser | null> => {
    const result = await AuthModel.findOne({ _id: id });
    return result;
}

const deleteStudentByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await StudentModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );
        // console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Student Deleting Process Failed')

        const authDeleted = await AuthModel.findOneAndUpdate(
            { _id: studentDeleted?.auth },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );

        // console.log("authDeleted", authDeleted)
        if (!authDeleted)
            throw new AppError(400, 'Auth Deleting Process Failed')

        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...authDeleted};
        return authDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Student is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedStudentByIdFromDB = async (studentID: string): Promise<ILoginUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await StudentModel.findOneAndUpdate(
            { _id: studentID },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        // console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Student Deleting Process Failed')

        const authDeleted = await AuthModel.findOneAndUpdate(
            { _id: studentDeleted?.auth },
            { isDeleted: false },
            { new: true, session } // Use session here
        );

        // console.log("authDeleted", authDeleted)
        if (!authDeleted)
            throw new AppError(400, 'Auth Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = { ...authDeleted };
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Student is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const deleteFacultyByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );
        // console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const authDeleted = await AuthModel.findOneAndUpdate(
            { _id: studentDeleted?.auth },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );

        // console.log("authDeleted", authDeleted)
        if (!authDeleted)
            throw new AppError(400, 'Auth Deleting Process Failed')

        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...authDeleted};
        return authDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedFacultyByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        // console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const authDeleted = await AuthModel.findOneAndUpdate(
            { _id: studentDeleted?.auth },
            { isDeleted: false },
            { new: true, session } // Use session here
        );

        // console.log("authDeleted", authDeleted)
        if (!authDeleted)
            throw new AppError(400, 'Auth Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = { ...authDeleted };
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const deleteAdminByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );
        // console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const authDeleted = await AuthModel.findOneAndUpdate(
            { _id: studentDeleted?.auth },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );

        // console.log("authDeleted", authDeleted)
        if (!authDeleted)
            throw new AppError(400, 'Auth Deleting Process Failed')

        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...authDeleted};
        return authDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedAdminByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        // console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const authDeleted = await AuthModel.findOneAndUpdate(
            { _id: studentDeleted?.auth },
            { isDeleted: false },
            { new: true, session } // Use session here
        );

        // console.log("authDeleted", authDeleted)
        if (!authDeleted)
            throw new AppError(400, 'Auth Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = { ...authDeleted };
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};

export const authService = {
    createAuthIntoDB,
    getAllAuthFromDB,
    getSingleAuthByAuthIdFromDB,
    
    createStudentIntoDB,
    deleteStudentByIdFromDB,
    undeletedStudentByIdFromDB,

    createFacultyIntoDB,
    deleteFacultyByIdFromDB,
    undeletedFacultyByIdFromDB,

    createAdminIntoDB,
    deleteAdminByIdFromDB,
    undeletedAdminByIdFromDB
}