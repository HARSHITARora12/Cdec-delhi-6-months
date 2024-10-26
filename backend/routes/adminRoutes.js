const express = require('express');
const { getAllEvents } = require('../controllers/eventController');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const router = express.Router();

// Define the route to fetch all events
router.post('/register',registerAdmin);
// router.get('/login',log)
router.post('/login', loginAdmin);

module.exports = router;
