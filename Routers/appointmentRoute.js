import express from "express";
import {
  createAppointment,
  getCustomerAppointments,
  getAgentAppointments,
  cancelAppointment,
  updateAppointmentStatus,
} from "../Controllers/appointmentController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { roleMiddleware } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

/* CUSTOMER */
router.post("/", protect, createAppointment);
router.get("/mine", protect, getCustomerAppointments);
router.put("/cancel/:id", protect, cancelAppointment);

/* AGENT */
router.get("/agent/my", protect, roleMiddleware(["agent"]), getAgentAppointments);
router.put(
  "/agent/:id",
  protect,
  roleMiddleware(["agent"]),
  updateAppointmentStatus
);

export default router;
