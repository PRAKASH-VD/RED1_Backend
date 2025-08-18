import Inquiry from "../Models/inquiryModel.js";
import sendEmail from "../Utils/mailer.js";

export const createInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry({
      property: req.body.property,   
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      user: req.user?._id || null,
    });

    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

