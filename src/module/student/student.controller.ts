import { RequestHandler } from "express"
import { studentService } from "./student.service";
import { userService } from "../common/user/user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudentIntoDB(password, studentData);

    if (!result) {
        return sendErrorResponse(res, {
            message: "Student creation failed",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully",
        data: result,
    })
})
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
    const result = await studentService.getAllStudentFromDB();
    
    if (!result) {
        return sendErrorResponse(res, {
            message: "Student retrivale failed",
            data: [],
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrived successfully",
        data: result,
    })
})
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await studentService.getSingleStudentByStudentIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Student Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The student is retrived successfully",
        data: result,
    })
})
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
    const isExist = await studentService.getSingleStudentByStudentIdFromDB(req.params?.id);

    if (!isExist) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Student Not Found",
            data: {},
        });
    }
    
    const result = await studentService.updateStudentByStudentIdOnDB(req.params?.id, req.body);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is update successfully",
        data: result,
    })
})

export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    updateStudent
}