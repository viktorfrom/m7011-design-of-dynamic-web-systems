const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');

// Bring in User Model
let User = require('../schemas/userschema.js');

// Register Form
router.get('/signup', function (req, res, next) {
    res.render('signup', {
        title: 'Green Lean Electrics'
    });
});



router.post('/signup', [
  // username must be an email
  check('name').notEmpty(),
  check('email').isEmail(),
  check('email').notEmpty(),
  check('username').notEmpty(),
  check('password').isLength({ min: 5 })
], (req, res) => {
    console.log(req.body);
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.redirect('/users/signup');
  } else {
    User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).then(user => res.json(user));
  }




});


// Login Form
router.get('/signin', function (req, res, next) {
    res.render('signin', {
        title: 'Green Lean Electrics'
    });
});;

module.exports = router;