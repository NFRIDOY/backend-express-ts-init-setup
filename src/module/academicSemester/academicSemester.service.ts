import { AcademicSemesterModel } from "./academicSemester.model";
import { academicSemesterNameCodeMapper, IAcademicSemester } from "./academicSemester.interface";
import AppError from "../../errors/AppError";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(400, 'Invalid Semester Code Or Name');
    }

    const result = await AcademicSemesterModel.create(payload)
    return result;
}
const getAllAcademicSemesterFromDB = async () => {

    const result = await AcademicSemesterModel.find()
    return result;
}
const getSingleAcademicSemesterFromDB = async (id: string) => {

    const result = await AcademicSemesterModel.findById(id)
    return result;
}
const updateSingleAcademicSemesterInDB = async (id: string, payload: Partial<IAcademicSemester>,) => {

    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new AppError(400, 'Invalid Semester Code');
    }

    const result = await AcademicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateSingleAcademicSemesterInDB,
}