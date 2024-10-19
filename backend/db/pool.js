const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASEURI //DATABASEURI defined in .env
});

module.exports = pool;
