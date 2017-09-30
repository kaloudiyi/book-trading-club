const Set = require('../models/set');

exports.setSettings = function(req, res, next) {
  const email = req.body.email;
  const city = req.body.city;
  const country = req.body.country;

  if (!email || !city || !country) {
    return res
      .status(422)
      .send({ error: 'You must provide email and city and country' });
  }

  // See if a Set with the given email exists
  Set.findOne({ email: email }, function(err, existingSet) {
    if (err) {
      return next(err);
    }

    // if a Set doesn't exist, create it
    if (!existingSet) {
      // if a set doesn't exist create and save set record
      existingSet = new Set({ email: email }); // created in memory
    }

    // update existing set
    existingSet.city = city;
    existingSet.country = country;
    existingSet.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond to request
      res.send(existingSet);
    });
  });
};

exports.getSettings = function(req, res, next) {
  process.on('uncaughtException', err => {
    console.error(err);
  });

  const email = req.body.email;

  if (!email) {
    return res.status(422).send({ error: 'You must provide email' });
  }

  // See if a Set with the given email exists
  Set.findOne({ email: email }, function(err, existingSet) {
    if (err) {
      return next(err);
    }

    if (existingSet == null) {
      res.send({ city: '', country: '' });
    }
    city = existingSet.city;
    country = existingSet.country;
    res.send({ city: city, country: country });
  });
};
