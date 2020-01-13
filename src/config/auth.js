module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
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