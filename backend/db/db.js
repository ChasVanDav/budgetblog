const { Pool } = require('pg'); 
require('dotenv').config(); 

const pool = new Pool({
    user: "tpl522_14",
    host: "localhost",
    port: "5432",
    database: "budgetblog"
});

// Exporting the pool to be used for database queries in other parts of the app.
module.exports = pool;
