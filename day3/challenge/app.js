// app.js
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const initialize = require('./initialize');

const app = express();
const PORT = process.env.PORT || 3000;

// Run initialization before starting the server
(async () => {
  await initialize();
  

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));


  app.use('/', userRoutes);
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();