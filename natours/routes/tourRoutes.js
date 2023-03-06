const express = require('express');

const router = express.Router();

const TourController = require('../controllers/TourController');
const { HasValidBody, TopCheapTours } = require('../middlewares');

router.get('/top-5-cheap', TopCheapTours, TourController.index);
router.get('/tours-status', TourController.status);
router.get('/monthly-plan/:year', TourController.monthlyPlan);
router.get('/', TourController.index);
router.post('/', HasValidBody, TourController.create);
router.get('/:id', TourController.show);
router.patch('/:id', TourController.update);
router.delete('/:id', TourController.destory);

module.exports = router;
