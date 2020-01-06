const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');
const fetch = require('node-fetch');



// const House = require('./api/houseapi.js');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Green Lean Electrics',
    user: req.user
  });
});

router.get('/dashboard', ensureAuthenticated, function (req, res, next) {
  let test = getHouse(); 
  // console.log("test " + test.owner);

  res.render('dashboard', {
    title: 'Green Lean Electrics',
    house: req.test,
    user: req.user
  });
});


function getHouse() {
  fetch('http://127.0.0.1:3000/api/house/viktor@test.com')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err));

}

module.exports = router;