
import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, getProfile, registerUserWithRole, refreshToken } from "../Controllers/authController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

const router = express.Router();

// Refresh token endpoint
router.post("/refresh-token", refreshToken);

router.post("/register", registerUser);
// admin-only endpoint to create admin/agent accounts
router.post("/register-role", adminMiddleware, registerUserWithRole);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
// profile
router.get("/profile", protect, getProfile);

export default router;