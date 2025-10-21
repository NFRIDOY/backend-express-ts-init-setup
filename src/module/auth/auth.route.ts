import express, { RequestHandler } from 'express';
// import router from "../../../router/router";
import { loginUserController } from "./auth.controller";
import { AdminValidationSchema } from '../admin/admin.validation';
import { validateRequest } from '../../middleware/validateRequest';
const router = express.Router();

router.post('/login-admin', validateRequest(AdminValidationSchema.createAdmin), loginUserController.loginAdmin);
// router.post('/login-student', validateRequest(createStudentValidationSchema), loginUserController.createStudent);
// router.post('/login-faculty', validateRequest(FacultyValidationSchema.createFaculty), loginUserController.createFaculty);

export const loginUserRoute = router