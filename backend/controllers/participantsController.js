// controllers/participantsController.js
const { addParticipant } = require('../models/participantsModel');
const pool = require('../db');
// Controller to handle the participation logic
const participate = async (req, res) => {
    const { name,email,phone,eventName,category} = req.body;

    
        try {
            // Add participant to the database

            const participant = await addParticipant(name, email, phone, eventName,category);
            res.status(201).json({
                message: 'Participation recorded successfully!',
                participant,
            });
        } catch (error) {
            if (error.message === 'Email already exists') {
                res.status(409).json({ error: 'Email is already registered for participation.' });
            } else {
                console.error('Error inserting participant data:', error);
                res.status(500).json({ error: 'Failed to record participation' });
            }
        
    } 
};
const getParticipants = async (req, res) => {
    try {
        //console.log('hii');
        const query = `
            SELECT * 
            FROM participants`; // Replace `participants` with your actual database table name
        const result = await pool.query(query);

        res.status(200).json({ success: true, participants: result.rows });
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ success: false, message: 'Error fetching participants', error });
    }
};
const removeParticipant = async (req, res) => {
    const { id } = req.params;

    try {
        // Remove participant from the database
        const query = 'DELETE FROM participants WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Participant removed successfully', participant: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Participant not found' });
        }
    } catch (error) {
        console.error('Error removing participant:', error);
        res.status(500).json({ error: 'Failed to remove participant' });
    }
};
const updateParticipant = async (req, res) => {
    const { id } = req.params; // Participant's unique ID
    const { name,  event_category } = req.body; // New data to be updated

    try {
        // Validate the participant exists
        const participantCheckQuery = 'SELECT * FROM participants WHERE id = $1';
        const participantCheck = await pool.query(participantCheckQuery, [id]);
        if (participantCheck.rowCount === 0) {
            return res.status(404).json({ message: 'Participant not found!' });
        }

        // Update the participant's name, email, and event category
        const query = `
            UPDATE participants 
            SET name = $1,  event_category = $2
            WHERE id = $3
            RETURNING *`;
        const result = await pool.query(query, [name,  event_category, id]);

        if (result.rowCount > 0) {
            res.status(200).json({
                message: 'Participant details updated successfully!',
                participant: result.rows[0], // Returning the updated participant record
            });
        } else {
            res.status(404).json({ message: 'Participant not found!' });
        }
    } catch (error) {
        console.error('Error updating participant details:', error);
        res.status(500).json({ error: 'Failed to update participant details' });
    }
};
const getParticipantById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch participant details from the database
        const query = 'SELECT * FROM participants WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rowCount > 0) {
            // Return the participant data for editing
            res.status(200).json({
                success: true,
                participant: result.rows[0], // Send participant data back
            });
        } else {
            res.status(404).json({ message: 'Participant not found!' });
        }
    } catch (error) {
        console.error('Error fetching participant:', error);
        res.status(500).json({ error: 'Failed to fetch participant details' });
    }
};



module.exports = {
    participate,getParticipants,removeParticipant,updateParticipant,getParticipantById
};
