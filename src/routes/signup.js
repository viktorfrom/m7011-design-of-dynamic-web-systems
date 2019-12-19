const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Green Lean Electrics' });
});

module.exports = router;
