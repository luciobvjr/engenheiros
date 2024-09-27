import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

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
export default database;
