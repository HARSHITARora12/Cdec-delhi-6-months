const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findUserByEmail(email); // Use model to find user by email
     
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = { name: user.full_name, email: user.email ,phone:user.phone_number}; 
            console.log(req.session);
            res.json({ status: 'success', name: user.full_name, email: user.email });
        } else {
            res.send('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.register = async (req, res) => {
    const {
        fullName, studentId, email, password, age, phoneNumber, course, branch, year, gender
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        await userModel.createUser({
            fullName,
            studentId,
            email,
            hashedPassword,
            age,
            phoneNumber,
            course,
            branch,
            year,
            gender
        }); // Use model to insert a new user

        req.session.user = { name: fullName, email: email }; // Store user in session after registration
        console.log(req.session);
        res.json({ status: 'success', name: fullName, email: email });
    } catch (err) {
        // console.error(err);
        res.status(500).send('Server error');
    }
};
