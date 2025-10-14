import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import config, { constants } from "../../config";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";

const createCourseIntoDB = async (payload: ICourse): Promise<ICourse> => {
  const result = await CourseModel.create(payload)
  return result;
}

const getAllCourseFromDB = async (query: Record<string, unknown>): Promise<ICourse[]> => {
  const courseQuery = new QueryBuilder(CourseModel.find()
    .populate('preRequisiteCourses.course'), 
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
}
const getSingleCourseByCourseIdFromDB = async (id: string): Promise<ICourse | null> => {
  const result = await CourseModel.findOne({ _id: id }).populate('preRequisiteCourses.course');
  return result;
}

// TODO: Update it with preRequisiteCourses
const updateCourseByCourseIdOnDB = async (id: string, payload: Partial<ICourse>): Promise<ICourse | null> => {
  try {
    const { preRequisiteCourses, ...remainingCourseData } = payload;

    // const modifiedUpdatedData: Record<string, unknown> = {
    //   ...remainingCourseData,
    //   ...(name ? flattenNestedDeepKey('name', name) : {}),
    // };


    // if (name && Object.keys(name).length) {
    //   for (const [key, value] of Object.entries(name)) {
    //     modifiedUpdatedData[`name.${key}`] = value;
    //   }
    // }

    // const result = await CourseModel.updateOne({ id: courseID }, payload) // for optimized bendwith // minimul data response
    const besicCourseData = await CourseModel.findOneAndUpdate(
      { _id: id }, 
      remainingCourseData, 
      { new: true, runValidators: true })
      .populate('preRequisiteCourses.course');

    return besicCourseData;
  } catch (err) {
    throw new AppError(400, "Failed To Update The Course");
  }
}

const deleteCourseByIdFromDB = async (id: string): Promise<ICourse | null> => {
  const session = await mongoose.startSession(); // Isolation
  try {
      session.startTransaction();

      const deletedData = await CourseModel.findOneAndUpdate(
          { _id: id },
          { isDeleted: true },
          { new: true, session } // Use `session` here // `new` is useing for returning the updated value
      );
      console.log("studentDeleted", deletedData)
      
      if (!deletedData)
          throw new AppError(400, 'User Deleting Process Failed')

      // await session.abortTransaction(); // testing
      await session.commitTransaction();

      // const result = {...deletedData};
      return deletedData;
  } catch (err) {
      await session.abortTransaction();
      throw new AppError(400, 'Course is not Deleted', (config.NODE_ENV === constants.development && err));
  } finally {
      session.endSession(); // Ensure session is always ended
  }
};

export const courseService = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseByCourseIdFromDB,
  updateCourseByCourseIdOnDB,
  deleteCourseByIdFromDB
}