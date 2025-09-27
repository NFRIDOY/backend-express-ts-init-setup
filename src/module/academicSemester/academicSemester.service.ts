import { AcademicSemesterModel } from "./academicSemester.model";
import { academicSemesterNameCodeMapper, IAcademicSemester } from "./academicSemester.interface";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code Or Name');
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

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
}