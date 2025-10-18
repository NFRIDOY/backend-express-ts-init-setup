import QueryBuilder from "../../builder/QueryBuilder";
import { constants } from "../../config";
import AppError from "../../errors/AppError";
import flattenNestedDeepKey from "../../utils/flattenNestedDeepKey";
import { studentSearchableFields } from "./student.constant";
import { IStudent } from "./student.interface";
import { StudentModel } from "./student.model";

// const createStudentIntoDB = async (student: IStudent): Promise<IStudent> => {
//   const result = await Student.create(student)
//   return result;
// }
const getAllStudentFromDB = async (query: Record<string, unknown>): Promise<IStudent[]> => {
  // const result = await Student.find().populate('admissionSemester').populate({
  //   path: 'user',
  //   select: ' -password -__v', // Exclude the password field
  // });
  const studentQuery = new QueryBuilder(StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'user',
      select: ' -password -__v',
    }), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
}
const getSingleStudentByStudentIdFromDB = async (studentID: string): Promise<IStudent | null> => {
  const result = await StudentModel.findOne({ id: studentID }).populate('admissionSemester').populate({
    path: 'user',
    select: ' -password -__v', // Exclude the password field
  });
  return result;
}

const updateStudentByStudentIdOnDB = async (studentID: string, payload: Partial<IStudent>): Promise<IStudent | null> => {
  try {
    const { name, guardian, parent, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
      ...(name ? flattenNestedDeepKey('name', name) : {}),
      ...(guardian ? flattenNestedDeepKey('guardian', guardian) : {}),
      ...(localGuardian ? flattenNestedDeepKey('localGuardian', localGuardian) : {}),
      ...(Array.isArray(parent) ? { parent } : {}) // keep array as-is
    };


    // if (name && Object.keys(name).length) {
    //   for (const [key, value] of Object.entries(name)) {
    //     modifiedUpdatedData[`name.${key}`] = value;
    //   }
    // }

    // const result = await Student.updateOne({ id: studentID }, payload) // for optimized bendwith // minimul data response
    const result = await StudentModel.findOneAndUpdate({ id: studentID }, modifiedUpdatedData, { new: true })
      .populate('admissionSemester')
      .populate({
        path: 'user',
        // select: ' -password -__v', // Exclude the password field
        select: constants.defaultClassifiedFields, // Exclude the password field
      });
    return result;
  } catch (err) {
    throw new AppError(400, "Failed To Update The Student");
  }
}

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentByStudentIdFromDB,
  updateStudentByStudentIdOnDB
}