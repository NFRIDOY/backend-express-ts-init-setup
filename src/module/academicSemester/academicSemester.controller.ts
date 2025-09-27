import { RequestHandler } from "express";
import { AcademicSemesterServices } from "./academicSemester.service";
import { sendErrorResponse, sendResponse } from "../../utils/response/sendResponse";

const createAcademicSemester: RequestHandler = async (req, res, _next) => {
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

}
const getAllAcademicSemester: RequestHandler = async (req, res, _next) => {

    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Semester Created",
        data: result,
    })

}
const getSingleAcademicSemester: RequestHandler = async (req, res, _next) => {
    const academicSemesterData = req.body;

    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(academicSemesterData)

    if (!result) {
        return sendErrorResponse(res, { data: result })
    }
    return sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Academic Semester Created",
        data: result,
    })

}

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
}