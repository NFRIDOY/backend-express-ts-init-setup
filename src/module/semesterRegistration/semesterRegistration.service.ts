
import { startSession } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { semesterRegistrationSearchableFields } from "./semesterRegistration.constant";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";

const createSemesterRegistrationIntoDB = async (payload: ISemesterRegistration) => {

    // check if the semester is exist
    const isAcademicSemesterExists =
        await AcademicSemesterModel.findById(payload?.academicSemester);

    if (!isAcademicSemesterExists) {
        throw new AppError(
            404,
            'This academic semester not found!',
        );
    }

    // check if the semester is already registered!
    const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
        academicSemester: payload?.academicSemester,
    });

    if (isSemesterRegistrationExists) {
        throw new AppError(
            409,
            'This semester is already registered!',
        );
    }

    const result = await SemesterRegistrationModel.create(payload)
    return result;
}
const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

    const SemesterRegistrationQuery = new QueryBuilder(SemesterRegistrationModel.find().populate('academicSemester'),
        query)
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await SemesterRegistrationQuery.modelQuery;
    return result;
}
const getSingleSemesterRegistrationFromDB = async (id: string) => {

    const result = await SemesterRegistrationModel.findById(id).populate('academicSemester')
    return result;
}
const updateSingleSemesterRegistrationInDB = async (id: string, payload: Partial<ISemesterRegistration>,) => {

    const result = await SemesterRegistrationModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

const destroySemesterRegistrationWithOfferdCoursesFromDB = async (id: string) => {

    const session = await startSession();
    try {
        await session.startTransaction();

        // delete Accociated OfferCourses
        const deletedOfferCourses = await OfferedCourseModel.deleteMany({
            semesterRegistration: id,
        }, { session })

        if(deletedOfferCourses.deletedCount === 0) {
            throw new AppError(500, "Failed to Delete Offer Courses from Semester Registration")
        }
        console.log({isDeletedOfferCourses: deletedOfferCourses})
        // TODO: test delete oparation and remove 'abortTransaction()'
        await session.abortTransaction();
        const result = await SemesterRegistrationModel.deleteOne({ _id: id }, { session })
        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw new AppError(500, "Failed to Delete Semester Registration ")

    } finally {
        await session.endSession();
    }

}

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSingleSemesterRegistrationInDB,

    destroySemesterRegistrationWithOfferdCoursesFromDB,

}