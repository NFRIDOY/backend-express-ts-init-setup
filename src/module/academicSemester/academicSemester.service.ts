import { AcademicSemesterModel } from "./academicSemester.model";
import { IAcademicSemester } from "./academicSemester.interface";

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {

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