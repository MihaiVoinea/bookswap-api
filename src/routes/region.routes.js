const router = require('express').Router();
const regionController = require('../controllers/region.controller');

// Returneaza toate judetele
router.get('/', regionController.getRegions);

// Returneaza toate localitatile dintr-un judet
router.get('/:regionName', regionController.getLocations);

module.exports = router;
