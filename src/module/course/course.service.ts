import mongoose, { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import config, { constants } from "../../config";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.constant";
import { ICourse, ICourseFacultyAssignment } from "./course.interface";
import { CourseFacultyAssignmentModel, CourseModel } from "./course.model";
import { IFaculty } from "../faculty/faculty.interface";
import { $ZodIntersection } from "zod/v4/core";

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

      // TODO: preRequisiteCourses UPDATE

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
    // console.log("studentDeleted", deletedData)

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
    // - Initialize an empty array to hold normalized ObjectIds
    let facultyIds: Types.ObjectId[] = [];

    // - Check if payload is a non-empty array of strings (e.g. ["id1", "id2"])
    if (Array.isArray(payload) && payload.length > 0 && typeof payload[0] === 'string') {
      // - Cast payload to string[] and convert each ID to a MongoDB ObjectId
      const stringArray = payload as string[];
      facultyIds = stringArray.map((facultyId) => new Types.ObjectId(facultyId));
    } else {
      // - Otherwise, assume payload is an array of objects with a `faculties` field
      const objectArray = payload as Partial<ICourseFacultyAssignment>[];

      // - Flatten all `faculties` arrays and convert each ID to ObjectId
      facultyIds = objectArray.flatMap((item) =>
        item.faculties?.map((facultyId) => new Types.ObjectId(facultyId)) || []
      );
    }

    /**
     * This block of code is designed to normalize a flexible `payload` into a consistent array of MongoDB `ObjectId`s, which is essential for safely performing database operations. It begins by initializing an empty array called `facultyIds`. Then, it checks whether the `payload` is a non-empty array of strings—typically representing raw faculty IDs. If so, it casts the array to `string[]` and maps each string into a `Types.ObjectId`, ensuring proper MongoDB typing. If the payload is not a string array, it assumes the input is an array of objects that follow the `ICourseFacultyAssignment` structure. It then uses `flatMap` to extract the `faculties` array from each object, maps each faculty ID to an `ObjectId`, and flattens the result into a single array. This approach ensures that regardless of whether the input is a simple list of IDs or a structured object, the resulting `facultyIds` array is clean, type-safe, and ready for use in MongoDB queries or updates.

     */

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

const removeFacultiesWithCourseFromDB = async (
  id: string,
  payload: Partial<ICourseFacultyAssignment>[] | string[]
) => {
  try {
    // Normalize payload to array of ObjectIds
    // - Initialize an empty array to hold normalized ObjectIds
    let facultyIds: Types.ObjectId[] = [];

    // - Check if payload is a non-empty array of strings (e.g. ["id1", "id2"])
    if (Array.isArray(payload) && payload.length > 0 && typeof payload[0] === 'string') {
      // - Cast payload to string[] and convert each ID to a MongoDB ObjectId
      const stringArray = payload as string[];
      facultyIds = stringArray.map((facultyId) => new Types.ObjectId(facultyId));
    } else {
      // - Otherwise, assume payload is an array of objects with a `faculties` field
      const objectArray = payload as Partial<ICourseFacultyAssignment>[];

      // - Flatten all `faculties` arrays and convert each ID to ObjectId
      facultyIds = objectArray.flatMap((item) =>
        item.faculties?.map((facultyId) => new Types.ObjectId(facultyId)) || []
      );
    }

    /**
     * This block of code is designed to normalize a flexible `payload` into a consistent array of MongoDB `ObjectId`s, which is essential for safely performing database operations. It begins by initializing an empty array called `facultyIds`. Then, it checks whether the `payload` is a non-empty array of strings—typically representing raw faculty IDs. If so, it casts the array to `string[]` and maps each string into a `Types.ObjectId`, ensuring proper MongoDB typing. If the payload is not a string array, it assumes the input is an array of objects that follow the `ICourseFacultyAssignment` structure. It then uses `flatMap` to extract the `faculties` array from each object, maps each faculty ID to an `ObjectId`, and flattens the result into a single array. This approach ensures that regardless of whether the input is a simple list of IDs or a structured object, the resulting `facultyIds` array is clean, type-safe, and ready for use in MongoDB queries or updates.

     */

    const assignedData = await CourseFacultyAssignmentModel.findByIdAndUpdate(
      id,
      {
        course: new Types.ObjectId(id),
        $pull: {
          faculties: { $in: facultyIds }
        }
      },
      { new: true }
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
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
}

/** Doc: 
 * $addToSet: add without dublication, 
 * $in: insert array data into array  
 * */