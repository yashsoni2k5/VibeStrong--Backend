const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'], // Regex for exactly 10 digits
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], // Regex for basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    match: [/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'], // Regex for at least one special character
  },
  businesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business' // Reference to the Business model
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);


