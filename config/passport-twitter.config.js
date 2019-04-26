const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../src/models/user.model');

module.exports = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:8080/api/v1/user/twitter/callback'
  },
  // eslint-disable-next-line func-names
  function(token, tokenSecret, profile, cb) {
    // eslint-disable-next-line func-names
    User.findOrCreate({ twitterId: profile.id }, function(err, user) {
      return cb(err, user);
    });
  }
);
