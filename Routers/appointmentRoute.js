import express from "express";
import {
  createAppointment,
  getMyAppointments,
  getAgentAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  getCustomerAppointments
} from "../Controllers/appointmentController.js";
import { protect, admin } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", protect, createAppointment); // create appointment
router.get("/my", protect, getMyAppointments); // my appointments
router.get("/mine", protect, getCustomerAppointments);


// Agent routes
router.get("/agent/my", protect, getAgentAppointments); // agent's appointments


// Admin routes
router.get("/", protect, admin, getAllAppointments); // all appointments
router.put("/:id", protect, admin, updateAppointmentStatus); // update status

export default router;
