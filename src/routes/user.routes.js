const router = require('express').Router();
const userController = require('../controllers/user.controller');

// Retrieve my user
router.get('/', userController.findMe);

// Retrieve a single user
router.get('/:userId', userController.findOne);

// Update my user
router.put('/', userController.update);

// Delete my user
// router.delete('/:userId', userController.delete);

// Get the distance to an user
router.get('/distance/:userId', userController.getDistanceToUser);

module.exports = router;
