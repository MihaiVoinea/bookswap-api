const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../src/models/user.model');

module.exports = new TwitterStrategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    userProfileURL:
      'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    callbackURL: 'http://localhost:8081/api/v1/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, cb) {
    console.log(profile);
    User.findOrCreate(profile, (err, user) => {
      return cb(err, user);
    });
  }
);
