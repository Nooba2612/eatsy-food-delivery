const express = require("express");
const router = express.Router();

const authController = require("@controllers/authController");

router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login-user", authController.loginUser);
router.post("/register-user", authController.registerUser);

module.exports = router;
