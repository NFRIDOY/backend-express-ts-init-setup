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

// const signupFaculty: RequestHandler = catchAsync(async (req, res, _next) => {
//     // console.log("req", req.body)
//     const { password, faculty: facultyData } = req.body;

//     const result = await loginUserService.createFacultyIntoDB(password, facultyData);

//     // console.log("data", result);

//     if (!result) {
//         return sendResponse(res, {
//             success: false,
//             statusCode: 400,
//             message: "Failed to create Faculty",
//             data: null,
//         })
//     }
//     return sendResponse(res, {
//         statusCode: httpStutus.OK,
//         success: true,
//         message: 'Faculty created successfully',
//         data: result,
//     })
// })

// const signupAdmin: RequestHandler = catchAsync(async (req, res, _next) => {
//     // console.log("req", req.body)
//     const { password, admin: adminData } = req.body;

//     const result = await loginUserService.createAdminIntoDB(password, adminData);

//     // console.log("data", result);

//     if (!result) {
//         return sendResponse(res, {
//             success: false,
//             statusCode: 400,
//             message: "Failed to create Admin",
//             data: null,
//         })
//     }
//     return sendResponse(res, {
//         statusCode: httpStutus.OK,
//         success: true,
//         message: 'Admin created successfully',
//         data: result,
//     })
// })


// const allLoginUsers: RequestHandler = catchAsync(async (req, res, next) => {
//     // console.log("req");

//     const data = await loginUserService.getAllLoginUserFromDB()

//     // console.log(data)

//     if (!data) {
//         return sendResponse(res, {
//             success: false,
//             statusCode: 400,
//             message: "Failed to retrieve all loginUsers",
//             data: null,
//         })
//     }
//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "All LoginUsers retrieved successfully",
//         data: data,
//     })

// })

// const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
//     const result = await loginUserService.deleteStudentByIdFromDB(req.params?.id);

//     if (!result) {
//         return sendErrorResponse(res, {
//             statusCode: 404,
//             message: "Student Not Found",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Students is Deleted Successfully",
//         data: result,
//     })
// })

// const undeleteStudent: RequestHandler = catchAsync(async (req, res) => {
//     const result = await loginUserService.undeletedStudentByIdFromDB(req.params?.id);

//     if (!result) {
//         return sendErrorResponse(res, {
//             statusCode: 404,
//             message: "Student Not Found",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Student is Deleted Successfully",
//         data: result,
//     })
// })

// // Faculty delete
// const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
//     const result = await loginUserService.deleteFacultyByIdFromDB(req.params?.id);

//     if (!result) {
//         return sendErrorResponse(res, {
//             statusCode: 404,
//             message: "Faculty Not Found",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Faculty is Deleted Successfully",
//         data: result,
//     })
// })

// const undeleteFaculty: RequestHandler = catchAsync(async (req, res) => {
//     const result = await loginUserService.undeletedFacultyByIdFromDB(req.params?.id);

//     if (!result) {
//         return sendErrorResponse(res, {
//             statusCode: 404,
//             message: "Faculty Not Found",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Faculty is Deleted Successfully",
//         data: result,
//     })
// })


// // Admin delete
// const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
//     const result = await loginUserService.deleteAdminByIdFromDB(req.params?.id);

//     if (!result) {
//         return sendErrorResponse(res, {
//             statusCode: 404,
//             message: "Faculty Not Found",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Faculty is Deleted Successfully",
//         data: result,
//     })
// })

// const undeleteAdmin: RequestHandler = catchAsync(async (req, res) => {
//     const result = await loginUserService.undeletedAdminByIdFromDB(req.params?.id);

//     if (!result) {
//         return sendErrorResponse(res, {
//             statusCode: 404,
//             message: "Faculty Not Found",
//             data: {},
//         });
//     }

//     return sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Faculty is Deleted Successfully",
//         data: result,
//     })
// })

export const loginUserController = {
    loginAdmin,

    // allLoginUsers,

    // deleteStudent,
    // undeleteStudent,

    // createFaculty,
    // deleteFaculty,
    // undeleteFaculty,

    // createAdmin,
    // deleteAdmin,
    // undeleteAdmin,
}