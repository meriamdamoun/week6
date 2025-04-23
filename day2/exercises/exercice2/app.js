const express = require('express');
const app = express();
const bookRoutes = require('./server/routes/bookRoutes');
const sequelize = require('./server/config/db');

app.use(express.json());

app.use('/api/books', bookRoutes);

// Database synchronization
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
  
  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to sync database:', error);
});