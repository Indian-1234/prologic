require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require('multer');

// Create an instance of express
const app = express();

// Middleware setup for CORS
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Middleware for parsing URL-encoded and JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware for cookies and sessions
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || "yourSecret", // Better to use environment variable
  resave: false,
  saveUninitialized: false, // Changed to false for better security
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Authentication middleware
const checkAuth = (req, res, next) => {
  console.log(req.cookies.auth_token,"gu")
  const token = req.cookies.auth_token;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("error")
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Basic route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import routes
const authRoutes = require("./routes/auth");
const socialAuthRoutes = require("./routes/socialAuth");
const courseRoutes = require("./routes/courseRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const forumRoutes = require("./routes/forumRoutes");

// Public routes (no authentication required)
app.use("/api/auth", authRoutes);
app.use("/auth", socialAuthRoutes);

// Protected routes (authentication required)
app.use("/api/courses", checkAuth, courseRoutes);
app.use("/api/chapters", checkAuth, chapterRoutes);
app.use("/api/forum", checkAuth, forumRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));