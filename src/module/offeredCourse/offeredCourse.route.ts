import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";

import { offeredCourseControllers } from "./offeredCourse.controller";
import { OfferedCourseValidationSchema } from "./offeredCourse.validation";

const router = Router();

router.post('/',
    validateRequest(OfferedCourseValidationSchema.createOfferedCourse),
    offeredCourseControllers.createOfferedCourse);

router.get('/', offeredCourseControllers.getAllOfferedCourse);
router.get('/:id', offeredCourseControllers.getSingleOfferedCourse);
router.patch('/:id',
    validateRequest(OfferedCourseValidationSchema.updateOfferedCourse),
    offeredCourseControllers.updateSingleOfferedCourse);

export const OfferedCourseRoute = router;