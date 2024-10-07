// controllers/participantsController.js
const { addParticipant } = require('../models/participantsModel');

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

module.exports = {
    participate,
};
