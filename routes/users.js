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
router.get('/me/edit', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const user = await User.findById(userId);
  res.render('editme', user);
});

router.post('/me/edit', async (req, res, next) => {
  const { username, hobbies, description } = req.body;
  const id = req.session.currentUser._id;
  try {
    console.log('here we are tias');
    await User.findByIdAndUpdate(id, {
      username,
      hobbies,
      description
    });
    res.redirect('/users/me');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
