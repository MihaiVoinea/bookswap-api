const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Retrieve my user
router.get('/', userController.findMe);

// // Retrieve a single user
// router.get('/:bookId', userController.findOne);

// // Update my user
// router.put('/:bookId', userController.update);

// // Delete my user
// router.delete('/:BookId', userController.delete);

module.exports = router;
