const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../src/models/user.model');

module.exports = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    userProfileURL:
      'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    callbackURL: 'http://localhost:8080/api/v1/user/twitter/callback'
  },
  // eslint-disable-next-line func-names
  function(token, tokenSecret, profile, cb) {
    console.log(profile);
    // eslint-disable-next-line func-names
    User.findOrCreate(profile, (err, user) => {
      return cb(err, user);
    });
  }
);
