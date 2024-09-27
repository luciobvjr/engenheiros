import express from 'express';
import cors from 'cors';
import courseRouter from './routers/courses.router';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/courses', courseRouter);

export default app;