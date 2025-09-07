import { Request, Response } from "express"
import { studentService } from "../service/student.service";

const createStudent = async (req: Request, res: Response) => {
    const result = await studentService.createStudentIntoDB(req.body);
    if (!result) {
        return res.status(400).json({
            success: false,
            message: "Failed to create student",
            data: null,
        })
    }
    return res.status(200).json({
        success: true,
        message: "Student created successfully",
        data: result,
    })
    // sendResponse(res, {
    //     statusCode: 200,
    //     success: true,
    //     message: "Student created successfully",
    //     data: result,
    // })
}

export const studentController = { 
    createStudent
}