import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Secure User Auth API 🔒🚀" });
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
