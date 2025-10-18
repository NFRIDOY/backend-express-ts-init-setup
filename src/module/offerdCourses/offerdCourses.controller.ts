import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { offerdCoursesServices } from "./offerdCourses.service";

const createOfferdCourses: RequestHandler = catchAsync(async (req, res, _next) => {
    const { offerdCourses} = req.body;

    const result = await offerdCoursesServices.createOfferdCoursesIntoDB(offerdCourses)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Offerd CoursesCreated",
        data: result,
    })

})
const getAllOfferdCourses: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await offerdCoursesServices.getAllOfferdCoursesFromDB(req.query)

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
const getSingleOfferdCourses: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await offerdCoursesServices.getSingleOfferdCoursesFromDB(id)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "One Offerd CoursesRetrived",
        data: result,
    })

})

const updateSingleOfferdCourses: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const { offerdCourses} = req.body;

    const result = await offerdCoursesServices.updateSingleOfferdCoursesInDB(id, offerdCourses)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Offerd CoursesUpdated",
        data: result,
    })

})

export const offerdCoursesControllers = {
    createOfferdCourses,
    getAllOfferdCourses,
    getSingleOfferdCourses,
    updateSingleOfferdCourses
}