import express from 'express';
import { courseController } from './course.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { CourseValidationSchema } from './course.validation';

const router = express.Router();

router.post('/', validateRequest(CourseValidationSchema.createCourse), courseController.createCourse); //TODO
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.patch('/:id', validateRequest(CourseValidationSchema.updateCourse), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse); 

export const courseRoute = router;
