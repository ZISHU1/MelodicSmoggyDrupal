const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const adminRoutes = require('./src/routes/admin');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
app.use('/admin', adminRoutes);

// Server startup
app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});