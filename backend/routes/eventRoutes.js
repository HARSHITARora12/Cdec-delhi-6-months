const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Define the route to fetch all events
router.get('/events', eventController.getAllEvents);
// routes/eventRoutes.js
router.post('/createEvents', eventController.createEvent);
router.get('/events/:id', eventController.getEventById); 
        // GET /api/events/:id
router.put('/events/:id', eventController.updateEvent);
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
