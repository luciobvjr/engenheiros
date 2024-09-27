import database from '../database';

export class CourseService {
    async getAllCourses() {
        const { data, error } = await database
                                    .from('courses')
                                    .select('*');
        
        if (error) {
            throw new Error('Internal server error');
        }
    
        return data;
    }
    
    async createCourse(course: Course) {
        const { data, error } = await database
                                    .from('courses')
                                    .insert(course);
        
        if (error) {
            throw new Error('Internal server error');
        }
    
        return true;
    }
    
    async updateCourse(course: Course, id: string) {
        const { data, error } = await database
                                    .from('courses')
                                    .select('*')
                                    .match({ id: id });
        
        if (error) {
            throw new Error('Internal server error');
        }

        if (data.length === 0) {
            throw new Error('Course not found');
        }

        const { data: updatedData, error: updateError } = await database
                                                            .from('courses')
                                                            .update(course)
                                                            .match({ id: id });

        if (updateError) {
            throw new Error('Internal server error');
        }
    
        return true;
    }

    async deleteCourse(id: string) {
        const { data, error } = await database
                                    .from('courses')
                                    .select('*')
                                    .match({ id: id });
        
        if (error) {
            throw new Error('Internal server error');
        }

        if (data.length === 0) {
            throw new Error('Course not found');
        }

        const { data: deletedData, error: deleteError } = await database
                                                            .from('courses')
                                                            .delete()
                                                            .match({ id: id });

        if (deleteError) {
            throw new Error('Internal server error');
        }
    
        return true;
    }
}

const courseService = new CourseService();
export default courseService;