import express from 'express';
import { studentController } from './student.controller';
import { userController } from '../common/user/user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { StudentValidationSchema } from './student.validation';
// import router from "../../../router/router";

const router = express.Router();

router.post('/create-student', validateRequest(StudentValidationSchema.createStudent), studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
router.patch('/:id', validateRequest(StudentValidationSchema.updateStudent), studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);
router.delete('/:id', userController.deleteStudent);

export const studentRoute = router;
