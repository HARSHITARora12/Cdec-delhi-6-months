const { Pool } = require('pg');

// Database connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_details',
    password: '1234',
    port: 5432,
});

// Find user by email
exports.findUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        return result.rows[0]; // Return user object if found
    } catch (err) {
        throw new Error('Database query error');
    }
};

// Create new user
exports.createUser = async (userDetails) => {
    const { fullName, studentId, email, hashedPassword, age, phoneNumber, course, branch, year, gender } = userDetails;
    try {
        await pool.query(
            `INSERT INTO students 
            (full_name, student_id, email, password, age, phone_number, course, branch, year, gender) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [fullName, studentId, email, hashedPassword, age, phoneNumber, course, branch, year, gender]
        );
    } catch (err) {
        console.log(err);
        throw new Error('Database insert error');
    }
};
