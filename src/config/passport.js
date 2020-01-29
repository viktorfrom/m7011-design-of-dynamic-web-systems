const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../schemas/userschema.js');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false);
        };

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            throw err;
          };
          if (isMatch) {
            user.loggedIn = Date.now();
            return user.save().then(_ => {
              return done(null, user);
            }).catch(err => {
              console.log(err)
            })
          } else {
            return done(null, false);
          };
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};