const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

// Bring in User Model
let User = require('../schemas/userschema.js');

// Register Form
router.get('/signup', function (req, res, next) {

  res.render('signup', {
    title: 'Green Lean Electrics'
  });
});

// Register
router.post('/signup', (req, res) => {
  const {
    name,
    email,
    password,
    password2,
    region,
    username
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !region || !username) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }

  if (password != password2) {
    errors.push({
      msg: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Password must be at least 6 characters'
    });
  }

  if (errors.length > 0) {
    res.render('signup', {
      title: 'Green Lean Electrics',
      errors,
      name,
      email,
      password,
      password2,
      region,
      username
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Email already exists'
        });
        res.render('signup', {
          title: 'Green Lean Electrics',
          errors,
          name,
          email,
          password,
          password2,
          region,
          username
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          region,
          username
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect('/users/signin?success=true');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login Form
router.get('/signin', function (req, res, next) {
  // console.log(query);

  res.render('signin', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null
    // body: null
  });
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/signin?failure=true'
  })(req, res, next);
});

router.get('/signout', (req, res) => {
  req.logout();
  // req.flash('success_msg', 'You are logged out');
  res.redirect('/users/signin');
});


module.exports = router;