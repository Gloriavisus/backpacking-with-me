'use strict';
const express = require('express');
const router = express.Router();
const Country = require('../models/Country.js');



/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const countryList = await Country.find();
    res.render('index', { countryList });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
