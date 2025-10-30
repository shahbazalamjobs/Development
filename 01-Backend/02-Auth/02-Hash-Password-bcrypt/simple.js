// app.js
import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// In-memory "database"
const users = [];

// 🔒 POST /register — Register user with hashed password
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Check for existing username
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Simulate DB delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 🔐 Hash password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user (hashed password only)
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
});

// ✅ GET route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Secure User Registration API 🔒🚀" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
