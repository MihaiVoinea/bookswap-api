const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../src/models/user.model');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = new JwtStrategy(opts, (jwtPayload, done) => {
  User.findOne({ id: jwtPayload.id })
    .then(user => {
      if (!user) return done(null, false);
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});
