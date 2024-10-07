const { Pool } = require('pg');

// Create a new pool instance and set up the connection parameters
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_details',
    password: '1234',
    port: 5432,
});
module.exports = pool;
