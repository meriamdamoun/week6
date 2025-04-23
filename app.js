const express = require('express');
const sequelize = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const { User, HashPwd } = require('./models/userModel');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
const PORT = 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database sync error:', err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

module.exports = app;