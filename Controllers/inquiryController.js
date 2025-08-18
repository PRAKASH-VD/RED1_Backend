import Inquiry from "../Models/inquiryModel.js";
import sendEmail from "../Utils/mailer.js";

export const createInquiry = async (req, res) => {
  const { property, name, email, phone, message } = req.body;
  const inquiry = await Inquiry.create({
    property,
    user: req.user?._id,
    name,
    email,
    phone,
    message,
  });
  await sendEmail(
    process.env.SUPPORT_MAIL || process.env.PASS_MAIL,
    "New Property Inquiry",
    `Property: ${property}\nFrom: ${name} <${email}>\n${message}`
  );
  res.status(201).json({ message: "Inquiry submitted", data: inquiry });
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

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

