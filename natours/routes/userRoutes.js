const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/', UserController.index);
router.post('/', UserController.create);
router.get('/:id', UserController.show);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destory);

module.exports = router;
