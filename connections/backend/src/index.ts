import express, { type Request, type Response } from 'express';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    if (!process.env.DATABASE_URL || !process.env.DATABASE_API_KEY) {
        throw new Error('Environment variables are not set');
    }
    const supabase = createClient(process.env.DATABASE_URL, process.env.DATABASE_API_KEY)
    return supabase;
}

connectToDatabase().then((supabase) => {
    console.log('Connected to database');
}).catch((error) => {
    console.error(error);
});

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/status', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
