const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { getNameFromUsername, getFirstameFromUsername } = require('../helpers/user.helper');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  twitterId: {
    type: String
  },
  fullName: {
    type: String
  },
  displayName: {
    type: String
  }
});

// Apelat inainte de salvarea in baza de date.
UserSchema.pre('save', function preSaveHashPassword(next) {
  console.log('pre save');
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      // Inlocuieste parola cu hash-ul pentru a fi salvat in baza de date.
      this.password = hash;
      next();
    })
    .catch(err => {
      console.log(err);
      return err;
    });
});

// Arrow functions don't work here because of 'this'
// eslint-disable-next-line func-names
UserSchema.methods.verifyPassword = async function(comparePassword) {
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const result = await bcrypt.compare(comparePassword, this.password);
  return result;
};

UserSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this();
  this.findOne({ twitterId: profile.id }, (err, result) => {
    if (!result) {
      userObj.email = profile.emails[0].value;
      userObj.twitterId = profile.id;
      userObj.fullName = getNameFromUsername(profile.displayName);
      userObj.displayName = getFirstameFromUsername(profile.displayName);
      // ....
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
