import express from "express";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import sessionConfig from "./config/sessionConfig.js";

const app = express();
app.use(express.json());

// 🧩 Apply session middleware
app.use(session(sessionConfig));

// ✅ Mount Auth Routes
app.use("/api/auth", authRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Secure Session-Based Auth API 🔒🚀" });
});

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});