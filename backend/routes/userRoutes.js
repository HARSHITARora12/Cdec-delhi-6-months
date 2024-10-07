const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login routes
router.get('/login', (req, res) => res.sendFile(__dirname + '/../public/login.html'));
router.post('/login', userController.login);
// router.get('/student_home_page', (req, res) => {
//     res.render('student_home_page');  // Render the student dashboard page
// });
// Register routes
router.get('/register', (req, res) => res.sendFile(__dirname + '/../public/register.html'));
router.post('/register', userController.register);

// Dashboard route (Displays user's name if logged in)
router.get('/student_home_page', (req, res) => {
    if (req.session.user) {
        res.send(`<h1>Welcome, ${req.session.user.name}!</h1>`); // Display user's name from session
    } else {
        res.redirect('/login');
    }
});
router.get('/get-user-info', (req, res) => {
    if (req.session.user) {
        res.json({ name: req.session.user.name ,
            email: req.session.user.email,
        phone:req.session.user.phone});
    } else {
        console.log("harshita..."+ error);
        res.status(401).json({ error: 'Not authenticated' });
    }
});

module.exports = router;
