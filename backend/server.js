const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('cookie-session');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(session({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [process.env.SESSION_SECRET]
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
