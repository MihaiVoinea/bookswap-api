const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');
const { validateBody, schemas } = require('../helpers/route.helper');

// Register a new user account
router.post('/local/singup', validateBody(schemas.authSchema), authController.register);

// Login into the account
router.post('/local/signin', authController.login);

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  authController.handleTwitterAuth
);

router.get('/getjwt', authController.handleAuthReturnJwtFromId);

module.exports = router;
