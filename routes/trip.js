'use strict';
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip.js');
const User = require('../models/User.js');
const axios = require('axios');

router.get('/', async (req, res, next) => {
  const { countryFrom, countryTo, dateFrom, dateTo, price, fly_duration } = req.query;
  // req.query

  try {
    // console.log('getting ingo', dateFrom, dateTo);
    const getFlightInfo = await axios.get(`https://api.skypicker.com/flights?flyFrom=${countryFrom}&to=${countryTo}&dateFrom=${dateFrom}&dateTo=${dateTo}&partner=picky&flightDuration=3h`);
    // console.log(getFlightInfo.data.data);
    // return flight information from search

    return res.render('trip');
  } catch (error) {
    next(error);
  }
});

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
      // render trip landing page
      res.render('trip', { tripUsers });
    });
});

// a post to update the trip with the information from the api get above

// a post to create a trip from city
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
