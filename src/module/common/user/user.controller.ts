import httpStutus from 'http-status';
import { sendErrorResponse, sendResponse } from './../../../utils/response/sendResponse';
import { RequestHandler } from "express";
import { userService } from "./user.service";
import { catchAsync } from '../../../utils/catchAsync';



const createStudent: RequestHandler = catchAsync(async (req, res, _next) => {
    // console.log("req", req.body)
    const { password, student: studentData } = req.body;

    const result = await userService.createStudentIntoDB(password, studentData);

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

    const result = await userService.createFacultyIntoDB(password, facultyData);

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

    const result = await userService.createAdminIntoDB(password, adminData);

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


const allUsers: RequestHandler = catchAsync(async (req, res, next) => {
    // console.log("req");

    const data = await userService.getAllUserFromDB()

    // console.log(data)

    if (!data) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to retrieve all users",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Users retrieved successfully",
        data: data,
    })

})

const getMeController: RequestHandler = catchAsync(async (req, res, next) => {
    // console.log("request meController: ", req);

    const data = await userService.getMeByTokenFromDB(req)

    // console.log(data)

    if (!data) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to retrieve all users",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Users retrieved successfully",
        data: data,
    })

})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
    const result = await userService.deleteStudentByIdFromDB(req.params?.id);

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
    const result = await userService.undeletedStudentByIdFromDB(req.params?.id);

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
    const result = await userService.deleteFacultyByIdFromDB(req.params?.id);

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
    const result = await userService.undeletedFacultyByIdFromDB(req.params?.id);

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
    const result = await userService.deleteAdminByIdFromDB(req.params?.id);

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
    const result = await userService.undeletedAdminByIdFromDB(req.params?.id);

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
export const userController = {
    createStudent,
    allUsers,
    getMeController,

    deleteStudent,
    undeleteStudent,

    createFaculty,
    deleteFaculty,
    undeleteFaculty,

    createAdmin,
    deleteAdmin,
    undeleteAdmin,
}