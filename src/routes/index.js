const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  // console.log(JSON.stringify(req.user));
  res.render('dashboard', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    user: req.user
  });
});

router.get('/dashboard/region', ensureAuthenticated, function (req, res, next) {
  // console.log(JSON.stringify(req.user));
  res.render('region', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

router.get('/dashboard/marketprice', ensureAuthenticated, function (req, res, next) {
  // console.log(JSON.stringify(req.user));
  res.render('marketprice', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

module.exports = router;