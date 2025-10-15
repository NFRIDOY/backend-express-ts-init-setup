
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model";
import { semesterRegistrationSearchableFields } from "./semesterRegistration.constant";
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: ISemesterRegistration) => {

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

export const semesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSingleSemesterRegistrationInDB,
}