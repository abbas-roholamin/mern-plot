const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config({ path: './.env' });
require('./database');
const router = require('./routes/web');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// Router
router(app);

// Listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
