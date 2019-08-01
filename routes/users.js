'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const parser = require('../config/cloudinary');

/* GET users listing. */
router.get('/me', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId).populate('trips');
  console.log(user);

  res.render('me', user);
});
router.get('/me/edit', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId);
  res.render('editme', user);
});

router.post('/me/edit', parser.single('photo'), async (req, res, next) => {
  const { username, hobbies, description } = req.body;
  const id = req.session.currentUser._id;
  const image = req.file.secure_url;
  try {
    console.log('here we are tias');
    await User.findByIdAndUpdate(id, {
      username,
      hobbies,
      description,
      image: image
    });
    res.redirect('/users/me');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
