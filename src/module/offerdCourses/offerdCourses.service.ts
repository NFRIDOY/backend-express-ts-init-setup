
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { offerdCoursesSearchableFields } from "./offerdCourses.constant";
import { IOfferdCourses} from "./offerdCourses.interface";
import { OfferdCoursesModel } from "./offerdCourses.model";

const createOfferdCoursesIntoDB = async (payload: IOfferdCourses) => {

    // check if the semester is exist
    const isAcademicSemesterExists =
        await AcademicSemesterModel.findById(payload?.academicSemester);

    if (!isAcademicSemesterExists) {
        throw new AppError(
            404,
            'This academic semester not found !',
        );
    }

    // check if the semester is already registered!
    const isOfferdCoursesExists = await OfferdCoursesModel.findOne({
        academicSemester: payload?.academicSemester,
    });

    if (isOfferdCoursesExists) {
        throw new AppError(
            409,
            'This semester is already registered!',
        );
    }

    const result = await OfferdCoursesModel.create(payload)
    return result;
}
const getAllOfferdCoursesFromDB = async (query: Record<string, unknown>) => {

    const OfferdCoursesQuery = new QueryBuilder(OfferdCoursesModel.find().populate('academicSemester'),
        query)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await OfferdCoursesQuery.modelQuery;
    return result;
}
const getSingleOfferdCoursesFromDB = async (id: string) => {

    const result = await OfferdCoursesModel.findById(id).populate('academicSemester')
    return result;
}
const updateSingleOfferdCoursesInDB = async (id: string, payload: Partial<IOfferdCourses>,) => {

    const result = await OfferdCoursesModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

export const offerdCoursesServices = {
    createOfferdCoursesIntoDB,
    getAllOfferdCoursesFromDB,
    getSingleOfferdCoursesFromDB,
    updateSingleOfferdCoursesInDB,
}