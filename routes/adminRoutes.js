const express = require('express');
const path = require("path")
const router = express.Router();
const adminController = require('../controllers/adminController');
const db = require('../config/db')

// Admin dashboard route
router.get('/dashboard', (req, res) => {
    res.render('admin_dashboard'); // Render the admin dashboard page
});


// Route to fetch pending products for cars and paintings
router.get('/get-pending-products', adminController.getPendingProducts);

router.get("/product_details/:productId", (req, res) => {
    const productId = req.params.productId;

    // Query to fetch product data based on productId
    const query = `SELECT * FROM products WHERE product_id = ? AND status = 'pending'`;

    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching product details');
        }

        if (result.length === 0) {
            return res.status(404).send('Product not found or not pending');
        }

        const product = result[0]; // Assuming a single result for the product

        // Check if product contains required properties
        if (!product.image || !product.product_name) {
            return res.status(400).send('Product data is incomplete');
        }

        // Send product data to the EJS template
        res.render("product_details", { product });
    });
});



// // now to change status of product if approved by admin
// // Accept Product and Update Status to Approved
// router.post("/accept_product/:productId", (req, res) => {
//     const productId = req.params.productId;

//     // Query to update the status to 'approved'
//     const query = `UPDATE products SET status = 'approved' WHERE product_id = ?`;

//     db.query(query, [productId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error updating product status');
//         }

//         // Check if the update was successful
//         if (result.affectedRows === 0) {
//             return res.status(404).send('Product not found');
//         }

//         res.redirect(`admin/product_details/${productId}`); // Redirect to product details page after update
//     });
// });


// //if admin reject

// // Reject Product and Delete it from the database
// router.post("/reject_product/:productId", (req, res) => {
//     const productId = req.params.productId;

//     // Query to delete the product from the database
//     const query = `DELETE FROM products WHERE product_id = ?`;

//     db.query(query, [productId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error deleting product');
//         }

//         // Check if the delete was successful
//         if (result.affectedRows === 0) {
//             return res.status(404).send('Product not found');
//         }

//         res.redirect("/admin_dashboard"); // Redirect to admin dashboard after deletion
//     });
// });



module.exports = router;
