import express from 'express';
import { facultyController } from './faculty.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { FacultyValidationSchema } from './faculty.validation';
import { userController } from '../common/user/user.controller';
// import router from "../../../router/router";

const router = express.Router();

router.post('/create-faculty', validateRequest(FacultyValidationSchema.createFaculty), userController.createFaculty); // TODO
router.get('/', facultyController.getAllFacultys);
router.get('/:id', facultyController.getSingleFaculty);
router.patch('/:id', validateRequest(FacultyValidationSchema.updateFaculty), facultyController.updateFaculty);
// router.delete('/:id', facultyController.deleteFaculty);
// router.delete('/:id', userController.deleteFaculty); // TODO

export const facultyRoute = router;
