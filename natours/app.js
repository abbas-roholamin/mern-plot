const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const router = require('./routes/web');

// Load environment variables
dotenv.config({ path: './.env' });

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
