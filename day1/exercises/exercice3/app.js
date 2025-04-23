const express = require('express');
const app = express();
const booksRouter = require('./routes/books');

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the books router
app.use('/books', booksRouter);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});