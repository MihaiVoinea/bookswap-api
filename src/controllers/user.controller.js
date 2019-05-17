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
        displayName: undefined || doc.displayName,
        region: undefined || doc.region,
        location: undefined || doc.location
      };
      res.status(200).send(result);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err.message || 'Some error occured while retrieving your profile' });
    });
};

exports.update = (req, res) => {
  console.log(req.user);
  console.log(req.body);
  User.findByIdAndUpdate(
    req.user.id,
    {
      fullName: req.body.fullName || req.user.fullName,
      displayName: req.body.displayName || req.user.displayName,
      region: req.body.region || req.user.region,
      location: req.body.location || req.user.location
    },
    { new: true }
  )
    .then(user => {
      if (!user) res.status(404).send({ message: 'Not found' });
      else res.send(user);
    })
    .catch(error => {
      res.json({ message: 'An error occured' });
      console.log(error);
    });
};
