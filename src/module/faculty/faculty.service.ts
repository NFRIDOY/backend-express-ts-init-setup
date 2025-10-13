import QueryBuilder from "../../builder/QueryBuilder";
import { constants } from "../../config";
import AppError from "../../errors/AppError";
import flattenNestedDeepKey from "../../utils/flattenNestedDeepKey";
import { facultySearchableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";

const getAllFacultyFromDB = async (query: Record<string, unknown>): Promise<IFaculty[]> => {
  const facultyQuery = new QueryBuilder(FacultyModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'user',
      select: '-password -__v',
    }), query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
}
const getSingleFacultyByFacultyIdFromDB = async (facultyID: string): Promise<IFaculty | null> => {
  const result = await FacultyModel.findOne({ id: facultyID }).populate('admissionSemester').populate({
    path: 'user',
    select: '-password -__v', // Exclude the password field
  });
  return result;
}

const updateFacultyByFacultyIdOnDB = async (facultyID: string, payload: Partial<IFaculty>): Promise<IFaculty | null> => {
  try {
    const { name, ...remainingFacultyData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingFacultyData,
      ...(name ? flattenNestedDeepKey('name', name) : {}),
    };


    // if (name && Object.keys(name).length) {
    //   for (const [key, value] of Object.entries(name)) {
    //     modifiedUpdatedData[`name.${key}`] = value;
    //   }
    // }

    // const result = await FacultyModel.updateOne({ id: facultyID }, payload) // for optimized bendwith // minimul data response
    const result = await FacultyModel.findOneAndUpdate({ id: facultyID }, modifiedUpdatedData, { new: true })
      .populate('admissionSemester')
      .populate({
        path: 'user',
        // select: ' -password -__v', // Exclude the password field
        select: constants.defaultClassifiedFields, // Exclude the password field
      });
    return result;
  } catch (err) {
    throw new AppError(400, "Failed To Update The Faculty");
  }
}

export const facultyService = {
  getAllFacultyFromDB,
  getSingleFacultyByFacultyIdFromDB,
  updateFacultyByFacultyIdOnDB
}