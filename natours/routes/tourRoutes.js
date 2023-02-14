const express = require('express');
const router = express.Router();

const tourController = require('./../controllers/tourController');

router.get('/', tourController.index);
router.post('/', tourController.create);
router.get('/:id', tourController.show);
router.patch('/:id', tourController.update);
router.delete('/:id', tourController.destory);

module.exports = router;
