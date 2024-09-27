import request from 'supertest';
import app from '../app';
import type { Server } from 'node:http';

let server: Server;

beforeAll((done) => {
    server = app.listen(done);
})

afterAll((done) => {
    server.close(done);
})

describe('Courses API', () => {
    it('should get all courses', async () => {
        const response = await request(server).get('/api/courses');
        expect(response.status).toBe(200);
    });
});

describe('Courses API', () => {
    it('should create a new course', async () => {
        const response = await request(server)
            .post('/api/courses')
            .send({ id: 0, name: 'test', description: 'test description' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
    });
});

describe('Courses API', () => {
    it('should update a course', async () => {
        const response = await request(server)
            .put('/api/courses/0')
            .send({ name: 'test 2', description: 'test updated' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
    });
});

describe('Courses API', () => {
    it('should delete a course', async () => {
        const response = await request(server).delete('/api/courses/0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(true);
    });
});