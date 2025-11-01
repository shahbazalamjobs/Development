import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js";
import { simulateDBDelay } from "../utils/dbSimulate.js";
import { JWT_SECRET } from "../config/envConfig.js";

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
// 🔑 LOGIN (Returns JWT)
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // ✅ Sign JWT (expires in 1 hour)
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      success: true,
      message: `Welcome back, ${username}!`,
      token,
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
  res.json({
    success: true,
    message: "Profile accessed successfully.",
    user: req.user,
  });
};
