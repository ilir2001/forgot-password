// userRouter.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other user-related routes can be added here

module.exports = router;
