const router = require('express').Router();
const passport = require('passport');

const bookRouter = require('./book.routes');
const userRoter = require('./user.routes');

const authStrategies = ['jwt', 'twitter'];

router.use('/book', passport.authenticate(authStrategies, { session: false }), bookRouter);
router.use('/user', userRoter);

module.exports = router;
