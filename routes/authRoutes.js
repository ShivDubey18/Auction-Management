const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration route
router.post('/registerUser', authController.registerUser);

// Admin registration route
router.post('/registerAdmin', authController.registerAdmin);

// Login route for both User and Admin
router.post('/login', authController.login);

// admin login
router.post('/Adminlogin', authController.Adminlogin);

module.exports = router;
