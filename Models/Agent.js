const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bio: String,
    contact: String,
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

module.exports = mongoose.model('Agent', agentSchema);
