import { Request, Response, NextFunction } from 'express';
import config, { CONST } from '../config';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something Went Wrong!";

    if(config.NODE_ENV===CONST.DEVELOPMENT) {
        console.log("❌ Error :>", err)
    }

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    })

    // return sendResponse(res, {
    //     success: false,
    //     statusCode: 400,
    //     message: "Failed to create student",
    //     data: null,
    // })
}

export default globalErrorHandler;