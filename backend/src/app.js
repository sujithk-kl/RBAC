const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const axios = require("axios"); // For pinging your app
const cors = require("cors");

const app = express();

// Configure CORS to allow specific origins (like your Vercel app)
const corsOptions = {
  origin: 'https://zeroshield.vercel.app', // Add the Vercel app URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can modify the allowed methods if needed
  allowedHeaders: ['Content-Type', 'Authorization'], // You can add other headers if needed
  credentials: true // Enable cookies or other credentials, if required
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

// Start the server (put this after everything is set up)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
