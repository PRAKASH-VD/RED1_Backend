const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: String,
    type: String,
    location: String,
    price: Number,
    size: Number,
    rooms: Number,
    images: [String],
    description: String,
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Property', propertySchema);
