import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
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
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
