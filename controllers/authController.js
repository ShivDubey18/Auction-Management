const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');


// Helper function to generate JWT token
const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '10h' });
};

// User Registration
exports.registerUser = async (req, res) => {
    const { firstname, lastname, email, password, id_proof, id_number, dob, phone_no, address, gender } = req.body;
    // console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (first_name, last_name, email, password, id_proof, id_number, dob, phone_no, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstname, lastname, email, hashedPassword, id_proof, id_number, dob, phone_no, address, gender],
        (err) => {
            if (err) return res.status(500).json({ message: 'User registration failed', error: err });
            res.json({ message: 'User registered successfully' });
        }
    );
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
    const { firstname, lastname, email, password, id_proof, id_number, dob, phone_no, address, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO admins (first_name, last_name, email, password, id_proof, id_number, dob, phone_no, address, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstname, lastname, email, hashedPassword, id_proof, id_number, dob, phone_no, address, gender],
        (err) => {
            if (err) return res.status(500).json({ message: 'Admin registration failed', error: err });
            res.json({ message: 'Admin registered successfully' });
        }
    );
};

// Login for User
exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const user = results[0];
        // console.log(user.user_id);
        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Assuming users table has a role column; if not, you can set role here
        const role = user.role || 'user'; // Default to 'user' if role is not present

        // Generate a token with the user id, email, and role
        const token = generateToken(user.user_id, user.email, role);
        res.cookie("token", token);
        // console.log(user.id);
        // Respond with success
        res.json({ success: true, message: 'Login successful', token });
    });

};

// Admin Login
exports.Adminlogin = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM admins WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const admin = results[0];

        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Assuming users table has a role column; if not, you can set role here
        const role = admin.role || 'admin'; // Default to 'user' if role is not present

        // Generate a token with the user id, email, and role
        const token = generateToken(admin.id, admin.email, role);

        // Respond with success
        res.json({ success: true, message: 'Login successful', token });
    });

};

