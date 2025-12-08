import { Router } from "express";
import { userRoute } from "../module/common/user/user.route";
import { studentRoute } from "../module/student/student.route";
import logger from "../middleware/logger";
import { AcademicSemesterRoute } from "../module/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../module/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../module/academicDepartment/academicDepartment.route";
import { SemesterRegistrationRoute } from "../module/semesterRegistration/semesterRegistration.route";
import { adminRoute } from "../module/admin/admin.route";
import { facultyRoute } from "../module/faculty/faculty.route";
import { courseRoute } from "../module/course/course.route";
import { OfferedCourseRoute } from "../module/offeredCourse/offeredCourse.route";
import { AuthRoute } from "../module/auth/auth.route";
import { EnrolledCourseRoute } from "../module/enrolledCourse/enrolledCourse.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoute
    },
    {
        path: '/student',
        route: studentRoute,
        logger: logger
    },
    {
        path: '/faculty',
        route: facultyRoute,
    },
    {
        path: '/admin',
        route: adminRoute,
    },
    {
        path: '/auth',
        route: AuthRoute,
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoute,
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoute,
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoute,
    },
    {
        path: '/course',
        route: courseRoute,
    },
    {
        path: '/semester-registration',
        route: SemesterRegistrationRoute,
    },
    {
        path: '/offerd-courses',
        route: OfferedCourseRoute,
    },
    {
        path: '/enrolled-courses',
        route: EnrolledCourseRoute,
    },
]

// router.use("/user", userRoute)
// router.use("/student", logger, studentRoute)

moduleRoutes.forEach((route) => {
    if(route?.logger){
        return router.use(route.path, logger, route.route)
    }
    return router.use(route.path, route.route)
})


export default router;