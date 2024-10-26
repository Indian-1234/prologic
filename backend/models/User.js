// models/User.js
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceId: String,
  lastLogin: Date,
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: String,
  googleId: String,
  githubId: String,
  devices: [deviceSchema], // Keep track of logged-in devices
accessToken: String,   // Store the access token
refreshToken: String, 
});

module.exports = mongoose.model("User", userSchema);
