import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middleware/validateRequest";
import createAcademicSemesterValidationSchema from "./academicSemester.validation";

const router = Router();

router.post('/', validateRequest(createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);

export const AcademicSemesterRoute = router;