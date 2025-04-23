const express = require('express');
const app = express();
const port = 3000;

// Import the router module
const indexRouter = require('./routes/index');

// Mount the router
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});