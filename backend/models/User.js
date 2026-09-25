const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
  city: String,
  searchedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    searchHistory: [searchHistorySchema],
    resetToken: String,
resetTokenExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


