import express, { RequestHandler } from 'express';
// import router from "../../../router/router";
import { userController } from "./user.controller";
const router = express.Router();
import { createStudentValidationSchema } from '../../student/student.validation';
import { validateRequest } from '../../../middleware/validateRequest';

// router.get('/', userController.allUsers) 
router.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);

export const userRoute = router