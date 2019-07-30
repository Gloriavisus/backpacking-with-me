'use strict';
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip.js');
const User = require('../models/User.js');
const axios = require('axios');

router.get('trip/:id', async (req, res, next) => {
  const { id } = req.params;
  User.find({}).populate('trips')
    .then(users => {
      const tripUsers = [];
      users.forEach((user) => {
        user.trips.forEach((trip) => {
          if (trip._id.toString() === id) { tripUsers.push(user); };
        });
      });
      console.log(tripUsers);
      res.render('trip', { tripUsers });
    });
});

router.get('/info', async (req, res, next) => {
  let { countryFrom, countryTo, dateFrom, dateTo, price, fly_duration } = req.body;
  countryFrom = 'PRG';
  countryTo = 'LGW';
  dateFrom = '18/11/2019';
  dateTo = '21/12/2019';
  price = 1100;
  fly_duration = '3h';
  try {
    console.log('getting ingo', dateFrom, dateTo);
    const getFlightInfo = await axios.get(`https://api.skypicker.com/flights?flyFrom=${countryFrom}&to=${countryTo}&dateFrom=${dateFrom}&dateTo=${dateTo}&partner=picky&flightDuration=3h`);
    console.log(getFlightInfo.data.data);

    res.render('/trip');
  } catch (error) {
    next(error);
  }
});

router.post('/:id/:country', async (req, res, next) => {
  const { id, country } = req.params;
  const myUserId = req.session.currentUser._id;

  const newTrip = new Trip({
    countryTo: country
  });
  const saveTrip = newTrip.save();
  const updateOtherUser = User.findByIdAndUpdate(id, { $push: { trips: newTrip._id } });
  const updateMyUser = User.findByIdAndUpdate(myUserId, { $push: { trips: newTrip._id } });
  Promise.all([updateMyUser, updateOtherUser, saveTrip])
    .then((data) => console.log(data))
    .catch((error) => { next(error); });
});
module.exports = router;
