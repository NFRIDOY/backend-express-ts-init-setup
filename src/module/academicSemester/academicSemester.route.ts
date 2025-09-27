import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";

const router = Router();

router.post('/', AcademicSemesterControllers.createAcademicSemester);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);

export const AcademicSemesterRoute = router;