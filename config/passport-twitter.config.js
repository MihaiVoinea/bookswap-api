const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../src/models/user.model');

module.exports = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    userProfileURL:
      'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    callbackURL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.bookswap.ro/api/v1/auth/twitter/callback'
        : 'http://localhost:8081/api/v1/auth/twitter/callback'
  },
  (token, tokenSecret, profile, cb) => {
    User.findOrCreate(profile, (err, user) => {
      return cb(err, user);
    });
  }
);
