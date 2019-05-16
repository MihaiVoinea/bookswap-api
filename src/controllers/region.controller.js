const Region = require('../models/region.model');

// GET - toate localitățile dintr-un județ
exports.getLocations = (req, res) => {
  Region.findOne({ name: req.params.regionName.toUpperCase() })
    .then(region => {
      if (!region) {
        res.json({ message: 'Nu s-a putut gasi judetul' });
      }

      // Răspuns-ul este un array cu fiecare localitate din județul respectiv.
      res.json(region.locations.map(location => location.name));
    })
    .catch(error => console.log(error));
};
