
import { ISemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";



const createSemesterRegistrationIntoDB = async (payload: ISemesterRegistration) => {

    const result = await SemesterRegistrationModel.create(payload)
    return result;
}
const getAllSemesterRegistrationFromDB = async () => {

    const result = await SemesterRegistrationModel.find().populate('academicFaculty') // populate(NAME_OF_THE_FIELD_PROPERTY)
    return result;
}
const getSingleSemesterRegistrationFromDB = async (id: string) => {

    const result = await SemesterRegistrationModel.findById(id).populate('academicFaculty')
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