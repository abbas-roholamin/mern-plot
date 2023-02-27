const express = require('express');

const router = express.Router();

const tourController = require('./../controllers/tourController');
const { hasValidBody, topCheapTours } = require('../middlewares');

router.get('/top-5-cheap', topCheapTours, tourController.index);
router.get('/tours-status', tourController.status);
router.get('/monthly-plan/:year', tourController.monthlyPlan);
router.get('/', tourController.index);
router.post('/', hasValidBody, tourController.create);
router.get('/:id', tourController.show);
router.patch('/:id', tourController.update);
router.delete('/:id', tourController.destory);

module.exports = router;
