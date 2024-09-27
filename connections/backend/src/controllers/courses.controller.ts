import type { Request, Response } from 'express';
import { CourseService } from '../services/courses.service';

export class CourseController {
    courseService: CourseService = new CourseService;

    async getAllCourses(req: Request, res: Response) {
        console.log('Getting all courses');
        try {
            const courses = await this.courseService.getAllCourses();
            res.json(courses);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    async createCourse(req: Request, res: Response) {
        console.log('Creating a new course');
        try {
            const course = req.body;
            const newCourse = await this.courseService.createCourse(course);
            res.json(newCourse);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    async updateCourse(req: Request, res: Response) {
        console.log('Updating a course');
        try {
            const course = req.body;
            const updatedCourse = await this.courseService.updateCourse(course, req.params.id);
            res.json(updatedCourse);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    async deleteCourse(req: Request, res: Response) {
        console.log('Deleting a course');
        try {
            const deletedCourse = await this.courseService.deleteCourse(req.params.id);
            res.json(deletedCourse);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}

const courseController = new CourseController();
export default courseController;