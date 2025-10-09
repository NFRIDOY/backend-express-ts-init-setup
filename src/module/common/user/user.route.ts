import express, { RequestHandler } from 'express';
// import router from "../../../router/router";
import { userController } from "./user.controller";
const router = express.Router();
import { createStudentValidationSchema } from '../../student/student.validation';
import { validateRequest } from '../../../middleware/validateRequest';

// router.get('/', userController.allUsers) 
router.post('/create-student', validateRequest(createStudentValidationSchema), userController.createStudent);
router.delete('/undelete/:id', userController.undeleteStudent);
router.delete('/:id', userController.deleteStudent);

export const userRoute = router