const express = require('express');
const router = express.Router();

// Example Login Route
router.post('/login', (req, res) => {
  res.json({ message: 'Login route works!' });
});

// Example Register Route
router.post('/register', (req, res) => {
  res.json({ message: 'Register route works!' });
});

module.exports = router; // Export the router
