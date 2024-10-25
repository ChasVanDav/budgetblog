import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config(); 

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

export default db;