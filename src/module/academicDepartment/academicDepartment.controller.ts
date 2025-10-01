import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment: RequestHandler = catchAsync(async (req, res, _next) => {
    const academicSemesterData = req.body;

    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Department Created",
        data: result,
    })

})
const getAllAcademicDepartment: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await academicDepartmentServices.getAllAcademicDepartmentFromDB()

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Departments Retrived",
        data: result,
    })

})
const getSingleAcademicDepartment: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(id)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "One Academic Department Retrived",
        data: result,
    })

})

const updateSingleAcademicDepartment: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const academicSemesterData = req.body;

    const result = await academicDepartmentServices.updateSingleAcademicDepartmentInDB(id, academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Department Updated",
        data: result,
    })

})

export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment
}