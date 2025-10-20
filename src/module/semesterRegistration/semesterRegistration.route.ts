import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";

import { semesterRegistrationControllers } from "./semesterRegistration.controller";
import { SemesterRegistrationValidationSchema } from "./semesterRegistration.validation";

const router = Router();

router.post('/',
    validateRequest(SemesterRegistrationValidationSchema.createSemesterRegistration),
    semesterRegistrationControllers.createSemesterRegistration);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
router.get('/:id', semesterRegistrationControllers.getSingleSemesterRegistration);
router.patch('/:id',
    validateRequest(SemesterRegistrationValidationSchema.updateSemesterRegistration),
    semesterRegistrationControllers.updateSingleSemesterRegistration);
router.delete('/destroy/:id', semesterRegistrationControllers.destroySemesterRegistration);

export const SemesterRegistrationRoute = router;