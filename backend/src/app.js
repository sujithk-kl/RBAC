const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");



const app = express();
const cors = require("cors");
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = app;
