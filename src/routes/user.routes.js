const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user.controller');
const { validateBody, schemas } = require('../helpers/route.helper');

// Register a new user account
router.post('/register', validateBody(schemas.authSchema), userController.register);

// Login into the account
router.post('/login', userController.login);

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.json(req.user);
  }
);

module.exports = router;
