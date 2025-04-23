const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');

// Static routes for HTML pages
router.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});
router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Default route to login page
router.get('/', (req, res) => {
  res.redirect('/login.html');
});

// API routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);

module.exports = router;