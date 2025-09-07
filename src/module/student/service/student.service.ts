import { IStudent } from "../interface/student.interface";
import { Student } from "../model/student.model";

const createStudentIntoDB = async (student: IStudent): Promise<IStudent> => {
    const result = await Student.create(student)
    return result;
}

export const studentService = {
    createStudentIntoDB
}