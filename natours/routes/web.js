const ErrorHandler = require('../controllers/ErrorHandler');
const Abort = require('../utils/Abort');
const TourRouter = require('./TourRoutes');
const UserRouter = require('./UserRoutes');

module.exports = (app) => {
  app.use('/api/v1/tours', TourRouter);
  app.use('/api/v1/users', UserRouter);
  app.all('*', (req, res, next) => {
    next(new Abort(`Can't found ${req.originalUrl}`, 404));
  });
  app.use(ErrorHandler);
};
