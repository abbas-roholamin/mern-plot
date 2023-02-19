const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'name of the tour is required'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'price of the tour is required'],
  },
});

exports.Tour = mongoose.model('Tour', schema);
