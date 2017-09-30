const Request = require('../models/request');

exports.addRequest = function(req, res, next) {
  const { email, url, title } = req.body;

  if (!email || !url || !title) {
    return res
      .status(422)
      .send({ error: 'You must provide email and url and title' });
  }

  // See if a Request with the given email and url exist
  Request.findOne({ email, url }, function(err, existingRequest) {
    if (err) {
      return next(err);
    }

    if (existingRequest) {
      return res.status(422).send({ error: 'You already have this request' });
    }

    request = new Request({ email, url, title, requester: '' });
    request.save(function(err) {
      if (err) {
        return next(err);
      }
    });
    // Respond to request
    res.send('Added');
  });
};

exports.removeRequest = function(req, res, next) {
  const email = req.body.email;
  const url = req.body.url;

  if (!email || !url) {
    return res.status(422).send({ error: 'You must provide email and url' });
  }

  // See if a Request with the given email and url exists
  Request.findOne({ email, url }, function(err, existingRequest) {
    if (err) {
      return next(err);
    }

    if (!existingRequest) {
      return res.status(422).send({ error: 'Email and URL not found' });
    }
    existingRequest.remove();
    res.send('Removed');
  });
};

exports.updateRequest = function(req, res, next) {
  const email = req.body.email;
  const url = req.body.url;
  const requester = req.body.requester;

  if (!email || !url) {
    return res.status(422).send({ error: 'You must provide email and url' });
  }

  // See if a Request with the given email and url exists
  Request.findOne({ email, url }, function(err, existingRequest) {
    if (err) {
      return next(err);
    }

    if (!existingRequest) {
      return res.status(422).send({ error: 'Email and URL not found' });
    }

    existingRequest.requester = requester;
    existingRequest.save();
    res.send(existingRequest);
  });
};

exports.loadRequests = function(req, res, next) {
  Request.find(
    {},
    { email: 1, url: 1, title: 1, requester: 1, _id: 0 },
    function(err, docs) {
      if (err) {
        return next(err);
      }
      res.send(docs);
    }
  );
};
