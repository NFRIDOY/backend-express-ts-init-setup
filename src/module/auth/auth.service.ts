import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import AppError from "../../errors/AppError";
import { IAdmin } from "../admin/admin.interface";
import { UserModel } from "../common/user/user.model";
import { ILoginUser } from "./auth.interface";
import { Status } from '../common/user/user.constant';
import jwt from 'jsonwebtoken';
import config from '../../config';


const loginUser = async (loginUser: ILoginUser) => {

    const { id, password } = loginUser;
    // normal findOne
    // const user = await UserModel.findOne({ id: id })
   
    // mongoose statics method
    const user = await UserModel.isUserExistByCustomID(id)

    if (!user) {
        throw new AppError(404, "User Dosen't Exists") // User or Password doesn't match
    }

    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }
    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === Status.BLOCKED) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Login Failed") // User or Password doesn't match
    }

    const jwtPayload = {
        userId: user.id,
        userRole: user.role,
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret_key, {
        expiresIn: 60 * 60
    })

    // send jwt
    if (match) {
        //login
        console.log("matched")
        return true;
    }
}

// const signupStudentIntoDB = async (password: string, payload: IStudent) => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction(); // Start the Transaction
//         // console.log({ password })
//         // console.log({ payload: payload })
//         const loginUserData: Partial<ILoginUser> = {};

//         loginUserData.password = password || config.default_pass as string;

//         //set student role
//         // loginUserData.role = "student";
//         loginUserData.role = LoginUserRole.STUDENT;

//         // get academicSemester
//         const academicSemester = await AcademicSemesterModel.findOne({
//             _id: payload?.admissionSemester
//         })

//         if (!academicSemester) {
//             throw new AppError(404, 'Academic semester not found');
//         }

//         //set manually generated it
//         // loginUserData.id = '2030100002';
//         // loginUserData.id = String('2025' + Math.floor(100000 + Math.random()* 900000));

//         // Genareted ID
//         loginUserData.id = await generateStudentId(academicSemester);

//         //set status
//         loginUserData.status = "in-progress";

//         const newLoginUser = await LoginUserModel.create([loginUserData], { session }) // add on the session
//         // console.log('newLoginUser', newLoginUser);

//         if (!newLoginUser.length) throw new AppError(500, "LoginUser Creation Failed")

//         //create a student
//         // if (Object.keys(newLoginUser).length) {
//         if (newLoginUser.length && payload) {
//             // set id as student id, _id as loginUser
//             payload.id = newLoginUser[0].id;
//             payload.loginUser = newLoginUser[0]._id; //reference _id

//             const newStudent = await StudentModel.create([payload], { session }); // add on the session

//             await session.commitTransaction() // sucessfull Transition
//             await session.endSession() // End Isolation
//             return newStudent;
//         }
//     } catch (err) {
//         await session.abortTransaction() // Unsucessfull Transition
//         await session.endSession(); // End Isolation
//         throw new AppError(500, "Student Creation Into DB Faild", (config.NODE_ENV === constants.development && err));
//     }
// }

// const signupFacultyIntoDB = async (password: string, payload: IFaculty) => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction(); // Start the Transaction
//         // console.log({ password })
//         // console.log({ payload })
//         const loginUserData: Partial<ILoginUser> = {};

//         loginUserData.password = password || config.default_pass as string;

//         //set faculty role
//         // loginUserData.role = 'faculty';
//         loginUserData.role = LoginUserRole.FACULTY;

//         // get academicSemester
//         const academicDepartment = await AcademicDepartmentModel.findOne({
//             _id: payload?.academicDepartment
//         })

//         if (!academicDepartment) {
//             throw new AppError(404, 'Academic Department not found');
//         }
//         // console.log("academicDepartment", academicDepartment)
//         // INFO: Genareted Faculty ID 
//         loginUserData.id = await generateFacultyId(academicDepartment);

//         //set status
//         loginUserData.status = "in-progress";

//         const newLoginUser = await LoginUserModel.create([loginUserData], { session }) // add on the session
//         // console.log('newLoginUser', newLoginUser);

//         if (!newLoginUser.length) throw new AppError(500, "LoginUser Creation Failed")

//         // INFO: getall facultyCodes
//         const existingCodes = await FacultyModel.find({}, 'facultyCode').lean();
//         const existingCodeSet = new Set(existingCodes.map(doc => doc.facultyCode));

//         // console.log("existingCodes", existingCodes)
//         // console.log("codeSet", existingCodeSet)

//         // await session.abortTransaction()
//         // throw new AppError(500, "existingCodes")

//         //create a student
//         // if (Object.keys(newLoginUser).length) {
//         if (newLoginUser.length && payload) {
//             // set id as student id, _id as loginUser
//             payload.id = newLoginUser[0].id;
//             payload.loginUser = newLoginUser[0]._id; //reference _id
//             payload.facultyCode = await generateCode(payload?.name, existingCodeSet)

//             const newFaculty = await FacultyModel.create([payload], { session }); // add on the session

//             await session.commitTransaction() // sucessfull Transition
//             await session.endSession() // End Isolation
//             return newFaculty;
//         }
//     } catch (err) {
//         await session.abortTransaction() // Unsucessfull Transition
//         await session.endSession(); // End Isolation
//         throw new AppError(500, "Faculty Creation Into DB Faild", (config.NODE_ENV === constants.development && err));
//     }
// }

// // admin
// const signupAdminIntoDB = async (password: string, payload: IAdmin) => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction(); // Start the Transaction
//         // console.log({ password })
//         // console.log({ payload })
//         const loginUserData: Partial<ILoginUser> = {};

//         loginUserData.password = password || config.default_pass as string;

//         //set admin role
//         // loginUserData.role = 'admin';
//         loginUserData.role = LoginUserRole.ADMIN;

//         // TODO: Genareted Admin ID 
//         loginUserData.id = await generateAdminId();

//         //set status
//         loginUserData.status = "in-progress";

//         const newLoginUser = await LoginUserModel.create([loginUserData], { session }) // add on the session
//         // console.log('newLoginUser', newLoginUser);

//         if (!newLoginUser.length) throw new AppError(500, "LoginUser Creation Failed")

//         //create a student
//         // if (Object.keys(newLoginUser).length) {
//         if (newLoginUser.length && payload) {
//             // set id as student id, _id as loginUser
//             payload.id = newLoginUser[0].id;
//             payload.loginUser = newLoginUser[0]._id; //reference _id
//             // payload.facultyCode = await generateCode(payload?.name, existingCodeSet)

//             const newAdmin = await AdminModel.create([payload], { session }); // add on the session

//             await session.commitTransaction() // sucessfull Transition
//             await session.endSession() // End Isolation
//             return newAdmin;
//         }
//     } catch (err) {
//         await session.abortTransaction() // Unsucessfull Transition
//         await session.endSession(); // End Isolation
//         throw new AppError(500, "Admin Creation Into DB Faild", (config.NODE_ENV === constants.development && err));
//     }
// }

// const getAllLoginUserFromDB = async (): Promise<ILoginUser[]> => {
//     const result = await LoginUserModel.find();
//     return result;
// }
// const getSingleLoginUserByLoginUserIdFromDB = async (id: string): Promise<ILoginUser | null> => {
//     const result = await LoginUserModel.findOne({ _id: id });
//     return result;
// }

// const deleteStudentByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction();

//         const studentDeleted = await StudentModel.findOneAndUpdate(
//             { _id: id },
//             { isDeleted: true },
//             { new: true, session } // Use `session` here // `new` is useing for returning the updated value
//         );
//         // console.log("studentDeleted", studentDeleted)
//         if (!studentDeleted)
//             throw new AppError(400, 'Student Deleting Process Failed')

//         const loginUserDeleted = await LoginUserModel.findOneAndUpdate(
//             { _id: studentDeleted?.loginUser },
//             { isDeleted: true },
//             { new: true, session } // Use `session` here // `new` is useing for returning the updated value
//         );

//         // console.log("loginUserDeleted", loginUserDeleted)
//         if (!loginUserDeleted)
//             throw new AppError(400, 'LoginUser Deleting Process Failed')

//         // await session.abortTransaction(); // testing
//         await session.commitTransaction();

//         // const result = {...loginUserDeleted};
//         return loginUserDeleted;
//     } catch (err) {
//         await session.abortTransaction();
//         throw new AppError(400, 'Student is not Deleted', (config.NODE_ENV === constants.development && err));
//     } finally {
//         session.endSession(); // Ensure session is always ended
//     }
// };
// const undeletedStudentByIdFromDB = async (studentID: string): Promise<ILoginUser | null> => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction();

//         const studentDeleted = await StudentModel.findOneAndUpdate(
//             { _id: studentID },
//             { isDeleted: false },
//             { new: true, session } // Use session here
//         );
//         // console.log("studentDeleted", studentDeleted)
//         if (!studentDeleted)
//             throw new AppError(400, 'Student Deleting Process Failed')

//         const loginUserDeleted = await LoginUserModel.findOneAndUpdate(
//             { _id: studentDeleted?.loginUser },
//             { isDeleted: false },
//             { new: true, session } // Use session here
//         );

//         // console.log("loginUserDeleted", loginUserDeleted)
//         if (!loginUserDeleted)
//             throw new AppError(400, 'LoginUser Deleting Process Failed')
//         // await session.abortTransaction(); // testing
//         await session.commitTransaction();

//         const result = { ...loginUserDeleted };
//         return result;
//     } catch (err) {
//         await session.abortTransaction();
//         throw new AppError(400, 'Student is not Deleted', (config.NODE_ENV === constants.development && err));
//     } finally {
//         session.endSession(); // Ensure session is always ended
//     }
// };
// const deleteFacultyByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction();

//         const studentDeleted = await FacultyModel.findOneAndUpdate(
//             { _id: id },
//             { isDeleted: true },
//             { new: true, session } // Use `session` here // `new` is useing for returning the updated value
//         );
//         // console.log("studentDeleted", studentDeleted)
//         if (!studentDeleted)
//             throw new AppError(400, 'Faculty Deleting Process Failed')

//         const loginUserDeleted = await LoginUserModel.findOneAndUpdate(
//             { _id: studentDeleted?.loginUser },
//             { isDeleted: true },
//             { new: true, session } // Use `session` here // `new` is useing for returning the updated value
//         );

//         // console.log("loginUserDeleted", loginUserDeleted)
//         if (!loginUserDeleted)
//             throw new AppError(400, 'LoginUser Deleting Process Failed')

//         // await session.abortTransaction(); // testing
//         await session.commitTransaction();

//         // const result = {...loginUserDeleted};
//         return loginUserDeleted;
//     } catch (err) {
//         await session.abortTransaction();
//         throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
//     } finally {
//         session.endSession(); // Ensure session is always ended
//     }
// };
// const undeletedFacultyByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction();

//         const studentDeleted = await FacultyModel.findOneAndUpdate(
//             { _id: id },
//             { isDeleted: false },
//             { new: true, session } // Use session here
//         );
//         // console.log("studentDeleted", studentDeleted)
//         if (!studentDeleted)
//             throw new AppError(400, 'Faculty Deleting Process Failed')

//         const loginUserDeleted = await LoginUserModel.findOneAndUpdate(
//             { _id: studentDeleted?.loginUser },
//             { isDeleted: false },
//             { new: true, session } // Use session here
//         );

//         // console.log("loginUserDeleted", loginUserDeleted)
//         if (!loginUserDeleted)
//             throw new AppError(400, 'LoginUser Deleting Process Failed')
//         // await session.abortTransaction(); // testing
//         await session.commitTransaction();

//         const result = { ...loginUserDeleted };
//         return result;
//     } catch (err) {
//         await session.abortTransaction();
//         throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
//     } finally {
//         session.endSession(); // Ensure session is always ended
//     }
// };
// const deleteAdminByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction();

//         const studentDeleted = await FacultyModel.findOneAndUpdate(
//             { _id: id },
//             { isDeleted: true },
//             { new: true, session } // Use `session` here // `new` is useing for returning the updated value
//         );
//         // console.log("studentDeleted", studentDeleted)
//         if (!studentDeleted)
//             throw new AppError(400, 'Faculty Deleting Process Failed')

//         const loginUserDeleted = await LoginUserModel.findOneAndUpdate(
//             { _id: studentDeleted?.loginUser },
//             { isDeleted: true },
//             { new: true, session } // Use `session` here // `new` is useing for returning the updated value
//         );

//         // console.log("loginUserDeleted", loginUserDeleted)
//         if (!loginUserDeleted)
//             throw new AppError(400, 'LoginUser Deleting Process Failed')

//         // await session.abortTransaction(); // testing
//         await session.commitTransaction();

//         // const result = {...loginUserDeleted};
//         return loginUserDeleted;
//     } catch (err) {
//         await session.abortTransaction();
//         throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
//     } finally {
//         session.endSession(); // Ensure session is always ended
//     }
// };
// const undeletedAdminByIdFromDB = async (id: string): Promise<ILoginUser | null> => {
//     const session = await mongoose.startSession(); // Isolation
//     try {
//         session.startTransaction();

//         const studentDeleted = await FacultyModel.findOneAndUpdate(
//             { _id: id },
//             { isDeleted: false },
//             { new: true, session } // Use session here
//         );
//         // console.log("studentDeleted", studentDeleted)
//         if (!studentDeleted)
//             throw new AppError(400, 'Faculty Deleting Process Failed')

//         const loginUserDeleted = await LoginUserModel.findOneAndUpdate(
//             { _id: studentDeleted?.loginUser },
//             { isDeleted: false },
//             { new: true, session } // Use session here
//         );

//         // console.log("loginUserDeleted", loginUserDeleted)
//         if (!loginUserDeleted)
//             throw new AppError(400, 'LoginUser Deleting Process Failed')
//         // await session.abortTransaction(); // testing
//         await session.commitTransaction();

//         const result = { ...loginUserDeleted };
//         return result;
//     } catch (err) {
//         await session.abortTransaction();
//         throw new AppError(400, 'Faculty is not Deleted', (config.NODE_ENV === constants.development && err));
//     } finally {
//         session.endSession(); // Ensure session is always ended
//     }
// };

export const loginUserService = {
    loginUser,

    // signupLoginUserIntoDB,
    // getAllLoginUserFromDB,
    // getSingleLoginUserByLoginUserIdFromDB,

    // signupStudentIntoDB,
    // deleteStudentByIdFromDB,
    // undeletedStudentByIdFromDB,

    // signupFacultyIntoDB,
    // deleteFacultyByIdFromDB,
    // undeletedFacultyByIdFromDB,

    // signupAdminIntoDB,
    // deleteAdminByIdFromDB,
    // undeletedAdminByIdFromDB
}