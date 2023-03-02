const ErrorHandler = require('../controllers/ErrorHandler');
const Abort = require('../utils/Abort');
const tourRouter = require('./tourRoutes');
const userRouter = require('./userRoutes');

module.exports = (app) => {
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/users', userRouter);
  app.all('*', (req, res, next) => {
    next(new Abort(`Can't found ${req.originalUrl}`, 404));
  });
  app.use(ErrorHandler);
};
