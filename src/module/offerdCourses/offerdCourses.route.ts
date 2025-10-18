import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";

import { offerdCoursesControllers } from "./offerdCourses.controller";
import { OfferdCoursesValidationSchema } from "./offerdCourses.validation";

const router = Router();

router.post('/',
    validateRequest(OfferdCoursesValidationSchema.createOfferdCourses),
    offerdCoursesControllers.createOfferdCourses);

router.get('/', offerdCoursesControllers.getAllOfferdCourses);
router.get('/:id', offerdCoursesControllers.getSingleOfferdCourses);
router.patch('/:id',
    validateRequest(OfferdCoursesValidationSchema.updateOfferdCourses),
    offerdCoursesControllers.updateSingleOfferdCourses);

export const OfferdCoursesRoute = router;