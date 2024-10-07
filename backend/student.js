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
//     database: 'user_details',
//     password: '1234',
//     port: 5432,
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Serve static files from the "public" directory
// app.use(express.static('public'));

// // Serve the registration page
// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Handle user registration
// app.post('/register', async (req, res) => {
//     const {
//         fullName,
//         studentId,
//         email,
//         password,
//         age,
//         phoneNumber,
//         course,
//         branch,
//         year,
//         gender
//     } = req.body;

//     // Hash the password
//     const hashedPassword = bcrypt.hashSync(password, 8);

//     try {
//         // Insert user details into the database
//         await pool.query(
//             `INSERT INTO students 
//             (fullName, studentId, email, password, age, phoneNumber, course, branch, year, gender) 
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
//             [fullName, studentId, email, hashedPassword, age, phoneNumber, course, branch, year, gender]
//         );
//         res.send('Registration successful!');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// });

// // After registration, redirect to login page
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
