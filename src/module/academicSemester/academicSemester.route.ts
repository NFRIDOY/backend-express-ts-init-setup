import { Router } from "express";
import { AcademicSemesterControllers as Controllers } from "./academicSemester.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AcademicSemesterValidationSchema as ValidationSchema, createAcademicSemesterValidationSchema } from "./academicSemester.validation";

const router = Router();

router.post('/', validateRequest(createAcademicSemesterValidationSchema), Controllers.createAcademicSemester);

router.get('/', Controllers.getAllAcademicSemester);
router.get('/:id', Controllers.getSingleAcademicSemester);
router.patch('/:id',
    validateRequest(ValidationSchema.updateAcademicSemester),
    Controllers.updateSingleAcademicSemester
);

export const AcademicSemesterRoute = router;