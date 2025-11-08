import httpStutus from 'http-status';
import { sendErrorResponse, sendResponse } from './../../../utils/response/sendResponse';
import { RequestHandler } from "express";
import { userService } from "./user.service";
import { catchAsync } from '../../../utils/catchAsync';
import AppError from '../../../errors/AppError';



const createStudent: RequestHandler = catchAsync(async (req, res, _next) => {
    console.log("req files", req.files)
    const { password, student: studentData } = req.body;

    throw new AppError(500, "Stop");
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
    // const token = req?.headers?.authorization?.split(' ')[1];
    

    const data = await userService.getMeByTokenFromDB(req?.user)

    // console.log(data)

    if (!data) {
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: "Failed to retrieve Your Data",
            data: null,
        })
    }
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Your Info Has Retrieved Successfully",
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

const updateUserStatus: RequestHandler = catchAsync(async (req, res) => {
    const result = await userService.updateUserStatusOnDB(req.params?.id, req?.body);

    if (!result) {
        return sendErrorResponse(res, {
            statusCode: 404,
            message: "Student Status Updated Failed",
            data: {},
        });
    }

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Student Status Updated Successfully",
        data: {},
        // data: result,
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

    updateUserStatus,
}