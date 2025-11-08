import httpStutus from 'http-status';
import { sendErrorResponse, sendResponse } from './../../utils/response/sendResponse';
import { RequestHandler } from "express";

import { catchAsync } from '../../utils/catchAsync';
import { loginUserService } from './auth.service';



const loginAdmin: RequestHandler = catchAsync(async (req, res, _next) => {

    const { auth: loginData } = req.body;

    const result = await loginUserService.loginUser(loginData);

    // console.log("data", result);

    if (!result) {
        return sendErrorResponse(res, {
            success: false,
            statusCode: 400,
            message: "User Credential Dosen't Match. Failed to login",
            data: null,
        })
    }

    res.cookie('token', result?.accessToken?.split(' ')[1], {
        httpOnly: true,       // prevents client-side JS access
        secure: true,         // ensures cookie is sent over HTTPS
        sameSite: 'strict',   // CSRF protection
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

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

const forgetPassword: RequestHandler = catchAsync(async (req, res, _next) => {
    const { auth } = req.body
    const result = await loginUserService.forgetPassword(auth)
    if (!result) {
        return sendErrorResponse(res, {
            success: false,
            statusCode: 400,
            message: "Forget Password Email Sending Failed.",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Reset Password Link Has Been Sent To Your Email. Please Check Your Email.',
        data: result,
    })
})

const resetPassword: RequestHandler = catchAsync(async (req, res, _next) => {

    const { auth } = req.body
    const result = await loginUserService.resetPassword(req.query?.token as string, auth)

    if (!result) {
        return sendErrorResponse(res, {
            success: false,
            statusCode: 400,
            message: "Reset Password Failed.",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Password Has Been Reset.',
        data: result,
    })
})

export const loginUserController = {
    loginAdmin,
    changePassword,
    forgetPassword,
    resetPassword,

}