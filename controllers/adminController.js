'use strict';

const config = require('config');
const prismicConfig = require('../configuration/prismic');
const prismic = require('prismic.io');
const UserModel = require('../models/userModel');

// */ controllers
module.exports = {
  getLogin(req, res) {
    return res.render('admin/login', {
      pageName: 'Login',
      metaData: config.metaData
    });
  },

  postLogin(req, res) {
    if (!req.body.emailaddress || !req.body.password) {
      console.log('no email or password');
      // req.flash('error', 'Both email address and pasword is required.');
      return res.redirect('/admin/login');
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
          return res.redirect('/admin/dashboard');
        });
      }
    });
  },

  getLogout(req, res) {
    req.session.user = null;
    req.session.authenticated = false;

    req.flash('success', 'You have been logged out successfully');
    return res.redirect('/admin/login');
  },

  getAdminDashboard(req, res) {
    return res.render('admin/admin-portal-list', {
      admin: req.session.user.admin,
      authenticated: true,
      pageName: 'Admin Portal List',
      metaData: config.metaData
    });
  },

  getAdminView(req, res) {
    return res.render('admin/admin-portal-view', {
      admin: req.session.user.admin,
      authenticated: true,
      pageName: 'Admin Portal View',
      metaData: config.metaData
    });
  },

  getViewUsers(req, res) {
    UserModel
      .find({})
      .lean()
      .then((response) => {
        const users = response;
        return res.render('admin/view-users', {
          admin: req.session.user.admin,
          authenticated: true,
          pageName: 'View Users',
          metaData: config.metaData,
          users
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getDeleteUserById(req, res) {
    const backURL = req.header('Referer') || '/';
    UserModel.findByIdAndRemove(req.params.userId, (err, response) => {
      if (err) {
        console.log(err);
        req.flash('error', 'There was a problem deleting this user.');
      } else {
        console.log(response);
        req.flash('error', 'User has been deleted successfully.');
      }
      return res.redirect(backURL);
    });
  },

  getUserById(req, res) {
    const backURL = req.header('Referer') || '/';
    UserModel
      .findById(req.params.userId)
      .lean()
      .then((response) => {
        const user = response;
        return res.render('admin/user-form', {
          admin: req.session.user.admin,
          authenticated: true,
          edit: true,
          user,
          pageName: 'Create User',
          metaData: config.metaData
        });
      })
      .catch((err) => {
        console.log(err);
        req.flash('error', 'There was a problem finding this user.');
        return res.redirect(backURL);
      });
  },

  postUserById(req, res) {},

  getCreateUser(req, res) {
    console.log('here');
    return res.render('admin/user-form', {
      admin: req.session.user.admin,
      authenticated: true,
      pageName: 'Create User',
      edit: false,
      metaData: config.metaData
    });
  },

  postCreateUser(req, res) {
    const backURL = req.header('Referer') || '/';

    if (!req.body.emailaddress) {
      req.flash('error', 'Both email address and pasword is required.');
      return res.redirect(backURL);
    }

    const password = 'delta1234';

    const userObj = {
      emailaddress: req.body.emailaddress,
      password,
      name: {
        first: req.body.firstname,
        last: req.body.lastname
      },
      role: req.body.jobrole,
      admin: req.body.administrator,
      phonenumber: req.body.phonenumber
    };

    new UserModel(userObj)
      .save()
      .then(() => {
        req.flash('success', 'The account was created successfully');
        return res.redirect(backURL);
      })
      .catch((err) => {
        console.log(err);
        req.flash('error', 'This email address is already in use.');
        return res.redirect(backURL);
      })
  }
};
