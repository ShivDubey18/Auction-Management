// routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const path = require("path")
const productController = require('../controllers/productController');

const router = express.Router();

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the destination folder for uploaded files
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        // Specify the filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Create a unique file name
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add original file extension
    }
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });



router.post('/upload', upload.single('product_image'), productController.submitProduct);

module.exports = router;
