import express from 'express';
import { studentController } from "../controller/student.controller";
// import router from "../../../router/router";

const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getAllStudents);

export const studentRoute = router;
