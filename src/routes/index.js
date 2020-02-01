const express = require('express');
const router = express.Router();
const auth = require('../config/auth.js')
const moment = require('moment');
const User = require('../schemas/userschema.js');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});
router.get('/pricing', function (req, res, next) {
  res.render('pricing', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

router.get('/aboutus', function (req, res, next) {
  res.render('aboutus', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

router.get('/dashboard', auth.ensureAuthenticated, function (req, res, next) {
  res.render('dashboard', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: req.user
  });
});

router.get('/prosumerDashboard/:userId', auth.ensureAuthenticated, auth.check_user, async function (req, res, next) {
  const oneUser = await User.findById(req.params.userId);

  res.render('dashboard', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: oneUser
  });
});

router.get('/dashboard/powerplant', auth.ensureAuthenticated, function (req, res, next) {
  res.render('powerplant', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: req.user
  });
});

router.get('/dashboard/region', auth.ensureAuthenticated, function (req, res, next) {
  res.render('region', {
    title: 'Green Lean Electrics',
    activeUser: req.user,
    user: req.user
  });
});

router.get('/dashboard/marketprice', auth.ensureAuthenticated, function (req, res, next) {
  res.render('marketprice', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: req.user
  });
});

router.get('/dashboard/profile', auth.ensureAuthenticated, function (req, res, next) {
  res.render('profile', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: req.user
  });
});

router.get('/prosumerProfile/:userId', auth.ensureAuthenticated, auth.check_user, async function (req, res, next) {
  const oneUser = await User.findById(req.params.userId);

  res.render('profile', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: oneUser
  });
});

router.get('/dashboard/userStatus', auth.ensureAuthenticated, auth.check_user, async function (req, res, next) {
  const allUsers = await User.find();

  res.render('userStatus', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    activeUser: req.user,
    user: req.user,
    users: allUsers.map(user => {
      user.isLoggedIn = user && user.loggedIn && moment(user.loggedIn).add(5, "minutes") >= moment()
      return user;
    })
  });
});

module.exports = router;