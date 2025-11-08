import { IRole } from './../module/common/user/user.interface';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { catchAsync } from '../utils/catchAsync';

export const loginAccess = (...role: IRole[]): RequestHandler => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log("roles", role)
        req.role = [...role];
        next()
    })
}