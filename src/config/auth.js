const moment = require('moment');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    const isLoggedIn = req.user && moment(req.user.loggedIn).add(5, "minutes") >= moment();

    if (req.isAuthenticated() && isLoggedIn) {
      if (!req.originalUrl.includes("api")) {
        req.user.loggedIn = moment();
        return req.user.save().then(_ => {
          return next()
        }).catch(err => {
          console.log(err)
        })
      }
      return next();
    }
    const proto = req.protocol;
    const host = req.get('host');
    const uri = req.originalUrl;
    const location = `${proto}://${host}${uri}`;


    res.redirect('/users/signin?permission=true&redirect=' + encodeURI(location));
  },

  check_user(req, res, next) {
    if (req.user.role == "admin" || req.user.role == "manager") {
      next();
    } else {
      return res.json({
        message: 'Permission to view URL is missing'
      });
    };
  }
};