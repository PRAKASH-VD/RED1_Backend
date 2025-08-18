import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Apartment", "House", "Villa", "Plot", "Commercial"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
    coords: {
    lat: { type: Number },
    lng: { type: Number }
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" },
},{timestamps: true});

// const Property = mongoose.model("Property", propertySchema);
const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);
export default Property;
