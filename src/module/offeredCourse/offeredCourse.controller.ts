import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { offeredCourseServices } from "./offeredCourse.service";

const createOfferedCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const { offeredCourse } = req.body;

    const result = await offeredCourseServices.createOfferedCourseIntoDB(offeredCourse)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Offerd Courses Created",
        data: result,
    })

})
const getAllOfferedCourse: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await offeredCourseServices.getAllOfferedCourseFromDB(req.query)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Offerd Courses Retrived",
        data: result,
    })

})
const getSingleOfferedCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "One Offerd Course Retrived",
        data: result,
    })

})

const updateSingleOfferedCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const { offeredCourse } = req.body;

    const result = await offeredCourseServices.updateSingleOfferedCourseInDB(id, offeredCourse)

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

export const offeredCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateSingleOfferedCourse
}