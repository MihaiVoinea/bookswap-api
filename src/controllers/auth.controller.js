const jwt = require('jsonwebtoken');
const url = require('url');
const User = require('../models/user.model');
const JwtToken = require('../models/jwtToken.model');

const signToken = user => {
  const token = jwt.sign(
    {
      iss: 'getbookswap.com',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    process.env.JWT_SECRET
  );
  return token;
};

exports.register = (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      fullName: req.body.fullName,
      region: req.body.region,
      location: req.body.location
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
      if (!user || !user.password) res.status(401).send({ message: 'Wrong email or password' });

      user.verifyPassword(req.body.password).then(result => {
        if (result === true) {
          // eslint-disable-next-line no-underscore-dangle

          res.json({ jwt: signToken(user) });
        } else {
          res.status(401).send({ message: 'Wrong email or password' });
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Some error occured during login' });
    });
};

exports.handleTwitterAuth = (req, res) => {
  // Successful authentication, redirect home.
  const token = new JwtToken({ jwt: signToken(req.user) });
  token
    .save()
    .then(doc => {
      res.redirect(
        url.format({
          pathname:
            process.env.NODE_ENV === 'production'
              ? 'https://bookswap.ro/auth/oauth-callback'
              : 'http://localhost:8080/auth/oauth-callback',
          query: {
            id: doc.id
          }
        })
      );
    })
    .catch(err => {
      console.log(err);
    });
};

exports.handleAuthReturnJwtFromId = (req, res) => {
  JwtToken.findByIdAndRemove(req.query.id).then(doc => {
    res.send(doc);
  });
};
