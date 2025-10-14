import mongoose, { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import config, { constants } from "../../config";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { ICourse, ICourseFacultyAssignment } from "./course.interface";
import { CourseFacultyAssignmentModel, CourseModel } from "./course.model";
import { IFaculty } from "../faculty/faculty.interface";

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

// const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<ICourseFacultyAssignment>[] | string[]) => {
//   try {
//     // Handle both array of faculty IDs or object with faculties property
//     // const facultyIds = payload.map(id => new Types.ObjectId(id));

//     // console.log("facultyIds", facultyIds)
    
//     const assignedData = await CourseFacultyAssignmentModel.findByIdAndUpdate(
//       id,
//       {
//         course: id,
//         $addToSet: { faculties: [{ $each: payload }] } /** $addToSet: add without dublication, * $in: insert array data into array  */
//       },
//       { new: true, upsert: true }
//     );
//     // console.log("assignFacultiesWithcourseIntoDB", assignedData)

//     if (!assignedData)
//       throw new AppError(400, 'User Deleting Process Failed')


//     // const result = {...deletedData};
//     return assignedData;
//   } catch (err) {
//     throw new AppError(400, 'Faculty Assigned Failed to Course', (config.NODE_ENV === constants.development && err));
//   }
// };


const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<ICourseFacultyAssignment>[] | string[]
) => {
  try {
    // Normalize payload to array of ObjectIds
    const facultyIds: Types.ObjectId[] = Array.isArray(payload)
      ? payload.map(facultyId => new Types.ObjectId(facultyId))
      : payload.flatMap(item => item.faculties?.map(facultyId => new Types.ObjectId(facultyId)) || []);

    const assignedData = await CourseFacultyAssignmentModel.findByIdAndUpdate(
      id,
      {
        course: new Types.ObjectId(id),
        $addToSet: {
          faculties: { $each: facultyIds }
        }
      },
      { new: true, upsert: true }
    );

    if (!assignedData) {
      throw new AppError(400, 'Faculty assignment failed: no data returned');
    }

    return assignedData;
  } catch (err) {
    throw new AppError(
      400,
      'Faculty Assigned Failed to Course',
      config.NODE_ENV === constants.development ? err : undefined
    );
  }
};

export const courseService = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseByCourseIdFromDB,
  updateCourseByCourseIdOnDB,
  deleteCourseByIdFromDB,
  assignFacultiesWithCourseIntoDB
}

/** Doc: 
 * $addToSet: add without dublication, 
 * $in: insert array data into array  
 * */