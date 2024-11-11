const db = require('../config/db'); // Make sure this points to your db.js

// Controller function to get user data by user_id
async function getUserProfile(req, res) {
    try {
      const userId = req.params.user_id; // Assuming user_id is passed as URL parameter
  
      // Query the database to get user details
      const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send user data as a JSON response
      res.json(rows[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  }
  
  module.exports = { getUserProfile };
  
// Update user profile data
// exports.updateUserProfile = async (req, res) => {
//     const userId = req.params.id;
//     const { first_name, last_name, email, dob, phone_no, address, gender } = req.body;

//     try {
//         await db.query(
//             `UPDATE users SET first_name = ?, last_name = ?, email = ?, dob = ?, phone_no = ?, address = ?, gender = ?
//              WHERE user_id = ?`,
//             [first_name, last_name, email, dob, phone_no, address, gender, userId]
//         );
//         res.json({ message: "Profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update profile" });
//     }
// };
