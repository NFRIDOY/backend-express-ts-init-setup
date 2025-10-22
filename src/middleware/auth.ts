import { IRole } from './../module/common/user/user.interface';
import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRole } from '../module/common/user/user.constant';
import { IjwtPayload } from '../module/auth/auth.interface';
import AppError from '../errors/AppError';

export const auth = (role: IRole): RequestHandler => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log("authHeader", token)
    
        // verify a token symmetric - synchronous
        const decoded = jwt.verify(token as string, config.jwt_access_secret as string) as IjwtPayload;
        console.log(decoded) 
        if(decoded?.userRole == role) {
            console.log("Welcome Admin")
            next()
        }
        else {
            throw new AppError(401, "Unauthoraized")
        }
    
    }
}