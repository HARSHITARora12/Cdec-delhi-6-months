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

const getEventById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        const event = result.rows[0];
        console.log(id+'hii');
        console.log(event);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an event by ID
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { event_name, time, venue, start_date, end_date } = req.body;

    try {
        const result = await pool.query(
            'UPDATE events SET event_name = $1, time = $2, venue = $3, start_date = $4, end_date = $5 WHERE id = $6 RETURNING *',
            [event_name, time, venue, start_date, end_date, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event updated successfully', event: result.rows[0] });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const deleteEvent = async (req, res) => {
    const eventId = parseInt(req.params.id); // Get the event ID from the route parameter

    try {
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [eventId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Event not found' }); // Event not found
        }

        res.status(200).json({ message: 'Event deleted successfully' }); // Successful deletion
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle server error
    }
};
module.exports = { getAllEvents,createEvent,getEventById,updateEvent,deleteEvent };


