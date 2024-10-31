import bcrypt from 'bcrypt';
import db from './db/db.js';

async function hashPasswords() {
    try {
        const users = await db.query('SELECT user_id, password FROM users');

        for (const user of users.rows) {
            if (!user.password.startsWith('$2b$')) { 
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await db.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, user.user_id]);
                console.log(`Password for user ID ${user.user_id} has been hashed.`);
            }
        }

        console.log('All passwords hashed successfully.');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    } finally {
        db.end(); 
    }
}

hashPasswords();