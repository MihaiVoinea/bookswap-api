const router = require('express').Router();
const bookRouter = require('./book.routes');

router.use('/book', bookRouter);

module.exports = router;
