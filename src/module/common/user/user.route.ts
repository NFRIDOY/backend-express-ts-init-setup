import express, { RequestHandler } from 'express';
// import router from "../../../router/router";
import { userController } from "./user.controller";
const router = express.Router();
import { createStudentValidationSchema } from '../../student/student.validation';
import { validateRequest } from '../../../middleware/validateRequest';
import { FacultyValidationSchema } from '../../faculty/faculty.validation';
import { AdminValidationSchema } from '../../admin/admin.validation';

// router.get('/', userController.allUsers) 
router.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);
router.post('/create-faculty', validateRequest(FacultyValidationSchema.createFaculty), userController.createFaculty);
router.post('/create-admin', validateRequest(AdminValidationSchema.createAdmin), userController.createAdmin);
router.delete('/delete-student/:id', userController.deleteStudent);
router.delete('/delete-faculty/:id', userController.deleteFaculty);
router.delete('/delete-admin/:id', userController.deleteAdmin); 

router.delete('/undelete/:id', userController.undeleteStudent);

export const userRoute = router