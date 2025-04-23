const express = require('express');
const quizRouter = require('./routes/quiz');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine (for simple HTML responses)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Routes
app.use('/quiz', quizRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});