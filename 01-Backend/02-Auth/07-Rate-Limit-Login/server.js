import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
app.use(express.json());

// ----------------------------------
// RATE LIMITER FOR LOGIN ROUTE
// ----------------------------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per 15 minutes
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,  // Disable deprecated headers
});

// ----------------------------------
// ROUTES
// ----------------------------------
app.post("/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;

  // Dummy example (replace with real auth logic)
  if (username === "admin" && password === "1234") {
    return res.json({ success: true, message: "Login successful!" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.get("/", (req, res) => {
  res.send("Server running with rate-limited login route ✅");
});

// ----------------------------------
// START SERVER
// ----------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
