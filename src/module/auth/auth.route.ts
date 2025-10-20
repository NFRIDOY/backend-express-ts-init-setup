import express, { RequestHandler } from 'express';
// import router from "../../../router/router";
import { authController } from "./auth.controller";
const router = express.Router();
import { createStudentValidationSchema } from '../../student/student.validation';
import { validateRequest } from '../../../middleware/validateRequest';
import { FacultyValidationSchema } from '../../faculty/faculty.validation';
import { AdminValidationSchema } from '../../admin/admin.validation';

// router.get('/', authController.allAuths) 
router.post('/create-student', validateRequest(createStudentValidationSchema), authController.createStudent);
router.post('/create-faculty', validateRequest(FacultyValidationSchema.createFaculty), authController.createFaculty);
router.post('/create-admin', validateRequest(AdminValidationSchema.createAdmin), authController.createAdmin);
router.delete('/delete-student/:id', authController.deleteStudent);
router.delete('/delete-faculty/:id', authController.deleteFaculty);
router.delete('/delete-admin/:id', authController.deleteAdmin); 

router.delete('/undelete/:id', authController.undeleteStudent);

export const authRoute = router