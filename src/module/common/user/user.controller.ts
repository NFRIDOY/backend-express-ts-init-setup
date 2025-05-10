import { NextFunction, Request, Response } from "express";

const allUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("req");

    res.json({
        message: "User Route"
    })
}

export const userController = {
    allUsers
}