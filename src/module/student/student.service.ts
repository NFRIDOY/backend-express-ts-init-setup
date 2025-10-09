import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (student: IStudent): Promise<IStudent> => {
    const result = await Student.create(student)
    return result;
}
const getAllStudentFromDB = async (): Promise<IStudent[]> => {
    const result = await Student.find().populate('admissionSemester').populate({
      path: 'user',
      select: '-_id -password -__v', // Exclude the password field
    });
    return result;
}
const getSingleStudentByStudentIdFromDB = async (studentID: string): Promise<IStudent | null> => {
    const result = await Student.findOne({ id: studentID }).populate('admissionSemester').populate({
      path: 'user',
      select: '-_id -password -__v', // Exclude the password field
    });
    return result;
}

export const studentService = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentByStudentIdFromDB,
}