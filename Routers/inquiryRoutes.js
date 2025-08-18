import express from "express";
import { createInquiry, getMyInquiries } from "../Controllers/inquiryController.js";
import { authMiddleware  } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createInquiry); // create inquiry
router.get("/my", authMiddleware, getMyInquiries); // get my inquiries

export default router;
