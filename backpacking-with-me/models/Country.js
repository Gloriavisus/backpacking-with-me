'user strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const ObjectId = Schema.ObjectId;
const countrySchema = new Schema({
  name: {
    type: String
  },
  city: {
    type: String
  },
  description: {
    type: String
  },
  preferences: {
    type: ObjectId,
    ref: 'User'
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
