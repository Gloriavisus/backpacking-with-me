'use strict';
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip.js');
const User = require('../models/User.js');
const axios = require('axios');

router.get('/', async (req, res, next) => {

});

router.post('/:id/getFlights', async (req, res, next) => {
  const { countryFrom, countryTo, dateFrom, dateTo } = req.body;
  const { id } = req.params;
  console.log('arrive')
  try {
    // console.log('getting ingo', dateFrom, dateTo);
    const getFlightInfo = await axios.get(`https://api.skypicker.com/flights?flyFrom=${countryFrom}&to=${countryTo}&dateFrom=${dateFrom}&dateTo=${dateTo}&partner=picky&one_for_city=1`);

    // return flight information from search
    console.log(getFlightInfo)
    // 1) console log what get getFlightInfo.data.data[0];
    // 2) choose the fields you want from this and put them inside the const {cityFrom}

    const { cityFrom, cityTo, price, fly_duration } = getFlightInfo.data.data[0];
    // 3) put these fields inside the render method below cityFrom
    return res.render('trip', {
      cityFrom,
      cityTo,
      price,
      fly_duration,
      id
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  User.find({}).populate('trips')
    .then(users => {
      const tripUsers = [];
      users.forEach((user) => {
        user.trips.forEach((trip) => {
          if (trip._id.toString() === id) { tripUsers.push(user); };
        });
      });
      Trip.findById(id)
        .then((trip) => {
          res.render('trip', { tripUsers, id: id.toString(), trip });
        });
    });
});

// a post to update the trip with the information from the api get above
router.post('/:tripId/save', async (req, res, next) => {
  const { tripId } = req.params;
  const { cityFrom, cityTo, price, flyDuration } = req.body;

  Trip.findByIdAndUpdate(tripId, { countryFrom: cityFrom, countryTo: cityTo, price, fly_duration: flyDuration }, { new: true })
    .then((data) => { res.redirect(`/trip/${tripId}`); })
    .catch((error) => { console.log(error); });
});
// a post to create a trip from city
router.post('/:id/:code', async (req, res, next) => {
  // maybe id is the id of the other user and not the trip
  const { id, code } = req.params;
  const myUserId = req.session.currentUser._id;

  const newTrip = new Trip({
    countryTo: code
  });
  const saveTrip = newTrip.save();
  const updateOtherUser = User.findByIdAndUpdate(id, { $push: { trips: newTrip._id } }, { new: true });
  const updateMyUser = User.findByIdAndUpdate(myUserId, { $push: { trips: newTrip._id } }, { new: true });
  Promise.all([updateMyUser, updateOtherUser, saveTrip])
    .then((data) => res.redirect(`/trip/${data[2]._id}`))
    .catch((error) => { next(error); });
});
module.exports = router;
