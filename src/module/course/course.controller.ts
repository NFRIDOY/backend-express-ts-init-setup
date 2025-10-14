import { RequestHandler } from "express"
import { courseService } from "./course.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";

const createCourse: RequestHandler = catchAsync(async (req, res) => {
    const { course: courseData } = req.body;
    console.log("C = ", courseData)
    const result = await courseService.createCourseIntoDB(courseData);

    if (!result) {
        return sendErrorResponse(res, {
            message: "Course creation failed",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course created successfully",
        data: result,
    })
})
const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
    const result = await courseService.getAllCourseFromDB(req?.query);

    if (!result) {
        return sendErrorResponse(res, {
            message: "Course retrivale failed",
            data: [],
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Courses are retrived successfully",
        data: result,
    })
})
const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
    const result = await courseService.getSingleCourseByCourseIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Course Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The course is retrived successfully",
        data: result,
    })
})
const updateCourse: RequestHandler = catchAsync(async (req, res) => {
    const isExist = await courseService.getSingleCourseByCourseIdFromDB(req.params?.id);
    const { course: courseData } = req.body;

    if (!isExist) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Course Not Found",
            data: {},
        });
    }

    const result = await courseService.updateCourseByCourseIdOnDB(req.params?.id, courseData);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Course is update successfully",
        data: result,
    })
})

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
    const result = await courseService.deleteCourseByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Course Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course is Deleted Successfully",
        data: result,
    })
})

const assignFacultiesWithCourse: RequestHandler = catchAsync(async (req, res) => {
    // Pass the request body directly to the service function which now handles both formats
    const courseId = req.params?.id;
    const { faculties } = req.body;
    // console.log("req.body", req.body)
    // console.log("faculties", faculties)
    const result = await courseService.assignFacultiesWithCourseIntoDB(courseId, faculties);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Assigned on this Course Failed",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty Assigned on this Course Successfully",
        data: result,
    })
})
const removeFacultiesWithCourse: RequestHandler = catchAsync(async (req, res) => {
    // Pass the request body directly to the service function which now handles both formats
    const courseId = req.params?.id;
    const { faculties } = req.body;
    // console.log("req.body", req.body)
    // console.log("faculties", faculties)
    const result = await courseService.removeFacultiesWithCourseFromDB(courseId, faculties);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Removed Failed",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty Removed from this Course Successfully",
        data: result,
    })
})

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesWithCourse,
}