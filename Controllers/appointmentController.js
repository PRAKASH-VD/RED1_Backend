import Appointment from "../Models/appointmentModel.js";
import sendEmail from "../Utils/mailer.js";

// Create appointment + send mail
export const createAppointment = async (req, res) => {
  try {
    const { propertyId, scheduledAt, notes } = req.body;

    const appointment = await Appointment.create({
      user: req.user._id,
      property: propertyId,
      scheduledAt,
      notes,
    });

    // Send confirmation email
    await sendEmail(
      req.user.email,
      "Appointment Confirmation",
      `Hello ${req.user.name},\n\nYour appointment for property ${propertyId} has been scheduled on ${new Date(
        scheduledAt
      ).toLocaleString()}.\n\nNotes: ${notes || "N/A"}\n\nThank you.`
    );

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all appointments for logged in user
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("property")
      .sort({ scheduledAt: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "name email")
      .populate("property", "title price");

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update appointment status + send mail
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id).populate("user property");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // Send status update email
    await sendEmail(
      appointment.user.email,
      "Appointment Status Update",
      `Hello ${appointment.user.name},\n\nYour appointment for property "${appointment.property.title}" has been updated to status: ${status}.\n\nThank you.`
    );

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
