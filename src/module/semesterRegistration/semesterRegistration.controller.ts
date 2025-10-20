import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { semesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration: RequestHandler = catchAsync(async (req, res, _next) => {
    const { semesterRegistration } = req.body;

    const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(semesterRegistration)

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
    const { semesterRegistration } = req.body;

    const result = await semesterRegistrationServices.updateSingleSemesterRegistrationInDB(id, semesterRegistration)

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

const destroySemesterRegistration: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await semesterRegistrationServices.destroySemesterRegistrationWithOfferdCoursesFromDB(id)

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

export const semesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSingleSemesterRegistration,

    destroySemesterRegistration,
}