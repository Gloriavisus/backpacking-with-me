'user strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tripSchema = new Schema({
  countryFrom: {
    type: String
  },
  countryTo: {
    type: String
  },
  date_from: {
    type: Number
  },
  date_to: {
    type: Number
  },
  price: {
    type: Number
  },
  conversion: {
    type: String
  },
  fly_duration: {
    type: String
  }
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
