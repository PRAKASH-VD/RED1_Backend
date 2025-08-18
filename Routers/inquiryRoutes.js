import express from "express";
import { createInquiry, getMyInquiries } from "../Controllers/inquiryController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createInquiry); // create inquiry
router.get("/my", protect, getMyInquiries); // get my inquiries

export default router;
