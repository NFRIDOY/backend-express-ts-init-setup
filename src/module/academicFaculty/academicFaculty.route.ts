import { Router } from "express";
import { AcademicFacultyControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createAcademicFacultyValidationSchema, updateAcademicFacultyValidationSchema } from "./academicFaculty.validation";

const router = Router();

router.post('/', validateRequest(createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch('/:id', validateRequest(updateAcademicFacultyValidationSchema),  AcademicFacultyControllers.updateSingleAcademicFaculty);

export const AcademicFacultyRoute = router;