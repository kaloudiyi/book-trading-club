const passport = require('passport');
const Authentication = require('./controllers/authentication');
const Settings = require('./controllers/settings');
const Request = require('./controllers/request');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.post('/api/signin', requireSignin, Authentication.signin);
  app.post('/api/signup', Authentication.signup);
  app.post('/api/set_settings', Settings.setSettings);
  app.post('/api/get_settings', requireAuth, Settings.getSettings);
  app.post('/api/add_request', Request.addRequest);
  app.post('/api/remove_request', requireAuth, Request.removeRequest);
  app.post('/api/update_request', requireAuth, Request.updateRequest);
  app.post('/api/load_requests', requireAuth, Request.loadRequests);
};
