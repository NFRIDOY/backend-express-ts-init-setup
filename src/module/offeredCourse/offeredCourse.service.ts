import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { isScheduleSame, isValidTimeRange } from "../../utils/scheduleChecker";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { IOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";
import { isExistValidation } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: IOfferedCourse) => {
    // check if the semester is already registered in same course-section
    const isOfferedCourseExistsInSection = await OfferedCourseModel.findOne({
        semesterRegistration: payload?.semesterRegistration,
        course: payload?.course,
        section: payload?.section,
    });

    if (isOfferedCourseExistsInSection) {
        throw new AppError(409, 'This Course is already exists in this Section!');
    }

    // check if the semesterRegistration is exist
    const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(
        payload?.semesterRegistration,
    );

    if (!isSemesterRegistrationExists) {
        throw new AppError(404, "This Semester Registration not found!");
    }

    if (!isValidTimeRange(payload.startTime, payload.endTime)) {
        throw new AppError(409, "Invalied Time Range");
    }

    // if (isOfferedCourseExists && isScheduleSame(isOfferedCourseExists, payload)) {
    //     throw new AppError(409, "This Course has a Schedule Conflict!");
    // }

    // TODO: 16-10 Validate faculty-department 
    const validateDepartmentOfAcademicFaculty = await AcademicDepartmentModel.findOne({
        academicFaculty: payload?.academicFaculty
    })
    // console.log({ validateDepartmentOfAcademicFaculty })
    if (!validateDepartmentOfAcademicFaculty) {
        throw new AppError(409, "Academic Faculty and Department doesn't aligned");
    }

    // INFO: isFacultyBusy on the schedule: findOne(day: { $in {payload.days}, startTime: {payload.startTime}, endTime: {payload.endTime}}) -> ifExist -> AppError
    // INFO: faculty's availavility > isFacultyBusy > show available Schedule [ADVANCED]

    const existingScheduleOfCourse = await OfferedCourseModel.find({
        semesterRegistration: payload?.semesterRegistration,
        days: { $in: payload?.days },
        section: payload?.section,
    })
        .select('days startTime endTime')
    // console.log({ existingScheduleOfCourse })
    existingScheduleOfCourse.forEach(element => {
        // console.log("element", element)
        const isScheduleConficts = isScheduleSame(element, payload)

        if (isScheduleConficts) {
            throw new AppError(409, "This Course has a Schedule Conflict!");
        }
    });

    const existingScheduleOfFaculty = await OfferedCourseModel.find({
        semesterRegistration: payload?.semesterRegistration,
        faculty: payload?.faculty,
        days: { $in: payload?.days },
    })
        .select('days startTime endTime')
    existingScheduleOfFaculty.forEach(element => {
        // console.log("element", element)
        const isScheduleConficts = isScheduleSame(element, payload)

        if (isScheduleConficts) {
            throw new AppError(
                404,
                'The Faculty is busy!',
            );
        }
    });

    // TODO: faculty's max working hour per day = 18hrs :: total schedule time can't exced 9 hrs

    // check if exists: isExistValidation, isAcademicFacultyExists, isAcademicDepartmentExists, isCourseExists, isFacultyExists
    await isExistValidation(payload);

    const result = await OfferedCourseModel.create({
        ...payload,
        academicSemester: isSemesterRegistrationExists?.academicSemester,
    });
    return result;
};
const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
    const OfferedCourseQuery = new QueryBuilder(
        OfferedCourseModel.find()
            .populate("semesterRegistration")
            .populate("academicSemester")
            .populate("academicFaculty")
            .populate("academicDepartment")
            .populate("course")
            .populate("faculty"),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await OfferedCourseQuery.modelQuery;
    return result;
};
const getSingleOfferedCourseFromDB = async (id: string) => {
    const result =
        await OfferedCourseModel.findById(id).populate("academicSemester");
    return result;
};
const updateSingleOfferedCourseInDB = async (
    id: string,
    payload: Partial<IOfferedCourse>,
) => {
    const {
        course,
        faculty,
        maxCapacity,
        section,
        startTime,
        endTime,
        days,
        status,
    } = payload;
    // check if the Course is exist
    const isCourseExists = await CourseModel.findOne({
        course: payload?.course,
    });

    if (isCourseExists) {
        throw new AppError(409, "This Course is already exists!");
    }

    const isFacultyExists = await FacultyModel.findById(payload?.faculty);

    if (!isFacultyExists) {
        throw new AppError(404, "This Semester Academic Department not found!");
    }

    const result = await OfferedCourseModel.findOneAndUpdate(
        { _id: id },
        {
            course,
            faculty,
            maxCapacity,
            section,
            startTime,
            endTime,
            days,
            status,
        },
        {
            new: true,
        },
    );
    return result;
};

export const offeredCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateSingleOfferedCourseInDB,
};
