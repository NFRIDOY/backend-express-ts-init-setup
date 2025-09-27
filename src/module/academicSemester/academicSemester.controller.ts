import { RequestHandler } from "express";
import { AcademicSemesterServices } from "./academicSemester.service";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createAcademicSemester: RequestHandler = catchAsync(async (req, res, _next) => {
    const academicSemesterData = req.body;

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Semester Created",
        data: result,
    })

})
const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res, _next) => {

    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Semesters Retrived",
        data: result,
    })

})
const getSingleAcademicSemester: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;

    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Semester Retrived",
        data: result,
    })

})

const updateSingleAcademicSemester: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params;
    const academicSemesterData = req.body;

    const result = await AcademicSemesterServices.updateSingleAcademicSemesterInDB(id, academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Semester Retrived",
        data: result,
    })

})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateSingleAcademicSemester
}