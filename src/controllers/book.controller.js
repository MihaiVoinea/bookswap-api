const Book = require('../models/book.model.js');

// Create a new Book
exports.create = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author
  });

  book
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Note.'
      });
    });
};

// Retrieve all Books
// exports.findAll = (req, res) => {};

// Retrieve a single Book
// exports.findOne = (req, res) => {};

// Update a specific Book
// exports.update = (req, res) => {};

// Delete a specific Book
// exports.delete = (req, res) => {};
