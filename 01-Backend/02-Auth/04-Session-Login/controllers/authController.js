import bcrypt from "bcrypt";
import { users } from "../models/userModel.js";
import { simulateDBDelay } from "../utils/dbSimulate.js";

// =======================================
// 🔒 REGISTER
// =======================================
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    await simulateDBDelay(800);

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    console.log("✅ Registered Users:", users);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: { username },
    });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// =======================================
// 🔑 LOGIN (Session-based)
// =======================================
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await simulateDBDelay(500);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // ✅ Create session
    req.session.user = { username };
    console.log("✅ Session Created:", req.session);

    res.json({
      success: true,
      message: `Welcome back, ${username}! 🎉 You are now logged in.`,
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// =======================================
// 🔐 PROFILE (Protected Route)
// =======================================
export const getProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in first.",
    });
  }

  res.json({
    success: true,
    message: `Hello, ${req.session.user.username}! 👋 You are logged in.`,
  });
};

// =======================================
// 🚪 LOGOUT
// =======================================
export const logoutUser = (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({
      success: false,
      message: "No active session found.",
    });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Logout Error:", err);
      return res.status(500).json({
        success: false,
        message: "Could not log out.",
      });
    }

    res.clearCookie("connect.sid");
    res.json({
      success: true,
      message: "You have been logged out successfully.",
    });
  });
};
