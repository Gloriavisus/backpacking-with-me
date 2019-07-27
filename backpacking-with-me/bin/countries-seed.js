'use strict';

const Country = require('../models/Country');

const mongoose = require('mongoose'); //

mongoose.connect('mongodb://localhost/backpackingwithme', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const countries = [
  {
    name: 'England',
    city: 'London',
    description: 'es muy guay tia'
  } // end of countries list
];


const addCountries = async () => {
  try {
    await Country.create(countries);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};
addCountries();

 
