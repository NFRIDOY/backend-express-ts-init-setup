import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../../utils/response/sendResponse";

const createStudent = async (req: Request, res: Response, _next: NextFunction) => {
    console.log("req")
    const { password, student: studentData } = req.body;
    
    const data = await userService.createStudentIntoDB(password, studentData)

    console.log(data)

    if (!data) {
        sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to create student",
            data: null,
        })
    }
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student created successfully",
        data: data,
    })
}


const allUsers = async (req: Request, res: Response, _next: NextFunction) => {
    console.log("req");
    
    const data = await userService.getAllUserFromDB()

    console.log(data)

    if (!data) {
        sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to retrieve all users",
            data: null,
        })
    }
    // old response
    // res.json({
    //     success: true,
    //     statusCode: 200,
    //     data: data,
    //     message: "All Users retrieved successfully"
    // })
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Users retrieved successfully",
        data: data,
    })
}



export const userController = {
    createStudent,
    allUsers,
    
    
}