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
  catch(error){
    next(error);
  }
})


router.post('/:id/favorite', async (req, res, next) =>{
  const userId = req.session.currentUser._id;
  const { id } = req.params;
  try{ 
    await Country.findByIdAndUpdate(id, {$push: {preferences: userId}})
    res.redirect('/countries')
  }
  catch(error){
    next(error);
  }
})

 module.exports = router;