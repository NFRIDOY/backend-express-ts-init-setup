import express, { RequestHandler } from 'express';
import { loginUserController } from "./auth.controller";
import { validateRequest } from '../../middleware/validateRequest';
import { LoginUserValidation } from './auth.validation';
import { auth } from '../../middleware/auth';
import { UserRole } from '../common/user/user.constant';
const router = express.Router();

router.post('/login', validateRequest(LoginUserValidation.LoginUserValidationSchema), loginUserController.loginAdmin);
router.post('/login-admin', validateRequest(LoginUserValidation.LoginUserValidationSchema), loginUserController.loginAdmin);
// router.post('/login-student', validateRequest(createStudentValidationSchema), loginUserController.createStudent);
// router.post('/login-faculty', validateRequest(FacultyValidationSchema.createFaculty), loginUserController.createFaculty);

export const AuthRoute = router