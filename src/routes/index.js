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
  res.render('dashboard', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

module.exports = router;