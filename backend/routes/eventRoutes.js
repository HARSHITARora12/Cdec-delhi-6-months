const express = require('express');
const { getAllEvents } = require('../controllers/eventController');

const router = express.Router();

// Define the route to fetch all events
router.get('/events', getAllEvents);

module.exports = router;
