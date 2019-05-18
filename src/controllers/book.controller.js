const axios = require('axios');
const convert = require('xml-js');
const Book = require('../models/book.model.js');

// Create a new Book
exports.create = (req, res) => {
  if (req.body.title && req.body.author) {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: undefined || req.body.description,
      coverUrl: req.body.coverUrl,
      addedBy: req.user.id
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

// eslint-disable-next-line consistent-return
exports.query = (req, res, next) => {
  if (!req.query.q) return next();
  axios
    .get(`https://www.goodreads.com/search/index?key=${process.env.GOODREADS_KEY}&q=${req.query.q}`)
    .then(result => {
      // We get the XML response from Goodreads and return it converted as JSON
      // TO-DO: Comment & break this function into smaller pieces.
      let convertedResponse = convert.xml2js(result.data, { compact: true }).GoodreadsResponse
        .search.results.work;
      if (convertedResponse === undefined) res.status(404).json({ message: 'Not found' });
      else if (convertedResponse.length === 1 || convertedResponse.length === undefined) {
        convertedResponse = convertedResponse.best_book;
        const coverUrl =
          // eslint-disable-next-line no-underscore-dangle
          convertedResponse.image_url._text ===
          'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
            ? undefined
            : // eslint-disable-next-line no-underscore-dangle
              convertedResponse.image_url._text;

        res.json([
          {
            // eslint-disable-next-line no-underscore-dangle
            title: convertedResponse.title._text,
            // eslint-disable-next-line no-underscore-dangle
            author: convertedResponse.author.name._text,
            coverUrl
          }
        ]);
      } else if (convertedResponse.length >= 2) {
        convertedResponse = convertedResponse.map(book => book.best_book);
        const json = [];
        convertedResponse.forEach(book => {
          // If the book cover image is the default placeholder from Goodreads don't return a coverUrl
          const coverUrl =
            // eslint-disable-next-line no-underscore-dangle
            book.image_url._text ===
            'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
              ? undefined
              : // eslint-disable-next-line no-underscore-dangle
                book.image_url._text;
          json.push({
            // eslint-disable-next-line no-underscore-dangle
            title: book.title._text,
            // eslint-disable-next-line no-underscore-dangle
            author: book.author.name._text,
            coverUrl
          });
        });
        res.json(json);
      } else res.status(500).json({ message: 'An error occured' });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'An error occured' });
    });
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

exports.findMyBooks = (req, res) => {
  Book.find({ addedBy: req.user.id })
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
