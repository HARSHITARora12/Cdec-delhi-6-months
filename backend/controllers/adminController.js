const bcrypt = require('bcryptjs');
const adminModel = require('../models/admin');

// Admin registration handler
const registerAdmin = async (req, res) => {
    const { name, adminId, department, phoneNumber, email, password, gender } = req.body;
    // console.log(req.body);
    // console.log("aror",phoneNumber);

    try {
        // Hash the password before storing it
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Add the admin to the database
        const newAdmin = await adminModel.addAdmin(name, adminId, department, phoneNumber, email, hashedPassword, gender);
    //   console.log("hey harshi",newAdmin);
        return res.status(201).json({ status: 'success', admin: newAdmin });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: 'error', message: err.message });
    }
};

// Admin login handler
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists in the database by email
        const admin = await adminModel.findAdminByEmail(email);

        if (!admin) {
            return res.status(404).json({ status: 'error', message: 'Admin not found' });
        }

        // Compare the entered password with the stored hashed password
        const passwordIsValid = bcrypt.compareSync(password, admin.password);

        if (!passwordIsValid) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }

        // If login is successful, return admin details
        return res.status(200).json({ 
            status: 'success', 
            message: 'Login successful', 
            admin: { 
                name: admin.name,
                email: admin.email,
                department: admin.department
            } 
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Export both handlers
module.exports = {
    registerAdmin,
    loginAdmin
};
