const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  name: String,
  zip: String,
  lat: String,
  long: String
});

const RegionSchema = mongoose.Schema({
  name: String,
  locations: [LocationSchema]
});

module.exports = mongoose.model('Region', RegionSchema);
