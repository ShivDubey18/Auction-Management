const db = require('../config/db');
const jwt = require("jsonwebtoken");

// Controller to get pending products
exports.getPendingProducts = (req, res) => {
    const query = `
        SELECT p.product_id, p.product_name, p.base_price, p.image, p.category 
        FROM products p
        WHERE p.status = 'pending'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(results);
    });
};


//  product accept or reject by admin


exports.updateProductStatus = (req, res) => {
    const productId = req.params.id;
    const { status } = req.body;

    const query = 'UPDATE products SET status = ? WHERE product_id = ?';
    db.query(query, [status, productId], (error, results) => {
        if (error) {
            console.error('Error updating product status:', error);
            return res.status(500).send('Internal Server Error');
        }
        res.sendStatus(200);
    });
};


