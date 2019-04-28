const Book = require('../models/book.model.js');

// Create a new Book
exports.create = (req, res) => {
  if (req.body.title && req.body.author) {
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
          message: err.message || 'Some error occurred while creating the book'
        });
      });
  } else res.status(400).send({ message: 'Book content can not be empty' });
};

exports.query = (req, res, next) => {
  if (!req.query.q) return next();
  return res.json(req.query.q);
};

// Retrieve all Books
exports.findAll = (req, res) => {
  Book.find()
    .then(books => {
      res.send(books);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Some error occured while retrieving books' });
    });
};

// Retrieve a single Book
exports.findOne = (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      if (!book) res.status(404).send({ message: 'Not found' });
      else res.send(book);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') res.status(404).send({ message: 'Not found' });
      else res.status(500).send({ message: 'Some error occured while retrieving the book' });
    });
};

// Update a specific Book
exports.update = (req, res) => {
  if (req.body.title && req.body.author) {
    Book.findByIdAndUpdate(
      req.params.bookId,
      { title: req.body.title, author: req.body.author },
      { new: true }
    )
      .then(book => {
        if (!book) res.status(404).send({ message: 'Not found' });
        else res.send(book);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') res.status(404).send({ message: 'Not found' });
        else res.status(500).send({ message: 'Some error occured while updating the book' });
      });
  } else res.status(400).send({ message: 'Book content can not be empty' });
};

// Delete a specific Book
exports.delete = (req, res) => {
  Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
      if (!book) res.status(404).send({ message: 'Not found' });
      else res.send(book);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') res.status(404).send({ message: 'Not found' });
      else res.status(500).send({ message: 'Some error occured while deleting the book' });
    });
};
