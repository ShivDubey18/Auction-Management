const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // Import product routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();
var cookieParser = require('cookie-parser')

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Serve static files from 'public/images' and 'views/images'
app.use('/images', express.static(path.join(__dirname, 'views', 'images'))); // For images in the public folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // For uploaded images

// app.use('/api', productRoutes);
// app.get('/product/:productId', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'product_details.html'));
// });
// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/product', productRoutes); // Product submission routes

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Home Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// product upload form route
app.get('/productForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productForm.html'));
});

// User login page route
app.get('/user_login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user_login.html'));
});

// Admin login page route
app.get('/admin_login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin_login.html'));
});

// User register page route
app.get('/user_register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user_register.html'));
});

// Admin registration page route
app.get('/admin_register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin_register.html'));
});

app.get('/admin_dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin_dashboard.html'));
});

app.get('/user_profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user_profile.html'));
});

app.get('/editUser_profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'editUser_profile.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
