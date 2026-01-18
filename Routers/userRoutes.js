import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";
import { updateMyProfile } from "../Controllers/userController.js";
import { uploadAvatar } from "../Middlewares/uploadMiddleware.js";

const router = express.Router();

// Update logged-in user's profile
router.put("/profile", protect, updateMyProfile);
router.put("/profile", protect, uploadAvatar.single("avatar"), updateMyProfile);

export default router;
