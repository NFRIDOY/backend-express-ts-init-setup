import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserRole } from '../module/common/user/user.constant';
import AppError from '../errors/AppError';

const auth: RequestHandler = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("authHeader", token)

    // verify a token symmetric - synchronous
    const decoded = jwt.verify(token as string, config.jwt_access_secret as string) as JwtPayload;
    console.log(decoded) 
    if(decoded?.userRole == UserRole.ADMIN) {
        next()
    }
    else {
        throw new AppError(401, "Unauthoraized")
    }

}

export default auth;