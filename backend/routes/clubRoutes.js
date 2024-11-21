const express = require('express');
const router = express.Router();
const {addClub, updateClub, deleteClub, submitJoinRequest, checkJoinRequest } = require('../controllers/clubController');

const { getAllClubs } = require('../controllers/clubController');

// Route to get all clubs
router.get('/clubs', getAllClubs);
router.post('/add', addClub);
router.post('/update', updateClub);
router.delete('/deleteclub/:id', deleteClub);
router.post('/submit-join-request', submitJoinRequest);
router.get('/check-join-request',checkJoinRequest);
module.exports = router;
