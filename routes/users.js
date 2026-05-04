const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Register
router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, fullName, country, dietaryPreference } = req.body;
    const user = new User({ username, fullName, country, dietaryPreference });
    await User.register(user, password);
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/recipes',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logged out successfully.');
    res.redirect('/');
  });
});

module.exports = router;