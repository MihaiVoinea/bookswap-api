const router = require('express').Router();
const passport = require('passport');
const jwtStrategy = require('../../config/passport-jwt.config');

const bookRouter = require('./book.routes');
const userRoter = require('./user.routes');

passport.use(jwtStrategy);

router.use('/book', passport.authenticate('jwt', { session: false }), bookRouter);
router.use('/user', userRoter);

module.exports = router;
