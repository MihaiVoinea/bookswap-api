const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  coverUrl: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
