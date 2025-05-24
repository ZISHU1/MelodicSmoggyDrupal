
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle storing of user credentials
router.post('/credentials', async (req, res) => {
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

// Fetch stored credentials
router.get('/credentials', async (req, res) => {
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

module.exports = router;
