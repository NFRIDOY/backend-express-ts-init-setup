import config, { constants } from "../../../config";
import { AcademicSemesterModel } from "../../academicSemester/academicSemester.model";
import { IStudent } from "../../student/student.interface";
import { Student } from "../../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../../errors/AppError";
import mongoose from "mongoose";
import { IFaculty } from "../../faculty/faculty.interface";
import { AcademicDepartmentModel } from "../../academicDepartment/academicDepartment.model";
import { FacultyModel } from "../../faculty/faculty.model";
import generateCode from "../../faculty/faculty.generateCode";
import { AdminModel } from "../../admin/admin.model";
import { UserRole } from "./user.constant";


const createUserIntoDB = async (user: IUser): Promise<IUser> => {
    const result = await UserModel.create(user)
    return result;
}
const createStudentIntoDB = async (password: string, payload: IStudent) => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction(); // Start the Transaction
        console.log({ password })
        console.log({ payload: payload })
        const userData: Partial<IUser> = {};

        userData.password = password || config.default_pass as string;

        //set student role
        // userData.role = "student";
        userData.role = UserRole.STUDENT;

        // get academicSemester
        const academicSemester = await AcademicSemesterModel.findOne({
            _id: payload?.admissionSemester
        })

        if (!academicSemester) {
            throw new AppError(404, 'Academic semester not found');
        }

        //set manually generated it
        // userData.id = '2030100002';
        // userData.id = String('2025' + Math.floor(100000 + Math.random()* 900000));

        // Genareted ID
        userData.id = await generateStudentId(academicSemester);

        //set status
        userData.status = "in-progress";

        const newUser = await UserModel.create([userData], { session }) // add on the session
        console.log('newUser', newUser);

        if (!newUser.length) throw new AppError(500, "User Creation Failed")

        //create a student
        // if (Object.keys(newUser).length) {
        if (newUser.length && payload) {
            // set id as student id, _id as user
            payload.id = newUser[0].id;
            payload.user = newUser[0]._id; //reference _id

            const newStudent = await Student.create([payload], { session }); // add on the session

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
        console.log({ password })
        console.log({ payload })
        const userData: Partial<IUser> = {};

        userData.password = password || config.default_pass as string;

        //set faculty role
        // userData.role = 'faculty';
        userData.role = UserRole.FACULTY;

        // get academicSemester
        const academicDepartment = await AcademicDepartmentModel.findOne({
            _id: payload?.academicDepartment
        })

        if (!academicDepartment) {
            throw new AppError(404, 'Academic Department not found');
        }
        console.log("academicDepartment", academicDepartment)
        // INFO: Genareted Faculty ID 
        userData.id = await generateFacultyId(academicDepartment);

        //set status
        userData.status = "in-progress";

        const newUser = await UserModel.create([userData], { session }) // add on the session
        console.log('newUser', newUser);

        if (!newUser.length) throw new AppError(500, "User Creation Failed")

        // INFO: getall facultyCodes
        const existingCodes = await FacultyModel.find({}, 'facultyCode').lean();
        const existingCodeSet = new Set(existingCodes.map(doc => doc.facultyCode));

        console.log("existingCodes", existingCodes)
        console.log("codeSet", existingCodeSet)

        // await session.abortTransaction()
        // throw new AppError(500, "existingCodes")

        //create a student
        // if (Object.keys(newUser).length) {
        if (newUser.length && payload) {
            // set id as student id, _id as user
            payload.id = newUser[0].id;
            payload.user = newUser[0]._id; //reference _id
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
        console.log({ password })
        console.log({ payload })
        const userData: Partial<IUser> = {};

        userData.password = password || config.default_pass as string;

        //set admin role
        // userData.role = 'admin';
        userData.role = UserRole.ADMIN;

        // get academicSemester
        const academicDepartment = await AcademicDepartmentModel.findOne({
            _id: payload?.academicDepartment
        })

        if (!academicDepartment) {
            throw new AppError(404, 'Academic Department not found');
        }
        console.log("academicDepartment", academicDepartment)
        // TODO: Genareted Admin ID 
        // userData.id = await generateAdminId(academicDepartment);

        //set status
        userData.status = "in-progress";

        const newUser = await UserModel.create([userData], { session }) // add on the session
        console.log('newUser', newUser);

        if (!newUser.length) throw new AppError(500, "User Creation Failed")

        //create a student
        // if (Object.keys(newUser).length) {
        if (newUser.length && payload) {
            // set id as student id, _id as user
            payload.id = newUser[0].id;
            payload.user = newUser[0]._id; //reference _id
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

const getAllUserFromDB = async (): Promise<IUser[]> => {
    const result = await UserModel.find();
    return result;
}
const getSingleUserByUserIdFromDB = async (id: string): Promise<IUser | null> => {
    const result = await UserModel.findOne({ _id: id });
    return result;
}

const deleteStudentByIdFromDB = async (id: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await Student.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );
        console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Student Deleting Process Failed')

        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );

        console.log("userDeleted", userDeleted)
        if (!userDeleted)
            throw new AppError(400, 'User Deleting Process Failed')

        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...userDeleted};
        return userDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Student is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedStudentByIdFromDB = async (studentID: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await Student.findOneAndUpdate(
            { _id: studentID },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Student Deleting Process Failed')

        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: false },
            { new: true, session } // Use session here
        );

        console.log("userDeleted", userDeleted)
        if (!userDeleted)
            throw new AppError(400, 'User Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = { ...userDeleted };
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Student is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const deleteFacultyByIdFromDB = async (id: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );
        console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );

        console.log("userDeleted", userDeleted)
        if (!userDeleted)
            throw new AppError(400, 'User Deleting Process Failed')

        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...userDeleted};
        return userDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedFacultyByIdFromDB = async (id: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: false },
            { new: true, session } // Use session here
        );

        console.log("userDeleted", userDeleted)
        if (!userDeleted)
            throw new AppError(400, 'User Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = { ...userDeleted };
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const deleteAdminByIdFromDB = async (id: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );
        console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: true },
            { new: true, session } // Use `session` here // `new` is useing for returning the updated value
        );

        console.log("userDeleted", userDeleted)
        if (!userDeleted)
            throw new AppError(400, 'User Deleting Process Failed')

        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...userDeleted};
        return userDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedAdminByIdFromDB = async (id: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await FacultyModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        console.log("studentDeleted", studentDeleted)
        if (!studentDeleted)
            throw new AppError(400, 'Faculty Deleting Process Failed')

        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: false },
            { new: true, session } // Use session here
        );

        console.log("userDeleted", userDeleted)
        if (!userDeleted)
            throw new AppError(400, 'User Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = { ...userDeleted };
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};

export const userService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserByUserIdFromDB,
    
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