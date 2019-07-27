'use strict';
const express = require('express');
const router = express.Router();
const Country = require('../models/Country.js');



 /* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const countryList = await Country.find();
    res.render('countryView/indexCountry', { countryList });
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) =>{
  try{
    const { id } = req.params;
    console.log(id)
    const countryDetail = await Country.findById(id);
    console.log(countryDetail);
    res.render('countryView/countryDetail', {countryDetail});
  }
  catch(eror){
    next(error);
  }
})
 module.exports = router;