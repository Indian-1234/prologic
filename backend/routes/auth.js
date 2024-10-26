// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const router = express.Router();

// Register with email/password
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, name });
  await user.save();
  res.status(201).json({ message: "User created" });
});

// Login with email/password
router.post("/login", async (req, res) => {
  const { email, password, deviceId } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    // Check the number of devices the user is logged in from
    if (user.devices.length >= 3) {
      // If there are already 3 devices, remove the oldest one
      user.devices.shift(); // Removes the first (oldest) device
    }

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Add the new device
    user.devices.push({ deviceId, lastLogin: new Date() });
    user.tokens = { accessToken, refreshToken };
    await user.save();

    // Set the access token in a cookie
    res.cookie("auth_token", accessToken, { httpOnly: true, secure: true });
    return res.json({ refreshToken }); // Optionally return the refresh token or other data
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


// Logout
router.post("/logout", async (req, res) => {
  // Assuming you have a way to check if the user is authenticated
  const user = req.user; // This would typically be set by your authentication middleware

  if (true) {
    res.clearCookie("auth_token"); // Clear the authentication cookie
    res.json({ message: "Logged out" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});



module.exports = router;
