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


const createEvent = async (req, res) => {
    const { eventName, startDate, endDate, venue, time, day, openParticipation } = req.body;

    const query = `
    INSERT INTO events (event_name, start_date, end_date, venue, time, day, open_participation)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
`;


    try {
        const result = await pool.query(query, [eventName, startDate, endDate, venue, time, day, openParticipation]);
        const newEvent = result.rows[0];
        return res.status(201).json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating event.", error });
    }
};

module.exports = { getAllEvents,createEvent };
