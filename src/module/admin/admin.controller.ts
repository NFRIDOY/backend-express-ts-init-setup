import { RequestHandler } from "express"
import { adminService } from "./admin.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";

// const createAdmin: RequestHandler = catchAsync(async (req, res) => {
//     const { password, admin: adminData } = req.body;
//     const result = await userService.createAdminIntoDB(password, adminData);

//     if (!result) {
//         return sendErrorResponse(res, {
//             message: "Admin creation failed",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Admin created successfully",
//         data: result,
//     })
// })
const getAllAdmins: RequestHandler = catchAsync(async (req, res) => {
    const result = await adminService.getAllAdminFromDB(req?.query);
    
    if (!result) {
        return sendErrorResponse(res, {
            message: "Admin retrivale failed",
            data: [],
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admins are retrived successfully",
        data: result,
    })
})
const getSingleAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await adminService.getSingleAdminByAdminIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Admin Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The admin is retrived successfully",
        data: result,
    })
})
const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
    const isExist = await adminService.getSingleAdminByAdminIdFromDB(req.params?.id);
    const { admin: adminData } = req.body;

    if (!isExist) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Admin Not Found",
            data: {},
        });
    }
    
    const result = await adminService.updateAdminByAdminIdOnDB(req.params?.id, adminData);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin is update successfully",
        data: result,
    })
})

export const adminController = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin
}