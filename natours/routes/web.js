const tourRouter = require('./tourRoutes');
const userRouter = require('./userRoutes');

module.exports = (app) => {
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/users', userRouter);
  app.all('*', (req, res, next) => {
    res
      .status(404)
      .json({ status: 'fail', message: `Can't found ${req.originalUrl}` });
  });
};
