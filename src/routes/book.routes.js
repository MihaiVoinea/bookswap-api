const router = require('express').Router();
const bookController = require('../controllers/book.controller');

// Create
router.post('/', bookController.create);

// Retrieve all Books
router.get('/', bookController.query, bookController.findAll);

// Retrieve all books added by me
router.get('/me', bookController.findMyBooks);

// Retrieve a single Book
router.get('/:bookId', bookController.findOne);

// Update
router.put('/:bookId', bookController.update);

// Delete
router.delete('/:BookId', bookController.delete);

module.exports = router;
