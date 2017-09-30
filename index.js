const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');

// DB setup
console.log('MONGOLAB_URI=' + keys.MONGO_LAB);
mongoose.connect(keys.MONGO_LAB);

const app = express();

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Deploy settings
// This settings is not finished because the deployment is not completley
// automated
if (process.env.NODE === '/app/.heroku/node/bin/node') {
  app.use(express.static('build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}
// ---

router(app);

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port);
console.log('Server listening on port', port);
