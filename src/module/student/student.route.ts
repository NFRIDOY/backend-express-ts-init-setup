import express from 'express';
import { studentController } from './student.controller';
import { userController } from '../common/user/user.controller';
// import router from "../../../router/router";

const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
// router.patch('/:id', studentController.updateStudent);
// router.delete('/:id', studentController.deleteStudent);
router.delete('/:id', userController.deleteStudent);

export const studentRoute = router;
