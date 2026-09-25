const express = require("express");
const router = express.Router();
const {
  getWeather,
  getHistory,
  clearHistory,
} = require("../controllers/weatherController");
const protect = require("../middleware/auth");

// Optional auth middleware - saves history if logged in
const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    try {
      const jwt = require("jsonwebtoken");
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (_) {}
  }
  next();
};

router.get("/:city", optionalAuth, getWeather);
router.get("/user/history", protect, getHistory);
router.delete("/user/history", protect, clearHistory);

module.exports = router;
