const mongoose = require('mongoose');

const DistanceSchema = mongoose.Schema({
  locations: {
    type: [String],
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Distance', DistanceSchema);
