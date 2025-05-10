import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("req");
    
    const data = await userService.getAllUsers()

    console.log(data)

    if (!data) {
        res.json({
            success: false,
            statusCode: 400,
            message: "Failed to retrieve all users"
        })
    }
    
    res.json({
        success: true,
        statusCode: 200,
        data: data,
        message: "All Users retrieved successfully"
    })
}

export const userController = {
    allUsers
}