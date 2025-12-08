import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";

import { enrolledCourseControllers } from "./enrolledCourse.controller";
import { EnrolledCourseValidationSchema } from "./enrolledCourse.validation";
import { auth } from "../../middleware/auth";
import { UserRole } from "../common/user/user.constant";

const router = Router();

router.post('/',
    auth(UserRole.STUDENT, UserRole.ADMIN),
    validateRequest(EnrolledCourseValidationSchema.createEnrolledCourse),
    enrolledCourseControllers.createEnrolledCourse);

router.get('/', enrolledCourseControllers.getAllEnrolledCourse);
router.get('/in-active', enrolledCourseControllers.getAllInActiveEnrolledCourse);
router.get('/:id', enrolledCourseControllers.getSingleEnrolledCourse);
router.patch('/:id',
    auth(UserRole.ADMIN),
    validateRequest(EnrolledCourseValidationSchema.updateEnrolledCourse),
    enrolledCourseControllers.updateSingleEnrolledCourse);

export const EnrolledCourseRoute = router;