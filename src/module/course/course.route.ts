import express from 'express';
import { courseController } from './course.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { CourseValidationSchema } from './course.validation';
import logger from '../../middleware/logger';

const router = express.Router();

router.post('/',
    logger,
    validateRequest(CourseValidationSchema.createCourse), 
    courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.patch('/:id', validateRequest(CourseValidationSchema.updateCourse), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.put('/:id/assign-faculties', 
    // logger,
    validateRequest(CourseValidationSchema.facultiesWithCourseValidationSchema),
    courseController.assignFacultiesWithCourse); // TODO: assign Faculties on a course
// router.delete('/:id/remove-faculties', courseController.assignFacultiesWithCourse); // TODO: remove Faculties on a course

export const courseRoute = router;
