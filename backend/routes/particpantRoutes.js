// routes/participantsRouter.js
const express = require('express');
const router = express.Router();
const { participate, getParticipants, removeParticipant, updateParticipant, getParticipantById } = require('../controllers/participantsController');

// POST /participate endpoint
router.post('/participate', participate);
router.get('/participants', getParticipants);
router.delete('/remove-participants/:id',removeParticipant);
router.get('/participants/:id', getParticipantById);
router.put('/participants/:id', updateParticipant);
module.exports = router;
