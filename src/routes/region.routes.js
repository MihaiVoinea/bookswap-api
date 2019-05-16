const router = require('express').Router();
const regionController = require('../controllers/region.controller');

// Retrieve a single Book
router.get('/:regionName', regionController.getLocations);

module.exports = router;
