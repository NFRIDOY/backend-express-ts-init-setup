import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { isScheduleSame, isValidTimeRange } from "../../utils/scheduleChecker";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import { CourseModel } from "../course/course.model";
import { FacultyModel } from "../faculty/faculty.model";
import { SemesterRegistrationModel } from "../semesterRegistration/semesterRegistration.model";
import { IEnrolledCourse } from "./enrolledCourse.interface";
import { Status } from "./enrolledCourse.constant";
import { hasScheduleConficts, isExistAcademicFacultyDepartmentID, isExistFacultyCourse } from "./enrolledCourse.utils";
import { OfferedCourseModel } from "../offeredCourse/offeredCourse.model";
import { EnrolledCourseModel } from "./enrolledCourse.model";

const createEnrolledCourseIntoDB = async (payload: IEnrolledCourse) => {
    // check if the semester is already registered in same course-section
    const isOfferedCourseExistsInSection = await OfferedCourseModel.findOne({
        offeredCourse: payload?.offeredCourse,
        offeredCourseSection: payload?.offeredCourseSection,
    });


    // INFO: isFacultyBusy on the schedule: findOne(day: { $in {payload.days}, startTime: {payload.startTime}, endTime: {payload.endTime}}) -> ifExist -> AppError
    // INFO: faculty's availavility > isFacultyBusy > show available Schedule [ADVANCED]

    // check if exists: isExistValidation, isAcademicFacultyExists, isAcademicDepartmentExists, isCourseExists, isFacultyExists
    // await isExistStudentExists(payload);
    // await isExistOfferedCourseExists(payload);
    // await isExistOfferedCourseSectionExists(payload);


    const result = await EnrolledCourseModel.create(payload);
    return result;
};
const getAllEnrolledCourseFromDB = async (query: Record<string, unknown>) => {
    const OfferedCourseQuery = new QueryBuilder(
        OfferedCourseModel.find()
        // .populate("semesterRegistration")
        // .populate("academicSemester")
        // .populate("academicFaculty")
        // .populate("academicDepartment")
        // .populate("course")
        // .populate("faculty")
        , query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await OfferedCourseQuery.modelQuery;
    return result;
};

const getSingleEnrolledCourseFromDB = async (id: string) => {
    const result =
        await OfferedCourseModel.findById(id).populate("academicSemester");
    return result;
};
const updateSingleEnrolledCourseInDB = async (
    id: string,
    payload: Partial<IEnrolledCourse>,
) => {
    const { student, offeredCourse, offeredCourseSection, status } = payload;
    
    const result = await EnrolledCourseModel.findOneAndUpdate(
        { _id: id },
        {
            student,
            offeredCourse,
            offeredCourseSection,
            status,
        },
        {
            new: true,
        },
    );
    return result;
};

export const enrolledCourseServices = {
    createEnrolledCourseIntoDB,
    getAllEnrolledCourseFromDB,
    getSingleEnrolledCourseFromDB,
    updateSingleEnrolledCourseInDB,

};
