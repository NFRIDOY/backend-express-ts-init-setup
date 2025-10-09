import httpStutus from 'http-status';
import { sendErrorResponse, sendResponse } from './../../../utils/response/sendResponse';
import { RequestHandler } from "express";
import { userService } from "./user.service";
import { catchAsync } from '../../../utils/catchAsync';



const createStudent: RequestHandler = catchAsync(async (req, res, _next) => {
    console.log("req", req.body)
    const { password, student: studentData } = req.body;

    const result = await userService.createStudentIntoDB(password, studentData);

    console.log("data", result);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to create student",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Student created successfully',
        data: result,
    })
})


const allUsers: RequestHandler = catchAsync(async (req, res, next) => {
    console.log("req");

    const data = await userService.getAllUserFromDB()

    console.log(data)

    if (!data) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to retrieve all users",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Users retrieved successfully",
        data: data,
    })

})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await userService.deleteStudentByStudentIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            message: "Student Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Students is Deleted Successfully",
        data: result,
    })
})

const undeleteStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await userService.undeletedStudentByStudentIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            message: "Student Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Students is Deleted Successfully",
        data: result,
    })
})

export const userController = {
    createStudent,
    allUsers,

    deleteStudent,
    undeleteStudent,
    
}