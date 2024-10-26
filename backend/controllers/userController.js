const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findUserByEmail(email); // Find user by email

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = { name: user.full_name, email: user.email, phone: user.phone_number };
            console.log(req.session);
            return res.json({ status: 'success', name: user.full_name, email: user.email });
        } else {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

exports.register = async (req, res) => {
    const {
        fullName, studentId, email, password, age, phoneNumber, course, branch, year, gender
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8); // Hash the password

    try {
        const newUser = await userModel.createUser({
            fullName,
            studentId,
            email,
            password: hashedPassword, // Use the hashed password
            age,
            phoneNumber,
            course,
            branch,
            year,
            gender
        }); // Insert a new user

        req.session.user = { name: fullName, email }; // Store user in session after registration
        console.log(req.session);
        return res.status(201).json({ status: 'success', name: fullName, email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: 'Server error' });
    }
};
