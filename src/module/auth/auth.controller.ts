import httpStutus from 'http-status';
import { sendErrorResponse, sendResponse } from './../../../utils/response/sendResponse';
import { RequestHandler } from "express";
import { authService } from "./auth.service";
import { catchAsync } from '../../../utils/catchAsync';



const createStudent: RequestHandler = catchAsync(async (req, res, _next) => {
    // console.log("req", req.body)
    const { password, student: studentData } = req.body;

    const result = await authService.createStudentIntoDB(password, studentData);

    // console.log("data", result);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to create student",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Student created successfully',
        data: result,
    })
})
const createFaculty: RequestHandler = catchAsync(async (req, res, _next) => {
    // console.log("req", req.body)
    const { password, faculty: facultyData } = req.body;

    const result = await authService.createFacultyIntoDB(password, facultyData);

    // console.log("data", result);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to create Faculty",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Faculty created successfully',
        data: result,
    })
})

const createAdmin: RequestHandler = catchAsync(async (req, res, _next) => {
    // console.log("req", req.body)
    const { password, admin: adminData } = req.body;

    const result = await authService.createAdminIntoDB(password, adminData);

    // console.log("data", result);

    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to create Admin",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: httpStutus.OK,
        success: true,
        message: 'Admin created successfully',
        data: result,
    })
})


const allAuths: RequestHandler = catchAsync(async (req, res, next) => {
    // console.log("req");

    const data = await authService.getAllAuthFromDB()

    // console.log(data)

    if (!data) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to retrieve all auths",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Auths retrieved successfully",
        data: data,
    })

})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.deleteStudentByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Student Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Students is Deleted Successfully",
        data: result,
    })
})

const undeleteStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.undeletedStudentByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Student Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student is Deleted Successfully",
        data: result,
    })
})

// Faculty delete
const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.deleteFacultyByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty is Deleted Successfully",
        data: result,
    })
})

const undeleteFaculty: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.undeletedFacultyByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty is Deleted Successfully",
        data: result,
    })
})


// Admin delete
const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.deleteAdminByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty is Deleted Successfully",
        data: result,
    })
})

const undeleteAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await authService.undeletedAdminByIdFromDB(req.params?.id);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Faculty Not Found",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Faculty is Deleted Successfully",
        data: result,
    })
})
export const authController = {
    createStudent,
    allAuths,

    deleteStudent,
    undeleteStudent,

    createFaculty,
    deleteFaculty,
    undeleteFaculty,

    createAdmin,
    deleteAdmin,
    undeleteAdmin,
}