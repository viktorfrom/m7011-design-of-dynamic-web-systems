const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Green Lean Electrics' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Green Lean Electrics' });
});

module.exports = router;
