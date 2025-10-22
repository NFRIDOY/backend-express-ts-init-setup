import express from 'express';
import { facultyController } from './faculty.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { FacultyValidationSchema } from './faculty.validation';
import { userController } from '../common/user/user.controller';
import logger from '../../middleware/logger';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-faculty', validateRequest(FacultyValidationSchema.createFaculty), userController.createFaculty);
router.get('/', auth, facultyController.getAllFacultys);
router.get('/:id', facultyController.getSingleFaculty);
router.patch('/:id', validateRequest(FacultyValidationSchema.updateFaculty), facultyController.updateFaculty);
router.delete('/:id', userController.deleteFaculty); 

export const facultyRoute = router;
