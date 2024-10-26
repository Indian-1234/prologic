const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const router = express.Router();

// Google authentication routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  res.redirect("http://localhost:3000/");
});

// GitHub authentication routes
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { session: false }), (req, res) => {
    // Generate a JWT token upon successful authentication
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the cookie or send the token in the response
    res.cookie("auth_token", token, { httpOnly: true, secure: true }); // Set secure to false in development

    // Redirect to your frontend application, possibly with a query parameter
    res.redirect("http://localhost:3000/?auth=true"); // Redirect to your front-end
});

module.exports = router;
