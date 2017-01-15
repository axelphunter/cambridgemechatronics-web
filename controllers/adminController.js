'use strict';

const config = require('config');
const prismicConfig = require('../configuration/prismic');
const prismic = require('prismic.io');
const UserModel = require('../models/userModel');
const _ = require('lodash');

// */ controllers
module.exports = {
  getLogin(req, res) {
    return res.render('admin/login', {
      error: req.flash('error')[0],
      success: req.flash('success')[0],
      pageName: 'Login',
      metaData: config.metaData
    });
  },

  postLogin(req, res) {
    if (!req.body.emailaddress || !req.body.password) {
      req.flash('error', 'Both email address and pasword is required.');
      return res.redirect('/admin/login');
    }

    return UserModel.findOne({
      emailaddress: req.body.emailaddress
    }, (err, user) => {
      if (err) {
        req.flash('error', 'There was an error processing your request.');
        return res.redirect('/admin/login');
      }

      if (!user) {
        req.flash('error', 'Authentication failed. User not found.');
        return res.redirect('/admin/login');
      }
      // check if password matches
      user.comparePassword(req.body.password, (_err) => {
        if (_err) {
          req.flash('error', 'Username or password incorrect.');
          return res.redirect('/admin/login');
        }
        user = JSON.parse(JSON.stringify(user));
        req.session.user = user;
        req.session.authenticated = true;

        req.flash('success', 'You have been logged in successfully');
        return res.redirect('/admin');
      });
    });
  },

  getPasswordReset(req, res) {
    return res.render('admin/password-reset', {
      admin: req.session.user.admin,
      authenticated: true,
      userId: req.session.user._id,
      error: req.flash('error')[0],
      success: req.flash('success')[0],
      pageName: 'Create User',
      edit: false,
      metaData: config.metaData
    });
  },

  postPasswordReset(req, res) {
    const backURL = req.header('Referer') || '/';

    if (req.body.password !== req.body.confirmpassword) {
      req.flash('error', 'Both passwords must match.');
      return res.redirect(backURL);
    }
    delete req.body.confirmpassword;

    return UserModel.findOneAndUpdate({
      _id: req.session.user._id
    }, {
      password: req.body.password,
      passwordReset: false
    }).then(() => {
      req.session.user.passwordReset = false;
      req.flash('success', 'Your password has been reset successfully.');
      return res.redirect('/admin');
    }).catch((err) => {
      console.log(err);
      req.flash('error', 'There was a problem updating yoru password please try again.');
      return res.redirect(backURL);
    });
  },

  getLogout(req, res) {
    req.session.user = null;
    req.session.authenticated = false;

    req.flash('success', 'You have been logged out successfully');
    return res.redirect('/admin/login');
  },

  getAdminDashboard(req, res) {
    const backURL = req.header('Referer') || '/';
    const searchQuery = req.query.search
      ? req
        .query
        .search
        .toLowerCase()
      : null;

    prismicConfig
      .api(req, res)
      .then((api) => {
        const query = api.query(prismic.Predicates.at('document.type', 'adminitem'));
        return query;
      })
      .then((pageContent) => {
        if (searchQuery) {
          pageContent.results = _.filter(pageContent.results, (val) => {
            return val
              .data['adminitem.title']
              .value
              .toLowerCase()
              .indexOf(searchQuery) > -1;
          });
        }

        pageContent
          .results
          .sort((a, b) => {
            const sorter = new Date(a.firstPublicationDate) - new Date(b.firstPublicationDate);
            return sorter;
          });
        pageContent
          .results
          .reverse();
        return res.render('admin/admin-portal-list', {
          admin: req.session.user.admin,
          authenticated: true,
          userId: req.session.user._id,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          ctx: res.locals.ctx,
          searchQuery,
          pageContent,
          pageName: 'Admin Portal List',
          metaData: config.metaData
        });
      })
      .catch((err) => {
        console.log(err);
        req.flash('error', 'There was a problem accessing documents.');
        return res.redirect(backURL);
      });
  },

  getAdminItemBySlug(req, res) {
    const slug = req.params.slug;
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.getByUID('adminitem', slug);
      })
      .then((pageContent) => {
        if (pageContent) {
          return res.render('admin/admin-portal-view', {
            admin: req.session.user.admin,
            authenticated: true,
            userId: req.session.user._id,
            error: req.flash('error')[0],
            success: req.flash('success')[0],
            ctx: res.locals.ctx,
            pageContent,
            pageName: 'Admin Portal View',
            metaData: config.metaData
          });
        }
        res.status(404);
        return res.render('404', {
          admin: req.session.user.admin,
          authenticated: true,
          userId: req.session.user._id,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: '404',
          metaData: config.metaData
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404);
        res.render('404', {
          admin: req.session.user.admin,
          authenticated: true,
          userId: req.session.user._id,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: '404',
          metaData: config.metaData
        });
      });
  },

  getViewUsers(req, res) {
    const backURL = req.header('Referer') || '/';
    if (!req.session.user.admin) {
      req.flash('error', 'You are not authorised to access this page.');
      return res.redirect(backURL);
    }
    const searchQuery = req.query.search || null;
    let query = {};

    if (searchQuery) {
      const nameQuery = searchQuery.split(' ');
      let nameRegexString = '';

      for (let i = 0; i < nameQuery.length; i++) {
        nameRegexString += nameQuery[i];
        if (i < nameQuery.length - 1) {
          nameRegexString += '|';
        }
      }

      query = {
        $or: [
          {
            emailaddress: new RegExp(searchQuery, 'i')
          }, {
            'name.first': new RegExp(nameRegexString, 'i')
          }, {
            'name.last': new RegExp(nameRegexString, 'i')
          }
        ]
      };
    }

    return UserModel
      .find(query)
      .lean()
      .then((response) => {
        const users = response;
        return res.render('admin/user-listing', {
          admin: req.session.user.admin,
          authenticated: true,
          userId: req.session.user._id,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'View Users',
          metaData: config.metaData,
          searchQuery,
          users
        });
      })
      .catch((err) => {
        console.log(err);
        req.flash('error', 'There was a problem accessing users.');
        return res.redirect(backURL);
      });
  },

  getDeleteUserById(req, res) {
    if (!req.session.user.admin) {
      const backURL = req.header('Referer') || '/';
      req.flash('error', 'You are not authorised to access this page.');
      return res.redirect(backURL);
    }
    const backURL = req.header('Referer') || '/';
    return UserModel.findByIdAndRemove(req.params.userId, (err) => {
      if (err) {
        console.log(err);
        req.flash('error', 'There was a problem deleting this user.');
      } else {
        req.flash('error', 'User has been deleted successfully.');
      }
      return res.redirect(backURL);
    });
  },

  getUserById(req, res) {
    if (!req.session.user.admin && req.session.user._id !== req.params.userId) {
      const backURL = req.header('Referer') || '/';
      req.flash('error', 'You are not authorised to access this page.');
      return res.redirect(backURL);
    }
    const backURL = req.header('Referer') || '/';
    return UserModel
      .findById(req.params.userId)
      .lean()
      .then((response) => {
        const user = response;
        return res.render('admin/user-form', {
          admin: req.session.user.admin,
          authenticated: true,
          userId: req.session.user._id,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
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

  postUserById(req, res) {
    const backURL = req.header('Referer') || '/';
    const userObj = {
      emailaddress: req.body.emailaddress,
      name: {
        first: req.body.firstname,
        last: req.body.lastname
      },
      role: req.body.jobrole,
      admin: req.body.administrator,
      phonenumber: req.body.phonenumber
    };

    if (req.body.password || req.body.confirmpassword) {
      if (req.body.password !== req.body.confirmpassword) {
        req.flash('error', 'Both passwords must match.');
        return res.redirect(backURL);
      }
    } else {
      delete req.body.password;
    }
    delete req.body.confirmpassword;

    if (req.body.password) {
      userObj.password = req.body.password;
    }

    return UserModel.findOneAndUpdate({
      _id: req.params.userId
    }, userObj).then(() => {
      req.flash('success', 'User details were updated successfully');
      return res.redirect(backURL);
    }).catch((err) => {
      console.log(err);
      req.flash('error', 'There was a problem updating these user details.');
      return res.redirect(backURL);
    });
  },

  getCreateUser(req, res) {
    return res.render('admin/user-form', {
      admin: req.session.user.admin,
      authenticated: true,
      userId: req.session.user._id,
      error: req.flash('error')[0],
      success: req.flash('success')[0],
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
      phonenumber: req.body.phonenumber,
      passwordReset: true
    };

    return new UserModel(userObj)
      .save()
      .then(() => {
        req.flash('success', 'The account was created successfully');
        return res.redirect('/admin/users/list');
      })
      .catch((err) => {
        console.log(err);
        req.flash('error', 'This email address is already in use.');
        return res.redirect(backURL);
      });
  }
};
