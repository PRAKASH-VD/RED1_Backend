import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  property: { type: mongoose.Schema.ObjectId, ref: "Property", required: true },
  agent: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  scheduledAt: { type: Date, required: true },
  notes: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
