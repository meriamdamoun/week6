const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
  res.send('Welcome to the Homepage!');
});

// About Us route
router.get('/about', (req, res) => {
  res.send('This is the About Us page');
});

module.exports = router;