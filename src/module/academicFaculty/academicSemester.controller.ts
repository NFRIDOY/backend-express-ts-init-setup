import { RequestHandler } from "express";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res, _next) => {
    const academicSemesterData = req.body;

    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Faculty Created",
        data: result,
    })

})
const getAllAcademicFaculty: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Faculty Retrived",
        data: result,
    })

})
const getSingleAcademicFaculty: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Faculty Retrived",
        data: result,
    })

})

const updateSingleAcademicFaculty: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const academicSemesterData = req.body;

    const result = await AcademicFacultyServices.updateSingleAcademicFacultyInDB(id, academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Faculty Retrived",
        data: result,
    })

})

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty
}