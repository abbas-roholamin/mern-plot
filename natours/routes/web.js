const tourRouter = require('./tourRoutes');
const userRouter = require('./userRoutes');

module.exports = (app) => {
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/users', userRouter);
};
