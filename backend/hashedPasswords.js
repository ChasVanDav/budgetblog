// Import necessary modules
import bcrypt from 'bcrypt';  // bcrypt for hashing passwords
import db from './db/db.js';  // Database connection

// Function to hash plain text passwords for all users in the database
async function hashPasswords() {
    try {
        // Fetch all users with their user_id and password from the database
        const users = await db.query('SELECT user_id, password FROM users');

        // Loop through each user in the users array
        for (const user of users.rows) {
            // Check if the password is not already hashed (bcrypt hashes start with $2b$)
            if (!user.password.startsWith('$2b$')) { 
                // Hash the user's plain text password using bcrypt
                const hashedPassword = await bcrypt.hash(user.password, 10);

                // Update the user's password with the hashed value in the database
                await db.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, user.user_id]);
                console.log(`Password for user ID ${user.user_id} has been hashed.`); // Log success for each user
            }
        }

        // Log a message when all passwords have been hashed
        console.log('All passwords hashed successfully.');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error hashing passwords:', error);
    } finally {
        // Ensure the database connection is closed after the operation
        db.end();
    }
}

// Call the function to hash the passwords
hashPasswords();
