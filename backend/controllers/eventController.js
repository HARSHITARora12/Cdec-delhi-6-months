const pool = require('../db');

const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');  // Fetch all events from the "events" table
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.' });
    }
};

module.exports = { getAllEvents };
