const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { validateBody, schemas } = require('../helpers/route.helper');

// Register a new user account
router.post('/register', validateBody(schemas.authSchema), userController.register);

// Login into the account
router.post('/login', userController.login);

module.exports = router;
