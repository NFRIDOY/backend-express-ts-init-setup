import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { sendResponse } from "../../../utils/response/sendResponse";

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("req");
    
    const data = await userService.getAllUsers()

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
    allUsers
}