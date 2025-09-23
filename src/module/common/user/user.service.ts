import config from "../../../config";
import { IStudent } from "../../student/student.interface";
import { Student } from "../../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDB = async (user: IUser): Promise<IUser> => {
    const result = await UserModel.create(user)
    return result;
}
const createStudentIntoDB = async (password: string, studentData: IStudent) => {
    console.log({password})
    console.log({studentData})
    const userData: Partial<IUser> = {};

    userData.password = password || config.default_pass as string;

    //set student role
    userData.role = "student";

    //set manually generated it
    userData.id = '2030100002';
    // userData.id = String(Math.random()).slice(2, 11);

    //set status
    userData.status = "in-progress";

    const newUser = await UserModel.create(userData)
    console.log('newUser', newUser);

    //create a student
    // if (Object.keys(newUser).length) {
    if (newUser && studentData) {
        // set id as student id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference _id

        const newStudent = await Student.create(studentData);
        return newStudent;
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