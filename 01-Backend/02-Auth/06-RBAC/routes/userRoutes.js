import express from "express";
import { login, getAdminData, getUserData } from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/login", login);

// Protected routes
router.get("/admin", authenticate, authorizeRoles("admin"), getAdminData);
router.get("/profile", authenticate, authorizeRoles("user", "admin"), getUserData);

export default router;
