import express from "express";
import { createInquiry, getMyInquiries } from "../Controllers/inquiryController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Public (guest allowed)
router.post("/", createInquiry);

// ✅ Protected
router.get("/my", authMiddleware, getMyInquiries);

export default router;
