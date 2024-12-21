const express = require('express');
const router = express.Router();

// Example Route: Get all users
router.get('/', (req, res) => {
  res.json({ message: 'User route works!' });
});

module.exports = router; // Export the router
