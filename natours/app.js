const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes/web');

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Router
router(app);

// Listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
