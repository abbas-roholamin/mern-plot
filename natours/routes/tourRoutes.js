const express = require('express');
const router = express.Router();

const tourController = require('./../controllers/tourController');
const { hasValidBody } = require('../middlewares/checkValidBody');

router.param('id', tourController.isValidId);

router.get('/', tourController.index);
router.post('/', hasValidBody, tourController.create);
router.get('/:id', tourController.show);
router.patch('/:id', tourController.update);
router.delete('/:id', tourController.destory);

module.exports = router;
