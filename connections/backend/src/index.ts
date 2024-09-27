import express, { type Request, type Response } from 'express';
import cors from 'cors';
import courseRouter from './routers/courses.router';

const app = express();
const port = 5555;

app.use(express.json());
app.use(cors());
app.use('/api/courses', courseRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;