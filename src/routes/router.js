const router = require('express').Router();
const passport = require('passport');

const bookRouter = require('./book.routes');
const userRoter = require('./user.routes');

router.use('/book', passport.authenticate('jwt', { session: false }), bookRouter);
router.use('/user', userRoter);

module.exports = router;
