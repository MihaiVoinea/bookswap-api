const User = require('../models/user.model.js');

// Retrieve my user
exports.findMe = (req, res) => {
  User.findById(req.user.id)
    .then(doc => {
      const result = {
        id: doc.id,
        email: doc.email,
        twitterId: undefined || doc.twitterId,
        fullName: undefined || doc.fullName,
        displayName: undefined || doc.displayName
      };
      res.status(200).send(result);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err.message || 'Some error occured while retrieving your profile' });
    });
};
