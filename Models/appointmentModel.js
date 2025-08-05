import mongoose from "mongoose";

const  appointmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Appointment",
        required:true,
    },
  propertys: [
    {
      property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],  
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "pending",
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

const Appointment=mongoose.model("Appointment",appointmentSchema);
export default Appointment;