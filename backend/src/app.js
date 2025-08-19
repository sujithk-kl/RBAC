const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const axios = require("axios"); // For pinging your app
const cors = require("cors");

const app = express();

// Configure CORS to allow both production and development origins
const allowedOrigins = [
  'https://zeroshield.vercel.app',
  'https://zeroshield.sujithk.me', // Production URL
  'http://localhost:5173' // Development URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Enable cookies or other credentials
};

app.use(cors(corsOptions)); // Use the CORS middleware with the configured options

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Ping the website every 5 minutes (300000ms)
const pingWebsite = () => {
  const url = process.env.RENDER_URL; // Get the URL from the .env file
  if (!url) {
    console.error("RENDER_URL is not defined in the .env file.");
    return;
  }

  setInterval(() => {
    axios
      .get(url) // Use the URL from .env
      .then((response) => {
        console.log("Website pinged successfully:", response.status);
      })
      .catch((error) => {
        console.error("Error pinging website:", error.message);
      });
  }, 300000); // 300000ms = 5 minutes
};

// Start pinging the website after the app starts
pingWebsite();

module.exports = app;
