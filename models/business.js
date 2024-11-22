const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    contact: { type: String },
    category: { type: String },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the User model
      required: true 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Business', businessSchema);