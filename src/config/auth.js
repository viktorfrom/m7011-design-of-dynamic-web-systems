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
    if (req.user != 'admin') {
    // if (false) {
      return res.json({
        message: 'Permission to view URL is missing'
      });
    }
    next();
  }
};