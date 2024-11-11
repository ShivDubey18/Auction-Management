// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Route to get user profile
// router.get('/profile/:id', userController.getUserProfile);

// // Route to update user profile
// router.put('/profile/:id', userController.updateUserProfile);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get user profile by user_id
router.get('/profile/:user_id', userController.getUserProfile);

module.exports = router;

