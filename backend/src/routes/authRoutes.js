const express = require("express");
const { body } = require("express-validator");
const { login, register } = require("../controllers/authController");
const checkPermission = require("../middlewares/checkPermission"); // Ensure the path is correct
const authenticateToken = require("../middlewares/authMiddleware"); // Ensure the path is correct

const router = express.Router();

// Public Routes
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// General Protected Routes Example
router.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

// Protected Routes with Role-Based Access (Using ACL Permissions)
router.post(
  "/addUser",
  [authenticateToken, checkPermission("CEO", "add_user")],
  (req, res) => {
    res.json({ message: "User added successfully!" });
  }
);

router.get(
  "/viewLogs",
  [authenticateToken, checkPermission("CEO", "view_logs")],
  (req, res) => {
    res.json({ message: "Logs viewed successfully!" });
  }
);

router.post(
  "/assignTask",
  [authenticateToken, checkPermission("TeamLeader", "assign_tasks")],
  (req, res) => {
    res.json({ message: "Task assigned successfully!" });
  }
);

module.exports = router;
