import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (student: IStudent): Promise<IStudent> => {
    const result = await Student.create(student)
    return result;
}
const getAllStudentFromDB = async (): Promise<IStudent[]> => {
    // TODO: use populate to get the full details of the student
    const result = await Student.find().populate('admissionSemester');
    return result;
}
const getSingleStudentByStudentIdFromDB = async (studentID: string): Promise<IStudent | null> => {
    // TODO: use populate to get the full details of the student
    const result = await Student.findOne({ id: studentID }).populate('admissionSemester');
    return result;
}

export const studentService = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentByStudentIdFromDB,
}