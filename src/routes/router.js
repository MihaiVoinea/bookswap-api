const router = require('express').Router();
const passport = require('passport');

const bookRouter = require('./book.routes');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

router.use('/book', passport.authenticate('jwt', { session: false }), bookRouter);
router.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
router.use('/auth', authRouter);

module.exports = router;
