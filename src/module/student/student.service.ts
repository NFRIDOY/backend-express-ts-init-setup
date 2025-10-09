import { CONST } from "../../config";
import AppError from "../../errors/AppError";
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
const updateStudentByStudentIdOnDB = async (studentID: string, payload: Partial<IStudent>): Promise<IStudent | null> => {
  try {
    // TODO: handle update non-primitive date 
    // const { name, guardian, parent, localGuardian, ...restData } = payload;

    // const result = await Student.updateOne({ id: studentID }, payload) // for optimized bendwith // minimul data response
    const result = await Student.findOneAndUpdate({ id: studentID }, payload, {new: true})
    .populate('admissionSemester')
    .populate({
      path: 'user',
      // select: '-_id -password -__v', // Exclude the password field
      select: CONST.defaultClassifiedFields, // Exclude the password field
    });
    return result;
  } catch (err) {
    throw new AppError(400, "Failed To Update The Student");
  }
}

export const studentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentByStudentIdFromDB,
  updateStudentByStudentIdOnDB
}