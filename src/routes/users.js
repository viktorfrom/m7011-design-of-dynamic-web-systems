const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');

// Bring in User Model
let User = require('../schemas/userschema.js');

// Register Form
router.get('/signup', function (req, res, next) {

  res.render('signup', {
    title: 'Green Lean Electrics',
    body: null
  });
});

router.post('/signup', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('email').notEmpty(),
  check('username').notEmpty(),
  check('password').isLength({
    min: 5
  })
  // .matches(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
  // )

], (req, res) => {
  // console.log(req.body);

  const errors = validationResult(req);

  console.log(errors);
  if (!errors.isEmpty()) {
    // console.log(errors.errors);

    res.render('signup', {
      title: 'Green Lean Electrics',
      body: errors
    });
  } else {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });


    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log(err)
        return
      }
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function (err) {
          if (err) {
            console.log(err);
            return;
          } else {
            res.redirect('/users/signin?success=true');
          }
        });
      });
    });
  }
});


// Login Form
router.get('/signin', function (req, res, next) {
  // console.log(query);

  res.render('signin', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    body: null
  });
});

router.post('/signin', [
  check('username').notEmpty(),
  check('password').notEmpty()
], (req, res, next) => {
  // console.log(req.body);

  const errors = validationResult(req);

  // console.log(errors);

  if (!errors.isEmpty()) {
    // console.log(errors.errors);

    res.render('signin', {
      title: 'Green Lean Electrics',
      query: req.query ? req.query : null,
      body: errors
    });
  } else {
    passport.authenticate('local', {

      successRedirect: '/',
      failureRedirect: '/users/signin'
    })(req, res, next);

  }
});

module.exports = router;