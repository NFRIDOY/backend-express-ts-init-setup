import { RequestHandler } from "express"
import { studentService } from "./student.service";
import { userService } from "../common/user/user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/response/sendResponse";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudentIntoDB(password, studentData);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully",
        data: result,
    })
})
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
    const result = await studentService.getAllStudentFromDB();

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrived successfully",
        data: result,
    })
})
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await studentService.getSingleStudentByStudentIdFromDB(req.params?.id);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrived successfully",
        data: result,
    })
})

export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
}