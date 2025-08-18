import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
} from "../Controllers/appointmentController.js";
import { protect, admin } from "../Middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createAppointment); // create appointment
router.get("/my", protect, getMyAppointments); // get my appointments

// Admin routes
router.get("/", protect, admin, getAllAppointments); // all appointments
router.put("/:id", protect, admin, updateAppointmentStatus); // update status


export default router;
