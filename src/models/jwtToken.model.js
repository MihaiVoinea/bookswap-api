const mongoose = require('mongoose');

const JwtTokenSchema = mongoose.Schema(
  {
    jwt: String
  },
  { timestamps: true }
);

JwtTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model('JwtToken', JwtTokenSchema);
