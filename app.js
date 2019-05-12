require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const User = require('./src/models/book.model');
const jwtStrategy = require('./config/passport-jwt.config');
const twitterStrategy = require('./config/passport-twitter.config');
const router = require('./src/routes/router');
const databaseConfig = require('./config/database.config');

mongoose.Promise = global.Promise;

const app = express();

// Connect to database
mongoose
  .connect(databaseConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });

// TBE: Define allowed origin domain
// const corsOptions = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET
    // cookie: {
    // secure: true
    // }
  })
);
passport.use(jwtStrategy);
passport.session();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(twitterStrategy);
// API v1 routes
app.use('/api/v1', router);

module.exports = app;
