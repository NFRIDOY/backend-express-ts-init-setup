import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { enrolledCourseServices } from "./enrolledCourse.service";
import { Status } from "./enrolledCourse.constant";
import httpStatus from "http-status";

const createEnrolledCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const { enrolledCourse } = req.body;

    const result = await enrolledCourseServices.createEnrolledCourseIntoDB(enrolledCourse, req.user)

    return sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Enrolled Course created successfully",
        data: result,
    });
})
const getAllInActiveEnrolledCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const query = req.query
    query.status = Status.INACTIVE;
    
    const result = await enrolledCourseServices.getAllEnrolledCourseFromDB(query)
    // const result = await enrolledCourseServices.getAllEnrolledCourseFromDB("status=INACTIVE")

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

const getAllEnrolledCourse: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await enrolledCourseServices.getAllEnrolledCourseFromDB(req.query)

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

const getSingleEnrolledCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await enrolledCourseServices.getSingleEnrolledCourseFromDB(id)

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

const updateSingleEnrolledCourse: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const { enrolledCourse } = req.body;

    const result = await enrolledCourseServices.updateSingleEnrolledCourseInDB(id, enrolledCourse)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Offerd Courses Updated",
        data: result,
    })

})

export const enrolledCourseControllers = {
    createEnrolledCourse,
    getAllEnrolledCourse,
    getSingleEnrolledCourse,
    updateSingleEnrolledCourse,

    getAllInActiveEnrolledCourse,
}