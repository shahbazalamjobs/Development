// app.js
const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// 🧠 In-memory "database"
const users = [];

// 📩 POST /register - Register new user
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

    // Check for duplicate username
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Simulate DB delay using setTimeout (asynchronous)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user in memory
    users.push({ username, password });

    console.log("✅ Registered Users:", users);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: { username },
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User Registration API 🚀" });
});

// 🧱 Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
