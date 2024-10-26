// models/admin.js
const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_details',
    password: '1234',
    port: 5432,
});

// Function to insert an admin
const addAdmin = async (name, adminId, department, phone, email, password, gender) => {
    try {
        console.log("hello arora");
        console.log(phone);
        const result = await pool.query(
            'INSERT INTO admin_registration (name, admin_id, department, phone_number, email, password, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, adminId, department, phone, email, password, gender]
        );
        return result.rows[0]; // Return the newly created admin
    } catch (error) {
        if (error.code === '23505') { // 23505 is the error code for unique constraint violation
            throw new Error('Admin ID or Email already exists');
        } else {
            console.log(error);
            throw new Error('Database error');
        }
    }
};
const findAdminByEmail = async (email) => {
    const query = 'SELECT * FROM admin_registration WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    console.log(result.rows[0]);
    return result.rows[0];
   
};

module.exports = {
    addAdmin,
    findAdminByEmail,
};
