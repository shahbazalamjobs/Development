import bcrypt from "bcrypt";
import { users } from "../models/userModel.js";
import { simulateDBDelay } from "../utils/dbSimulate.js";

// ===============================
// 🔒 REGISTER USER
// ===============================
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Check if user exists
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Simulate DB delay
    await simulateDBDelay(800);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    users.push({ username, password: hashedPassword });
    console.log("✅ Registered Users:", users);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: { username },
    });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ===============================
// 🔑 LOGIN USER
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Find user
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Simulate DB delay
    await simulateDBDelay(500);

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    res.json({
      success: true,
      message: "Login successful!",
      data: { username },
    });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
