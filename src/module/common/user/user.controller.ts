import  httpStutus from 'http-status';
import { sendResponse } from './../../../utils/response/sendResponse';
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        // return sendResponse(res, {
        //     statusCode: 200,
        //     success: true,
        //     message: "Student created successfully",
        //     data: result,
        // })
    } catch (err) {
        // console.log('err', err)
        // return sendResponse(res, {
        //     success: false,
        //     statusCode: 500,
        //     message: "Failed to create student",
        //     data: null,
        // })
        next(err)
    }
}


const allUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        // old response
        // res.json({
        //     success: true,
        //     statusCode: 200,
        //     data: data,
        //     message: "All Users retrieved successfully"
        // })
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "All Users retrieved successfully",
            data: data,
        })
    } catch (err) {
        next(err)
    }
}


export const userController = {
    createStudent,
    allUsers,


}