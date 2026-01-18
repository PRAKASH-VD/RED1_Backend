import Appointment from "../Models/appointmentModel.js";
import Property from "../Models/propertyModel.js";
import User from "../Models/userModel.js";

/* ================= CREATE ================= */
export const createAppointment = async (req, res) => {
  try {
    const { propertyId, scheduledAt, notes } = req.body;

    const property = await Property.findById(propertyId).populate("agent");
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // ✅ AUTO-ASSIGN AGENT IF MISSING
    let agentId = property.agent?._id;

    if (!agentId) {
      const fallbackAgent = await User.findOne({ role: "agent" });
      if (!fallbackAgent) {
        return res.status(400).json({
          success: false,
          message: "No agent available",
        });
      }
      agentId = fallbackAgent._id;

      // save auto-assigned agent
      property.agent = agentId;
      await property.save();
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      property: property._id,
      agent: agentId,
      scheduledAt,
      notes,
    });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error("CREATE APPOINTMENT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= CUSTOMER ================= */
export const getCustomerAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate("property", "name price")
    .populate("agent", "name email")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: appointments });
};

export const cancelAppointment = async (req, res) => {
  const appt = await Appointment.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!appt) {
    return res.status(404).json({ success: false, message: "Not found" });
  }

  appt.status = "Cancelled";
  await appt.save();

  res.json({ success: true, data: appt });
};

/* ================= AGENT ================= */
export const getAgentAppointments = async (req, res) => {
  const appointments = await Appointment.find({ agent: req.user._id })
    .populate("user", "name email")
    .populate("property", "name price");

  res.json({ success: true, data: appointments });
};

export const updateAppointmentStatus = async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  if (!appt) return res.status(404).json({ success: false });

  appt.status = req.body.status;
  await appt.save();

  res.json({ success: true, data: appt });
};
