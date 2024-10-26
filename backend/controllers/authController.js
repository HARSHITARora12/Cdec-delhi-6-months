const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const pool = require('../db');

let otpStore = {}; // Temporary storage for OTPs

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'harshitaarora895@gmail.com',
        pass: 'hipq ntfc cnsr clgf'
    }
});

// Request OTP for password reset
exports.requestOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const result = await pool.query('SELECT * FROM admin_registration WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.json({ success: false, message: 'Email not found.' });
        }

        // Generate and store OTP with expiration
        const otp = crypto.randomInt(100000, 999999);
        otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };
        console.log(Date.now() + 5 * 60 * 1000 )
        // Send OTP via email
        await transporter.sendMail({
            from: 'harshitaarora895@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`
        });

        res.json({ success: true, message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Error requesting OTP:', error);
        res.status(500).json({ success: false, message: 'Error sending OTP.' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Verify OTP and check expiration
        console.log(otp+email);
        const otpEntry = otpStore[email];
        if (!otpEntry || otpEntry.otp !== parseInt(otp) || otpEntry.expires < Date.now()) {
            return res.json({ success: false, message: 'Invalid or expired OTP.' });
        }

        // Update the password in PostgreSQL
        const hashedPassword = bcrypt.hashSync(newPassword, 8);
        await pool.query('UPDATE admin_registration SET password = $1 WHERE email = $2', [hashedPassword, email]);

        // Clear OTP after successful reset
        delete otpStore[email];

        res.json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Error resetting password.' });
    }
};
