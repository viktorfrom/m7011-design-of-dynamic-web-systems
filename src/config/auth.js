module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    //   req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/signin');
  },
  // forwardAuthenticated: function(req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/dashboard');      
  // }

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