import { RequestHandler } from "express"
import { facultyService } from "./faculty.service";
import { userService } from "../common/user/user.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";

// const createFaculty: RequestHandler = catchAsync(async (req, res) => {
//     const { password, faculty: facultyData } = req.body;
//     const result = await userService.createFacultyIntoDB(password, facultyData);

//     if (!result) {
//         return sendErrorResponse(res, {
//             message: "Faculty creation failed",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Faculty created successfully",
//         data: result,
//     })
// })
const getAllFacultys: RequestHandler = catchAsync(async (req, res) => {
    const result = await facultyService.getAllFacultyFromDB(req?.query);
    
    if (!result) {
        return sendErrorResponse(res, {
            message: "Faculty retrivale failed",
            data: [],
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Facultys are retrived successfully",
        data: result,
    })
})
const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
    const result = await facultyService.getSingleFacultyByFacultyIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "The faculty is retrived successfully",
        data: result,
    })
})
const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
    const isExist = await facultyService.getSingleFacultyByFacultyIdFromDB(req.params?.id);
    const { faculty: facultyData } = req.body;

    if (!isExist) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Not Found",
            data: {},
        });
    }
    
    const result = await facultyService.updateFacultyByFacultyIdOnDB(req.params?.id, facultyData);

    return sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Faculty is update successfully",
        data: result,
    })
})

export const facultyController = {
    getAllFacultys,
    getSingleFaculty,
    updateFaculty
}