import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
