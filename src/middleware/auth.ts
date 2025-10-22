import httpStatus from 'http-status';
import { IRole } from './../module/common/user/user.interface';
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { UserModel } from '../module/common/user/user.model';
import { Status, UserRole } from '../module/common/user/user.constant';
import { catchAsync } from '../utils/catchAsync';

export const auth = (...role: IRole[]): RequestHandler => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1];
        // console.log("authHeader", token)
        if (!token) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Token is not found!');
        }
        // verify a token symmetric - synchronous
        const decoded = jwt.verify(token as string, config.jwt_access_secret as string) as JwtPayload;
        // config?.NODE_ENV 
        console.log(decoded)
        // const { role: userRole, userId, iat } = decoded;

        // checking if the user is exist
        const user = await UserModel.isUserExistByCustomID(decoded?.userId);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }
        // checking if the user is already deleted

        const isDeleted = user?.isDeleted;
        if (isDeleted === true) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
        }

        // checking if the user is blocked
        const userStatus = user?.status;

        if (userStatus === Status.BLOCKED) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
        }
        if (role && !role.includes(decoded?.userRole)) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not Athorized',
            );
        }
        req.user = decoded as JwtPayload;
        config.NODE_ENV_DEV && console.log("Welcome ", decoded?.userRole)
        next()
        // if (role.includes(decoded?.userRole)) {
        //     req.user = decoded;
        //     config.NODE_ENV_DEV && console.log("Welcome ", decoded?.userRole)
        //     next()
        // }
        // else {
        //     throw new AppError(401, "Unauthoraized")
        // }

    })
}