const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/request-otp', authController.requestOtp);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
