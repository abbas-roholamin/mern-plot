const { json } = require('body-parser');
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const dataPath = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(dataPath));

// Get All Tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: {
      tours,
    },
  });
});

// Add New Tour
app.post('/api/v1/tours', (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body };
  tours.push(newTour);
  fs.writeFile(dataPath, JSON.stringify(tours, null, 2), (err) => {
    res
      .status(201)
      .json({ status: 'success', length: tours.length, data: newTour });
  });
});

// Get Tour
app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find((t) => t.id === Number(id));

  if (!tour) {
    res.status(404).json({ status: 'NOT FOUND' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
});

// Update Tour
app.patch('/api/v1/tours/:id', (req, res) => {
  if (Number(req.params.id) > tours.length) {
    res.status(404).json({ status: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour: 'PATCH' } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
