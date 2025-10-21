import express, { RequestHandler } from 'express';
import { loginUserController } from "./auth.controller";
import { validateRequest } from '../../middleware/validateRequest';
import { LoginUserValidation } from './auth.validation';
const router = express.Router();

router.post('/login-admin', validateRequest(LoginUserValidation.LoginUserValidationSchema), loginUserController.loginAdmin);
// router.post('/login-student', validateRequest(createStudentValidationSchema), loginUserController.createStudent);
// router.post('/login-faculty', validateRequest(FacultyValidationSchema.createFaculty), loginUserController.createFaculty);

export const AuthRoute = router