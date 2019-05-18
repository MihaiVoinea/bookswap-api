const Region = require('../models/region.model');

// GET - toate localitățile dintr-un județ
exports.getLocations = (req, res) => {
  Region.findOne({ name: req.params.regionName.toUpperCase() })
    .then(region => {
      if (!region) {
        res.json({ message: 'Alege' });
      }

      // Răspuns-ul este un array cu fiecare localitate din județul respectiv.
      res.json(region.locations.map(location => location.name));
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'A aparut o eroare' });
    });
};

exports.getRegions = (req, res) => {
  Region.find()
    .then(doc => {
      res.json(doc.map(region => region.name));
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'A aparut o eroare' });
    });
};
