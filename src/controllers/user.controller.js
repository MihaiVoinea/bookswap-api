const axios = require('axios');
const User = require('../models/user.model.js');
const Distance = require('../models/distance.model');

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
        location: undefined || doc.location,
        photoUrl:
          doc.pictureUrl || `https://ui-avatars.com/api/?name=${doc.fullName || doc.displayName}`
      };
      res.status(200).send(result);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: err.message || 'Some error occured while retrieving your profile' });
    });
};

// GET a user based on id
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(doc => {
      const result = {
        id: doc.id,
        email: doc.email,
        fullName: undefined || doc.fullName,
        displayName: undefined || doc.displayName,
        region: undefined || doc.region,
        location: undefined || doc.location,
        photoUrl:
          doc.pictureUrl || `https://ui-avatars.com/api/?name=${doc.fullName || doc.displayName}`
      };
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving this user's profile"
      });
    });
};

exports.update = (req, res) => {
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

exports.getDistanceToUser = (req, res) => {
  User.findById(req.params.userId)
    .then(doc => {
      // If we can't find a user with that ID
      if (!doc) res.json({ message: 'Not found' });

      // If users are in the same city, distance is 0
      if (doc.region === req.user.region && doc.location === req.user.location)
        res.json({ distance: 0 });
      // Search our cache first, if we don't have it cached, call the MapQuest API
      Distance.find({ locations: [`${req.user.location},Romania`, `${doc.location},Romania`] })
        .then(distance => {
          if (distance.length === 0) {
            axios({
              method: 'post',
              url: `http://www.mapquestapi.com/directions/v2/routematrix?key=${
                process.env.MAPQUEST_API_KEY
              }`,
              data: {
                locations: [`${req.user.location},Romania`, `${doc.location},Romania`]
              }
            })
              .then(response => {
                const newDistance = new Distance({
                  locations: [`${req.user.location},Romania`, `${doc.location},Romania`],
                  distance: response.data.distance[1] * 1.609344
                });
                // Save the distance we got from the API
                newDistance.save();
                // Send the distance to the user
                res.json({
                  locations: [`${req.user.location},Romania`, `${doc.location},Romania`],
                  distance: response.data.distance[1] * 1.609344
                });
              })
              .catch(error => {
                res.json({ message: 'An error occured' });
                console.log(error);
              });
          } else {
            // Send distance from DB, don't call API.
            res.json(distance[0]);
          }
        })
        .catch(error => {
          res.json({ message: 'An error occured' });
          console.log(error);
        });
    })
    .catch(error => {
      res.json({ message: 'An error occured' });
      console.log(error);
    });
};
