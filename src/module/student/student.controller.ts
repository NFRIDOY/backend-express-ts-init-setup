import { NextFunction, Request, Response } from "express"
import { studentService } from "./student.service";
import { userService } from "../common/user/user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;
        const result = await userService.createStudentIntoDB(password, studentData);
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
    } catch (err) {
        next(err)
    }
}
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentService.getAllStudentFromDB();
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Failed to create student",
                data: [],
            })
        }
        return res.status(200).json({
            success: true,
            message: "Students are retrived successfully",
            data: result,
        })
    } catch (err) {
        next(err)
    }
}
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await studentService.getSingleStudentByStudentIdFromDB(req.params?.id);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Failed to create student",
                data: [],
            })
        }
        return res.status(200).json({
            success: true,
            message: "Students are retrived successfully",
            data: result,
        })
    } catch (err) {
        next(err)
    }
}

export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
}