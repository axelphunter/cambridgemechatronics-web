"use strict";

const UserModel = require('../models/userModel');

module.exports = {
  checkAuth(req, res, next) {
    if (req.session && req.session.authenticated && req.session.user) {
      const user = req.session.user;
      UserModel.findOneAndUpdate({
        emailaddress: user.emailaddress
      }, {
        lastupdate: new Date()
      }, null, (err, response) => {
        if (err) {
          req.flash('error', 'You must be logged in to access this page.');
          return res.redirect('/admin/login');
        }
      });
      return next();
    }

    UserModel.findOne({
      emailaddress: req.body.emailaddress
    }, (err, user) => {
      if (err) {
        req.flash('error', 'There was an error processing your request.');
        return res.redirect('/admin/login');
      }

      if (!user) {
        req.flash('error', 'Authentication failed. User not found.');
        return res.redirect('/admin/login');
      } else if (user) {
        // check if password matches
        user.comparePassword(req.body.password, (_err) => {
          if (_err) {
            req.flash('error', 'Username or password incorrect.');
            return res.redirect('/admin/login');
          }

          req.session.user = user;
          req.session.authenticated = true;

          req.flash('success', 'You have been logged in successfully');
          return res.redirect('/admin');
        });
      }
    });

    req.session.authenticated = null;
    req.session.user = null;

    req.flash('error', 'You must be logged in to access this page.');
    return res.redirect('/admin/login');
  }
};
