'use strict';
const express = require('express');
const router = express.Router();
// const User = require('../models/User.js');
const axios = require('axios');

router.get('/', async (req, res, next) => {
  res.render('trip');
});

router.post('/', async (req, res, next) => {
  const getTrip = await axios.get('https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2018&dateTo=12/12/2018&partner=picky');
  console.log(getTrip);
});
module.exports = router;
