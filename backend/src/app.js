const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const axios = require("axios"); // Add Axios for HTTP requests

const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
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
