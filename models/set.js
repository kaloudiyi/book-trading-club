const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const setSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  city: String,
  country: String
});

// Create model class
const ModelClass = mongoose.model('set', setSchema);

// Export the model
module.exports = ModelClass;
