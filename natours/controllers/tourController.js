const fs = require('fs');

const dataPath = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(dataPath));

const index = (req, res) => {
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
};

const create = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body };
  tours.push(newTour);
  fs.writeFile(dataPath, JSON.stringify(tours, null, 2), (err) => {
    res
      .status(201)
      .json({ status: 'success', length: tours.length, data: newTour });
  });
};

const show = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((t) => t.id === Number(id));

  if (!tour) {
    res.status(404).json({ status: 'NOT FOUND' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

const update = (req, res) => {
  res.status(200).json({ status: 'success', data: { tour: 'PATCH' } });
};

const destory = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};

const isValidId = function (_, res, next, val) {
  if (Number(val) > tours.length) {
    res.status(404).json({ status: 'Invalid ID' });
  }
  next();
};

module.exports = {
  index,
  show,
  create,
  update,
  destory,
  isValidId,
};
