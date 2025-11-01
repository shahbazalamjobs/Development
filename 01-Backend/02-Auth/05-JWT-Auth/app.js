import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { PORT } from "./config/envConfig.js";

const app = express();
app.use(express.json());

// ✅ Mount Routes
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to JWT Auth API 🔒🚀" });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
