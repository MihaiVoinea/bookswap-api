const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
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

/*
// TBE: Define allowed origin domain
const corsOptions = {
   origin: 'http://example.com',
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
*/

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// API v1 routes
app.use('/api/v1', router);

module.exports = app;
