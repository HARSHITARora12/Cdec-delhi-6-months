// routes/participantsRouter.js
const express = require('express');
const router = express.Router();
const { participate } = require('../controllers/participantsController');

// POST /participate endpoint
router.post('/participate', participate);

module.exports = router;
