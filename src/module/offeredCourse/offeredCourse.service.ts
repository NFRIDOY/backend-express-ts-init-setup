import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { isScheduleSame } from "../../utils/scheduleChecker";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";
import { validateCourseCreation } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {

    // check if the semester is already registered!
    const isOfferedCourseExists = await OfferedCourseModel.findOne({
        course: payload?.course,
    });

    // if (isOfferedCourseExists) {
    //     throw new AppError(
    //         409,
    //         'This Course is already exists in Offered Courses!',
    //     );
    // }

    // check if the semesterRegistration is exist
    const isSemesterRegistrationExists =
        await SemesterRegistrationModel.findById(payload?.semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            404,
            'This Semester Registration not found!',
        );
    }

    if (isOfferedCourseExists && isScheduleSame(isOfferedCourseExists, payload)) {
        throw new AppError(409, 'This course already exists with the same schedule!');
    }

    await validateCourseCreation(payload);
    
    // const isAcademicFacultyExists =
    //     await AcademicFacultyModel.findById(payload?.academicFaculty);

    // if (!isAcademicFacultyExists) {
    //     throw new AppError(
    //         404,
    //         'This Semester Academic Faculty not found!',
    //     );
    // }
    // const isAcademicDepartmentExists =
    //     await AcademicDepartmentModel.findById(payload?.academicDepartment);

    // if (!isAcademicDepartmentExists) {
    //     throw new AppError(
    //         404,
    //         'This Semester Academic Department not found!',
    //     );
    // }
    // // check if the Course is already registered!
    // const isCourseExists = await CourseModel.findById(payload?.course);
    // console.log({ isCourseExists })
    // if (!isCourseExists) {
    //     throw new AppError(
    //         404,
    //         'This Course is not exists!',
    //     );
    // }

    // const isFacultyExists =
    //     await FacultyModel.findById(payload?.faculty);

    // if (!isFacultyExists) {
    //     throw new AppError(
    //         404,
    //         'This Semester Academic Department not found!',
    //     );
    // }


    const result = await OfferedCourseModel.create({
        ...payload,
        academicSemester: isSemesterRegistrationExists?.academicSemester
    })
    return result;
}
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {

    const OfferedCourseQuery = new QueryBuilder(
        OfferedCourseModel.find()
            .populate('semesterRegistration')
            .populate('academicSemester')
            .populate('academicFaculty')
            .populate('academicDepartment')
            .populate('course')
            .populate('faculty'),
        query
    )
        .filter()
        .sort()
        .paginate()
        .fields()
    const result = await OfferedCourseQuery.modelQuery;
    return result;
}
const getSingleOfferedCourseFromDB = async (id: string) => {

    const result = await OfferedCourseModel.findById(id).populate('academicSemester')
    return result;
}
const updateSingleOfferedCourseInDB = async (id: string, payload: Partial<IOfferedCourse>,) => {

    const {
        course,
        faculty,
        maxCapacity,
        section,
        startTime,
        endTime,
        days,
        status,
    } = payload
    // check if the Course is exist
    const isCourseExists = await CourseModel.findOne({
        course: payload?.course,
    });

    if (isCourseExists) {
        throw new AppError(
            409,
            'This Course is already exists!',
        );
    }

    const isFacultyExists =
        await FacultyModel.findById(payload?.faculty);

    if (!isFacultyExists) {
        throw new AppError(
            404,
            'This Semester Academic Department not found!',
        );
    }

    const result = await OfferedCourseModel.findOneAndUpdate({ _id: id }, {
        course,
        faculty,
        maxCapacity,
        section,
        startTime,
        endTime,
        days,
        status,
    }, {
        new: true,
    });
    return result;
}

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateSingleOfferedCourseInDB,
}