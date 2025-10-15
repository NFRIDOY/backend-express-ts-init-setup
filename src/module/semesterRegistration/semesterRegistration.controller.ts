import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration: RequestHandler = catchAsync(async (req, res, _next) => {
    const academicSemesterData = req.body;

    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Semester Registration Created",
        data: result,
    })

})
const getAllSemesterRegistration: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Semester Registrations Retrived",
        data: result,
    })

})
const getSingleSemesterRegistration: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "One Semester Registration Retrived",
        data: result,
    })

})

const updateSingleSemesterRegistration: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const academicSemesterData = req.body;

    const result = await semesterRegistrationServices.updateSingleSemesterRegistrationInDB(id, academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Semester Registration Updated",
        data: result,
    })

})

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSingleSemesterRegistration
}