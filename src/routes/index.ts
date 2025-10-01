import { Router } from "express";
import { userRoute } from "../module/common/user/user.route";
import { studentRoute } from "../module/student/student.route";
import logger from "../middleware/logger";
import { AcademicSemesterRoute } from "../module/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../module/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoute } from "../module/academicDepartment/academicFaculty.route";

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