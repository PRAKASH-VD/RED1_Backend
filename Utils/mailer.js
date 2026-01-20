import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"RED1 Property Portal" <${process.env.PASS_MAIL}>`,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

export default sendEmail;
