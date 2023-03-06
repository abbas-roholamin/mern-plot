const { User } = require('../models/User');
const request = require('../utils/request');
const Abort = require('../utils/Abort');

const signup = request(async (req, res, newx) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ status: 'success', data: newUser });
});

module.exports = {
  signup,
};
