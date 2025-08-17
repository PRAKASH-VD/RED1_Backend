import express from "express";
import {
  placeBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../Controllers/bookingController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";
// import { agentMiddleware } from "../Middlewares/agentMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, placeBooking);
router.get("/mybookings", authMiddleware, getMyBookings);
router.get("/allbookings", adminMiddleware, getAllBookings);
router.put(
  "/update/:id",
  adminMiddleware,
  updateBookingStatus
); 
router.delete("/delete/:id", adminMiddleware, deleteBooking);

export default router;
