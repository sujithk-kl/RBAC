const express = require("express");
const { check } = require("express-validator");
const { register } = require("../controllers/authController");

const router = express.Router();

// User registration route
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("role", "Role is required").not().isEmpty(),
  ],
  register
);

module.exports = router;
