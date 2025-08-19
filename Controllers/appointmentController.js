import Appointment from "../Models/appointmentModel.js";
import Property from "../Models/propertyModel.js"; // to fetch agent
import sendEmail from "../Utils/mailer.js";

// Create appointment + send mail
export const createAppointment = async (req, res) => {
  try {
    const { propertyId, scheduledAt, notes } = req.body;

    // Find property and get agent
    const property = await Property.findById(propertyId).populate("agent");
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    const appointment = await Appointment.create({
      user: req.user._id,
      property: propertyId,
      agent: property.agent, // assigned agent
      scheduledAt,
      notes,
    });

    // Email to customer
    await sendEmail(
      req.user.email,
      "Appointment Confirmation",
      `Hello ${req.user.name},\n\nYour appointment for property "${property.title}" has been scheduled on ${new Date(
        scheduledAt
      ).toLocaleString()}.\n\nNotes: ${notes || "N/A"}\n\nThank you.`
    );

    // Email to agent
    if (property.agent?.email) {
      await sendEmail(
        property.agent.email,
        "New Appointment Request",
        `Hello ${property.agent.name},\n\nYou have a new appointment request for property "${property.title}" scheduled on ${new Date(
          scheduledAt
        ).toLocaleString()}.\n\nCustomer: ${req.user.name} (${req.user.email})\n\nNotes: ${notes || "N/A"}`
      );
    }

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getCustomerAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("agent", "name email")
      .populate("property", "title price")
      .sort({ scheduledAt: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Customer: Get all my appointments
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("property", "title price")
      .sort({ scheduledAt: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Agent: Get all appointments assigned to me
export const getAgentAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ agent: req.user._id })
      .populate("user", "name email")
      .populate("property", "title price")
      .sort({ scheduledAt: 1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "name email")
      .populate("agent", "name email")
      .populate("property", "title price");

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update appointment status + send mail
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id).populate("user property agent");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    // Notify customer
    await sendEmail(
      appointment.user.email,
      "Appointment Status Update",
      `Hello ${appointment.user.name},\n\nYour appointment for property "${appointment.property.title}" has been updated to status: ${status}.\n\nThank you.`
    );

    // Notify agent
    if (appointment.agent?.email) {
      await sendEmail(
        appointment.agent.email,
        "Appointment Status Updated",
        `Hello ${appointment.agent.name},\n\nThe appointment for property "${appointment.property.title}" with customer ${appointment.user.name} has been updated to status: ${status}.`
      );
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
