const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models/User');
const request = require('../utils/request');
const Abort = require('../utils/Abort');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_AT,
  });
};

const signup = request(async (req, res, newx) => {
  const newUser = await User.create(req.body);

  // Genrate JWT token
  const token = signToken(newUser._id);

  res.status(201).json({ status: 'success', token, data: newUser });
});

const login = request(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Abort('Please provide email and password!'));
  }

  const user = await User.find({ email }).select('+password');

  if (!user || !(await user.isMatch(password, user.password))) {
    return next(new Abort('Incorrect email or password', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});

module.exports = {
  signup,
  login,
};
