const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const databaseConfig = require('../../config/database.config');

exports.register = (req, res) => {
  if (req.body.email && req.body.password) {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    user
      .save()
      .then(() => {
        res.send({ message: 'Succesfully created user' });
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred during registration'
        });
      });
  } else res.status(400).send('Email or password can not be empty');
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) res.status(401).send({ message: 'Wrong email or password' });

      if (user.verifyPassword(req.body.password)) {
        // eslint-disable-next-line no-underscore-dangle
        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, databaseConfig.secret);
        res.json({ token });
      } else {
        res.status(401).send({ message: 'Wrong email or password' });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Some error occured during login' });
    });
};
