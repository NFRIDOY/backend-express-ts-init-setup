
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";



const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {

    const result = await AcademicDepartmentModel.create(payload)
    return result;
}
const getAllAcademicDepartmentFromDB = async () => {

    const result = await AcademicDepartmentModel.find().populate('academicFaculty') // populate(NAME_OF_THE_FIELD_PROPERTY)
    return result;
}
const getSingleAcademicDepartmentFromDB = async (id: string) => {

    const result = await AcademicDepartmentModel.findById(id)
    return result;
}
const updateSingleAcademicDepartmentInDB = async (id: string, payload: Partial<IAcademicDepartment>,) => {

    const result = await AcademicDepartmentModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

export const academicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateSingleAcademicDepartmentInDB,
}