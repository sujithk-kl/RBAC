const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:5173'); // Redirect to frontend
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Logged out' });
    });
});

router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;
