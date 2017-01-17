'use strict';

// dependencies
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/middleware');

// exports
module.exports = (app) => {
  app.get('/admin/login', adminController.getLogin);
  app.post('/admin/login', adminController.postLogin);
  app.get('/admin/logout', adminController.getLogout);
  app.get('/admin/password-reset', middleware.checkAuth, adminController.getPasswordReset);
  app.post('/admin/password-reset', middleware.checkAuth, adminController.postPasswordReset);
  app.get('/admin/user/create', adminController.getCreateUser);
  app.post('/admin/user/create', adminController.postCreateUser);
  app.get('/admin', middleware.checkAuth, adminController.getAdminDashboard);
  app.get('/admin/:slug', middleware.checkAuth, adminController.getAdminItemBySlug);
  app.get('/admin/users/list', middleware.checkAuth, adminController.getViewUsers);
  app.get('/admin/delete/:userId', middleware.checkAuth, adminController.getDeleteUserById);
  app.get('/admin/password-reset/:userId', middleware.checkAuth, adminController.getForcePasswordResetUserById);
  app.get('/admin/block/:userId', middleware.checkAuth, adminController.getBlockUserById);
  app.get('/admin/user/:userId', middleware.checkAuth, adminController.getUserById);
  app.post('/admin/user/:userId', middleware.checkAuth, adminController.postUserById);
};
