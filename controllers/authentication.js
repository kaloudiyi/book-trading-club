const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.JWT_SECRET);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    console.log(email, password);
    if (err) {
      return next(err);
    }

    // if a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user with email doesn't exist create and save user record
    const user = new User({
      email: email,
      password: password
    }); // created in memory

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      // Respond to request
      res.json({ token: tokenForUser(user) });
    });
  });
};
