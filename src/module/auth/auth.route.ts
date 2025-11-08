import express, { RequestHandler } from 'express';
import { loginUserController } from "./auth.controller";
import { validateRequest } from '../../middleware/validateRequest';
import { LoginUserValidation } from './auth.validation';
import { auth } from '../../middleware/auth';
import { UserRole } from '../common/user/user.constant';
import { loginAccess } from '../../middleware/loginAccess';
const router = express.Router();

router.post('/login',
    validateRequest(LoginUserValidation.LoginUserValidationSchema), loginUserController.login);
router.post('/login-admin', 
    loginAccess(UserRole.ADMIN), 
    validateRequest(LoginUserValidation.LoginUserValidationSchema), loginUserController.login);
router.post('/change-password',
    auth(UserRole.ADMIN,
        UserRole.FACULTY,
        UserRole.STUDENT),
    validateRequest(LoginUserValidation.changePasswordValidationSchema),
    loginUserController.changePassword);
router.post('/forget-password',
    validateRequest(LoginUserValidation.forgetPasswordValidationSchema),
    loginUserController.forgetPassword);
router.post('/reset-password',
    // validateRequest(LoginUserValidation.resetPasswordVal idationSchema),
    loginUserController.resetPassword);

// router.post('/login-student', validateRequest(createStudentValidationSchema), loginUserController.createStudent);
// router.post('/login-faculty', validateRequest(FacultyValidationSchema.createFaculty), loginUserController.createFaculty);

export const AuthRoute = router