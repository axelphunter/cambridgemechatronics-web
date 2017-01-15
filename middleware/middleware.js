"use strict";

const UserModel = require('../models/userModel');

module.exports = {
  checkAuth(req, res, next) {
    if (req.session && req.session.authenticated && req.session.user) {
      if (req.session.user.passwordReset && req.originalUrl !== '/admin/password-reset') {
        return res.redirect('/admin/password-reset');
      }
      const user = req.session.user;
      UserModel.findOneAndUpdate({
        emailaddress: user.emailaddress
      }, {
        lastupdate: new Date()
      }, null, (err) => {
        if (err) {
          req.flash('error', 'You must be logged in to access this page.');
          return res.redirect('/admin/login');
        }
      });
      return next();
    }

    req.session.authenticated = null;
    req.session.user = null;

    req.flash('error', 'You must be logged in to access this page.');
    return res.redirect('/admin/login');
  }
};
