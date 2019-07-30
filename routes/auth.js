'use strict';
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');
const { isLoggedIn, isNotLoggedIn, isFormFilled } = require('../middlewares/authMiddlewares.js');

const saltRounds = 10;
const router = express.Router();

router.get('/signup', isLoggedIn, (req, res, next) => {
  res.render('signup');
});

router.post('/signup', isLoggedIn, isFormFilled, async (req, res, next) => {
  console.log('sign up here');
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.findOne({ username });
    if (user) {
      return res.redirect('/auth/signup');
    }
    const newUser = await User.create({
      username,
      password: hashedPassword,
      hobbies: [],
      description: ''
    });
    req.session.currentUser = newUser;
    return res.redirect('/countries');
  } catch (error) {
    next(error);
  }
});

router.get('/login', isLoggedIn, (req, res, next) => {
  res.render('login');
});
router.post('/login', isLoggedIn, isFormFilled, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login');
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/countries');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
});
router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  return res.redirect('/auth/login');
});
module.exports = router;
