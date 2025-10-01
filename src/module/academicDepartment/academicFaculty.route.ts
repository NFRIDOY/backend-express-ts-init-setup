import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createAcademicDepartmentValidationSchema, updateAcademicDepartmentValidationSchema } from "./academicDepartment.validation";
import { academicDepartmentControllers } from "./academicDepartment.controller";

const router = Router();

router.post('/', validateRequest(createAcademicDepartmentValidationSchema), academicDepartmentControllers.createAcademicDepartment);

router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
router.get('/:id', academicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:id', validateRequest(updateAcademicDepartmentValidationSchema),  academicDepartmentControllers.updateSingleAcademicDepartment);

export const AcademicDepartmentRoute = router;