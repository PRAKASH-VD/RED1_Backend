import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
 
  password: {
    type: String,
    required: true,
  },
   contact: {
    type: Number,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "customer", "agent"],
    default: "customer",
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
