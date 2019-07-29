'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

/* GET users listing. */
router.get('/me', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId);
  res.render('me', user);
});

router.post('/me', async (req, res, next) => {
  const { hobbies, description } = req.body;
  const { id } = req.params;
  try{
    await User.findByIdAndUpdate(id, {
      hobbies, 
      description
    })
    res.redirect('/me')
  }
  catch(error){
    next(error);
  }
})

module.exports = router;
