import Inquiry from "../Models/inquiryModel.js";
import Property from "../Models/propertyModel.js";
import sendEmail from "../Utils/mailer.js";

export const createInquiry = async (req, res) => {
  try {
    const {
      property,
      name,
      email,
      phone,
      message,
      preferredDate,
      preferredTime,
    } = req.body;

    if (!property || !name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Get property + agent
    const prop = await Property.findById(property).populate("agent");

    if (!prop || !prop.agent) {
      return res.status(404).json({ message: "Property or agent not found" });
    }

    // 2️⃣ Save inquiry (guest OR logged-in user)
    const inquiry = await Inquiry.create({
      property,
      name,
      email,
      phone,
      message,
      user: req.user?._id || null,
    });

    // 3️⃣ Email content
    const emailText = `
New Property Inquiry

Property: ${prop.name}
Location: ${prop.location || "N/A"}

From: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

Message:
${message}

Preferred Date: ${preferredDate || "Not specified"}
Preferred Time: ${preferredTime || "Not specified"}
`;

    // 4️⃣ Send email (NON-BLOCKING)
    sendEmail(
      prop.agent.email,
      `New Inquiry for ${prop.name}`,
      emailText
    ).catch(() => {});

    res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Inquiry Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ user: req.user._id })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
