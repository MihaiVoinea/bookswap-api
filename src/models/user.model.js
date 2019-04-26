const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  email: {
    type: String
    // required: true,
    // unique: true
  },
  password: {
    type: String
    // require: true
  }
});

// Apelat inainte de salvarea in baza de date.
UserSchema.pre('save', next => {
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      // Inlocuieste parola cu hash-ul pentru a fi salvat in baza de date.
      this.password = hash;
    })
    .catch(err => {
      return err;
    });

  next();
});

// Arrow functions don't work here because of 'this'
UserSchema.methods.verifyPassword = async function verifyPassword(password) {
  const user = this;
  // Hashes the password sent by the user for login and checks if the hashed password stored in the
  // database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

UserSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
  const userObj = new this();
  this.findOne({ _id: profile.id }, (err, result) => {
    if (!result) {
      userObj.username = profile.displayName;
      // ....
      userObj.save(cb);
    } else {
      cb(err, result);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
