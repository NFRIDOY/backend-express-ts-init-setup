import httpStutus from 'http-status';
import { sendErrorResponse, sendResponse } from './../../utils/response/sendResponse';
import { RequestHandler } from "express";

import { catchAsync } from '../../utils/catchAsync';
import { loginUserService } from './auth.service';



const loginAdmin: RequestHandler = catchAsync(async (req, res, _next) => {
    console.log("req", req.body)
    const { auth: loginData } = req.body;

    const result = await loginUserService.loginUser(loginData);

    // console.log("data", result);

    if (!result) {
        return sendErrorResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to login",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Login successfully',
        data: result,
    })
})

const changePassword: RequestHandler = catchAsync(async (req, res, _next) => {
    const { auth } = req.body
    const result = await loginUserService.changePassword(req?.user, auth)
    if (!result) {
        return sendErrorResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to Change Password",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Change Password successfully',
        data: result,
    })
})

export const loginUserController = {
    loginAdmin,
    changePassword,
}