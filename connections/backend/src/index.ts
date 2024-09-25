import express, { type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
import cors from 'cors';
import e from 'express';

dotenv.config();

const connectToDatabase = () => {
    if (!process.env.DATABASE_URL || !process.env.DATABASE_API_KEY) {
        throw new Error('Environment variables are not set');
    }
    const supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_API_KEY)

    if (!supabase) {
        throw new Error('Could not connect to the database');
    }

    console.log('Connected to the database');
    return supabase;
}

const database = connectToDatabase();

const app = express();
const port = 5555;

app.use(express.json());
app.use(cors());

app.get('/api/cursos', async (req: Request, res: Response) => {
    const { data, error } = await database
                            .from('cursos')
                            .select('*');
    
    if (error) {
        res.status(500).send('Internal server error');
    }

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;