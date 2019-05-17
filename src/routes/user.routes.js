const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Retrieve my user
router.get('/', userController.findMe);

// Retrieve a single user
// router.get('/:userId', userController.findOne);

// Update my user
router.put('/', userController.update);

// Delete my user
// router.delete('/:userId', userController.delete);

module.exports = router;
