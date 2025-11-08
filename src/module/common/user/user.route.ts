import express, { RequestHandler } from 'express';
// import router from "../../../router/router";
import { userController } from "./user.controller";
const router = express.Router();
import { createStudentValidationSchema } from '../../student/student.validation';
import { validateRequest } from '../../../middleware/validateRequest';
import { FacultyValidationSchema } from '../../faculty/faculty.validation';
import { AdminValidationSchema } from '../../admin/admin.validation';
import { auth } from '../../../middleware/auth';
import { UserRole } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../../utils/uploadImage';

// router.get('/', userController.allUsers) 
router.post('/create-student',
    upload.single('file'),
    // validateRequest(createStudentValidationSchema),
    userController.createStudent);
router.post('/create-faculty', validateRequest(FacultyValidationSchema.createFaculty), userController.createFaculty);
router.post('/create-admin', validateRequest(AdminValidationSchema.createAdmin), userController.createAdmin);
router.delete('/delete-student/:id', userController.deleteStudent);
router.delete('/delete-faculty/:id', userController.deleteFaculty);
router.delete('/delete-admin/:id', userController.deleteAdmin);

router.delete('/undelete/:id', userController.undeleteStudent);

router.patch('/change-status/:id',
    auth(UserRole.ADMIN),
    validateRequest(UserValidation?.updateUserStatusValidationSchema),
    userController.updateUserStatus);

router.get('/me',
    auth(UserRole.ADMIN, UserRole.FACULTY, UserRole.STUDENT),
    userController.getMeController);

export const userRoute = router