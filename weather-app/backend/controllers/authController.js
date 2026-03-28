const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// EMAIL TRANSPORTER
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // ✅ HANDLE NOT REGISTERED (NO ERROR)
  if (!user) {
    return res.json({
      msg: "Email not registered",
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
  await user.save();
  
  const resetLink = `${process.env.FRONTEND_URL.replace(/\/$/, "")}/reset-password/${token}`;

  console.log("RESET LINK:", resetLink);

  //SEND EMAIL HERE
 try {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user.email,
    subject: "Reset Your Password",
    html: `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `,
  });

  res.json({ msg: "Reset link sent to email" });

} catch (error) {
  console.log("EMAIL ERROR:", error.message);

  // fallback (important)
  console.log("RESET LINK:", resetLink);

  res.json({
    msg: "Email failed, but reset link generated (check server logs)",
  });
}

};

// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ msg: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ msg: "Password updated" });
};

// ================= GET ME =================
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};