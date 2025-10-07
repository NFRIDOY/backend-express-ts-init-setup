import config from "../../../config";
import { IAcademicSemester } from "../../academicSemester/academicSemester.interface";
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
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
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
    
        const newUser = await UserModel.create([userData], {session})
        console.log('newUser', newUser);
        
        if(!newUser.length) throw new AppError(500, "User Creation Failed")
    
        //create a student
        // if (Object.keys(newUser).length) {
        if (newUser.length && studentData) {
            // set id as student id, _id as user
            studentData.id = newUser[0].id;
            studentData.user = newUser[0]._id; //reference _id
    
            const newStudent = await Student.create([studentData], {session});

            await session.commitTransaction()
            await session.endSession()
            return newStudent;
        }
    } catch (err) {
        await session.abortTransaction()
        await session.endSession();
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

export const userService = {
    createUserIntoDB,
    createStudentIntoDB,
    getAllUserFromDB,
    getSingleUserByUserIdFromDB,
}