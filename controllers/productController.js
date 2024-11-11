const db = require('../config/db');
const jwt = require("jsonwebtoken");

exports.submitProduct = (req, res) => {
    const {
        product_name,
        owner,
        base_price,
        email,
        product_description,
        category,
        model,
        company,
        fuel_type,
        car_color,
        kilometer_run,
        art_type,
        artist_name,
        painting_age
    } = req.body;


    
    const product_image = req.file ? req.file.filename : null; // Get the uploaded file name

    const { token } = req.cookies;

    // Verify the JWT token
    let user_id;
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        user_id = payload.id;
    } catch (err) {
        console.error('JWT Verification Error:', err); // Log detailed error for debugging
        return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }

    let query;
    let params;

    // Determine query and parameters based on the category
    if (category === 'car') {
        query = `
            INSERT INTO products 
            (product_name, user_id, owner,base_price, email, product_description, image, category, model, company, fuel_type, car_color, kilometer_run) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        params = [product_name, user_id, owner, base_price, email, product_description, product_image, category, model, company, fuel_type, car_color, kilometer_run];
    } else if (category === 'painting') {
        query = `
            INSERT INTO products 
            (product_name, user_id, owner,base_price, email, product_description, image, category, art_type, artist_name, painting_age) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        params = [product_name, user_id, owner, base_price, email, product_description, product_image, category, art_type, artist_name, painting_age];
    } else {
        return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    // Execute the database query
    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database Error: ', err.message); // Log the specific error message
            return res.status(500).json({ success: false, message: `Error submitting product: ${err.message}` });
        }
        res.json({ success: true, message: 'Product submitted successfully' });
    });
};






