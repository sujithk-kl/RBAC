const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const LogModel = require("../models/Log"); // Log model
const hashPassword = require("../utils/hashPassword");
const { encrypt, decrypt } = require("../utils/aesEncryption");

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },  // Add name to the payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Save an encrypted log
exports.saveLog = async (req, res) => {
  const { logMessage } = req.body;

  try {
    // Encrypt the log message
    const encryptedLog = encrypt(logMessage);

    // Save the encrypted log to the database
    await LogModel.create({ log: encryptedLog });

    res.status(200).json({ message: "Log saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving log", error: err.message });
  }
};

// Retrieve and decrypt logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await LogModel.find(); // Retrieve logs from the database
    const decryptedLogs = logs.map((log) => ({
      id: log._id,
      log: decrypt(log.log),  // Decrypt each log
      createdAt: log.createdAt,
    }));

    res.status(200).json({ logs: decryptedLogs });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving logs", error: err.message });
  }
};
