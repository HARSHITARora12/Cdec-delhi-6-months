// models/participants.js
const { Pool } = require('pg');

// Initialize PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_details',
    password: '1234',
    port: 5432,
});

// Function to insert a participant
const addParticipant = async (name, email, phone, eventName,category) => {
    try {
        const result = await pool.query(
            'INSERT INTO participants (name, email, phone, event_name,event_category) VALUES ($1, $2, $3, $4,$5) RETURNING *',
            [name, email, phone, eventName,category]
        );
        // console.log("harshita",+result.rows[0]);
        return result.rows[0]; // Return the newly created participant
    } catch (error) {
        if (error.code === '23505') { // 23505 is the error code for unique constraint violation
            throw new Error('Email already exists');
        } else {
            throw new Error('Database error');
        }
    }
};

module.exports = {
    addParticipant,
};
