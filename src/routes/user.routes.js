const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Register a new user account
router.post('/register', userController.register);

// Login into the account
router.post('/login', userController.login);

module.exports = router;
