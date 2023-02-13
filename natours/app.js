const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

const dataPath = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(dataPath));

// Resolvers
const getALlTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body };
  tours.push(newTour);
  fs.writeFile(dataPath, JSON.stringify(tours, null, 2), (err) => {
    res
      .status(201)
      .json({ status: 'success', length: tours.length, data: newTour });
  });
};

const getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((t) => t.id === Number(id));

  if (!tour) {
    res.status(404).json({ status: 'NOT FOUND' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

const updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    res.status(404).json({ status: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: 'PATCH' } });
};

const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length) {
    res.status(404).json({ status: 'Invalid ID' });
  }

  res.status(204).json({ status: 'success', data: null });
};

// Get All Tours
app.get('/api/v1/tours', getALlTours);

// Add New Tour
app.post('/api/v1/tours', createTour);

// Get Tour
app.get('/api/v1/tours/:id', getTour);

// Update Tour
app.patch('/api/v1/tours/:id', updateTour);

// Delete Tour
app.delete('/api/v1/tours/:id', deleteTour);

// Listening on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
