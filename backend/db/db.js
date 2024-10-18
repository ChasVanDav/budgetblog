// Importing Pool from the 'pg' library to manage database connections.
const { Pool } = require('pg'); 

// Loads environment variables from a .env file.
require('dotenv').config(); 

// Using the database connection string from the .env file.
const pool = new Pool({
    connectionString: process.env.DATABASEURI
});

// Exporting the pool to be used for database queries in other parts of the app.
module.exports = pool;
