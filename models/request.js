const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const requestSchema = new Schema({
  email: String,
  url: String,
  title: String,
  requester: String
});

// Create model class
const ModelClass = mongoose.model('request', requestSchema);

// Export the model
module.exports = ModelClass;
