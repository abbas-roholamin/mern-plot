const { Tour } = require('../models/Tour');
const request = require('../utils/request');
const Abort = require('../utils/Abort');

const index = request(async (req, res, next) => {
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
  let query = Tour.find(JSON.parse(queryString));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }

  //Limiting Fields
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours) throw new Error('This page does not exist!');
  }

  // Excute Query
  const tours = await query;

  // Send Response
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
});

const create = request(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({ status: 'success', data: newTour });
});

const show = request(async (req, res, next) => {
  const id = req.params.id;

  const tour = await Tour.findById(id);
  // Tour.findOne({ _id: id})

  if (!tour) {
    return next(new Abort('NOT FOUND!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

const update = request(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const tour = await Tour.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new Abort('NOT FOUND!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

const destory = request(async (req, res, next) => {
  const id = req.params.id;

  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    return next(new Abort('NOT FOUND!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const status = request(async (req, res, next) => {
  const tours = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

const monthlyPlan = request(async (req, res) => {
  const year = req.params.year * 1;
  const tours = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTours: -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

module.exports = {
  index,
  show,
  create,
  update,
  destory,
  status,
  monthlyPlan,
};
