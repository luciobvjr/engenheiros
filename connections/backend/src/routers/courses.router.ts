import { CourseController } from '../controllers/courses.controller';
import express from 'express';

const courseController = new CourseController();
const courseRouter = express.Router();

courseRouter.get('/', courseController.getAllCourses.bind(courseController));
courseRouter.post('/', courseController.createCourse.bind(courseController));
courseRouter.put('/:id', courseController.updateCourse.bind(courseController));
courseRouter.delete('/:id', courseController.deleteCourse.bind(courseController));

export default courseRouter;