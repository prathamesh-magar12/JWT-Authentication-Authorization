const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthMiddleware");
const { signup, login } = require("../Controllers/AuthController");

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
