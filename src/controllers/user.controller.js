const User = require('../models/user.model.js');

// Retrieve my user
exports.findMe = (req, res) => {
  console.log(req);
  User.findById(req.user.id)
    .then(doc => {
      res.status(200).send(doc);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err.message || 'Some error occured while retrieving your profile' });
    });
};
