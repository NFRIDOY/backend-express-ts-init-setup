import { IStudent } from "../interface/student.interface";
import { Student } from "../model/student.model";

const createStudentIntoDB = async (student: IStudent): Promise<IStudent> => {
    const result = await Student.create(student)
    return result;
}
const getAllStudentFromDB = async (): Promise<IStudent[]> => {
    const result = await Student.find();
    return result;
}
const getSingleStudentByStudentIdFromDB = async (studentID: string): Promise<IStudent | null> => {
    const result = await Student.findOne({ id: studentID });
    return result;
}

export const studentService = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentByStudentIdFromDB,
}