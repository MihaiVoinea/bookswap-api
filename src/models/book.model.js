const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.Model('Book', BookSchema);
