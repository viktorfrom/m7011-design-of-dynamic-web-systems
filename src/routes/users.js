const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
let User = require('../schemas/userschema.js');

router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Green Lean Electrics'
  });
});

router.post('/signup', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    region
  } = req.body;
  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2 || !region) {
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
      firstName,
      lastName,
      email,
      password,
      password2,
      region
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
          firstName,
          lastName,
          email,
          password,
          password2,
          region
        });
      } else {
        const newUser = new User({
          timestamp: Date.now(),
          firstName,
          lastName,
          email,
          role: "prosumer",
          password,
          region,
          image: "../images/defaultHouse.png"
        });
        console.log(newUser);

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

router.get('/signin', function (req, res, next) {
  const path = '/users/signin';
  const redirect = req.query.redirect ? req.query.redirect : null;

  res.render('signin', {
    title: 'Green Lean Electrics',
    query: req.query ? req.query : null,
    action: redirect ? `${path}?redirect=${redirect}` : path
  });
});

router.post('/signin', (req, res, next) => {
  try {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user.role == "admin" || user.role == "manager") {
        passport.authenticate('local', {
          successRedirect: req.query.redirect ? req.query.redirect : '/dashboard',
          failureRedirect: '/users/signin?failure=true'
        })(req, res, next);
      } else {
        passport.authenticate('local', {
          successRedirect: req.query.redirect ? req.query.redirect : '/dashboard',
          failureRedirect: '/users/signin?failure=true'
        })(req, res, next);
      }
    }).catch(err => {
      res.redirect('/users/signin?failure=true');
    });
  } catch (err) {
    res.redirect('/users/signin?failure=true');
  }
});

router.get('/signout', (req, res) => {
  req.logout();
  res.redirect('/users/signin');
});


module.exports = router;