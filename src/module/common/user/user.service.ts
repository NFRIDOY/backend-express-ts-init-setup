import config from "../../../config";
import { AcademicSemesterModel } from "../../academicSemester/academicSemester.model";
import { IStudent } from "../../student/student.interface";
import { Student } from "../../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../../errors/AppError";
import mongoose from "mongoose";


const createUserIntoDB = async (user: IUser): Promise<IUser> => {
    const result = await UserModel.create(user)
    return result;
}
const createStudentIntoDB = async (password: string, studentData: IStudent) => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction(); // Start the Transaction
        console.log({ password })
        console.log({ studentData })
        const userData: Partial<IUser> = {};

        userData.password = password || config.default_pass as string;

        //set student role
        userData.role = "student";

        // get academicSemester
        const academicSemester = await AcademicSemesterModel.findOne({
            _id: studentData?.admissionSemester
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
        if (newUser.length && studentData) {
            // set id as student id, _id as user
            studentData.id = newUser[0].id;
            studentData.user = newUser[0]._id; //reference _id

            const newStudent = await Student.create([studentData], { session }); // add on the session

            await session.commitTransaction() // sucessfull Transition
            await session.endSession() // End Isolation
            return newStudent;
        }
    } catch (err) {
        await session.abortTransaction() // Unsucessfull Transition
        await session.endSession(); // End Isolation
        throw new AppError(500, "Student Creation Into DB Faild", err);
    }
}
const getAllUserFromDB = async (): Promise<IUser[]> => {
    const result = await UserModel.find();
    return result;
}
const getSingleUserByUserIdFromDB = async (userID: string): Promise<IUser | null> => {
    const result = await UserModel.findOne({ id: userID });
    return result;
}

const deleteStudentByStudentIdFromDB = async (studentID: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await Student.findOneAndUpdate(
            { id: studentID },
            { isDeleted: true },
            { new: true, session } // Use session here
        );
        console.log("studentDeleted", studentDeleted)
        if(!studentDeleted) 
            throw new AppError(400, 'Student Deleting Process Failed')
        
        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: true },
            { new: true, session } // Use session here
        );
        
        console.log("userDeleted", userDeleted)
        if(!userDeleted) 
            throw new AppError(400, 'User Deleting Process Failed')
        
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        // const result = {...userDeleted};
        return userDeleted;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Student is not Deleted', err);
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};
const undeletedStudentByStudentIdFromDB = async (studentID: string): Promise<IUser | null> => {
    const session = await mongoose.startSession(); // Isolation
    try {
        session.startTransaction();

        const studentDeleted = await Student.findOneAndUpdate(
            { id: studentID },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        console.log("studentDeleted", studentDeleted)
        if(!studentDeleted) 
            throw new AppError(400, 'Student Deleting Process Failed')
        
        const userDeleted = await UserModel.findOneAndUpdate(
            { _id: studentDeleted?.user },
            { isDeleted: false },
            { new: true, session } // Use session here
        );
        
        console.log("userDeleted", userDeleted)
        if(!userDeleted) 
            throw new AppError(400, 'User Deleting Process Failed')
        // await session.abortTransaction(); // testing
        await session.commitTransaction();

        const result = {...userDeleted};
        return result;
    } catch (err) {
        await session.abortTransaction();
        throw new AppError(400, 'Student is not Deleted', err);
    } finally {
        session.endSession(); // Ensure session is always ended
    }
};

export const userService = {
    createUserIntoDB,
    createStudentIntoDB,
    getAllUserFromDB,
    getSingleUserByUserIdFromDB,

    deleteStudentByStudentIdFromDB,
    undeletedStudentByStudentIdFromDB
}