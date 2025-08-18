import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional for guests
  name: String, email: String, phone: String,
  message: { type: String, required: true },
  status: { type: String, enum:["New","Replied","Closed"], default:"New" }
}, { timestamps:true });


const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;