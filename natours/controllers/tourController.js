const { Tour } = require('../models/Tour');

const index = async (req, res) => {
  try {
    // GET Query Params
    const quaryObj = { ...req.query };
    const excludedFeilds = ['page', 'limit', 'sort', 'fields'];
    excludedFeilds.forEach((el) => delete quaryObj[el]);

    // Filtering
    const queryString = JSON.stringify(quaryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // Build Query
    const quary = Tour.find(JSON.parse(queryString));

    // Excute Quer
    const tours = await quary;

    // Send Response
    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: 'ARROR!' });
  }
};

const create = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: newTour });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'INVALID DATA SEND!' });
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id);
    // Tour.findOne({ _id: id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'ARROR!' });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const tour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'ARROR!' });
  }
};

const destory = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: 'ARROR!' });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destory,
};
