const express = require('express');
const morgan = require('morgan');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

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
const server = app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
