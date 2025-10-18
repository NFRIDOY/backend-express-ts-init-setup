
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {

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
    const isOfferedCourseExists = await OfferedCourseModel.findOne({
        academicSemester: payload?.academicSemester,
    });

    if (isOfferedCourseExists) {
        throw new AppError(
            409,
            'This semester is already registered!',
        );
    }

    const result = await OfferedCourseModel.create(payload)
    return result;
}
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {

    const OfferedCourseQuery = new QueryBuilder(OfferedCourseModel.find().populate('academicSemester'),
        query)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await OfferedCourseQuery.modelQuery;
    return result;
}
const getSingleOfferedCourseFromDB = async (id: string) => {

    const result = await OfferedCourseModel.findById(id).populate('academicSemester')
    return result;
}
const updateSingleOfferedCourseInDB = async (id: string, payload: Partial<IOfferedCourse>,) => {

    const result = await OfferedCourseModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateSingleOfferedCourseInDB,
}