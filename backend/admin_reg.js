// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');
// const bcrypt = require('bcryptjs');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Database connection pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'user_details', // Your database name
//     password: '1234',
//     port: 5432,
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // Serve the registration page at the signup URL
// app.get('/signup', (req, res) => {
//     res.sendFile(__dirname + '/public/admin_form.html'); // Adjust the path if needed
// });

// // Handle admin registration
// app.post('/register', async (req, res) => {
//     const { fName, lName, designation, employeeId, contact, email, password, confirmPassword } = req.body;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         return res.status(400).send('Passwords do not match');
//     }

//     // Hash the password
//     const hashedPassword = bcrypt.hashSync(password, 8);

//     try {
//         // Insert data into the admin_registration table
//         await pool.query(
//             'INSERT INTO admin_registration (fName, lName, designation, employeeId, contact, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
//             [fName, lName, designation, employeeId, contact, email, hashedPassword]
//         );
//         res.send('Admin registration successful');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
