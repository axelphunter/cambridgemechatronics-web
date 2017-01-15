'use strict';

// dependencies
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/middleware');

// exports
module.exports = (app) => {
  app.get('/admin/login', adminController.getLogin);
  app.post('/admin/login', adminController.postLogin);
  app.get('/admin/logout', middleware.checkAuth, adminController.getLogout);
  app.get('/admin/user/create', middleware.checkAuth, adminController.getCreateUser);
  app.post('/admin/user/create', middleware.checkAuth, adminController.postCreateUser);
  app.get('/admin/dashboard', middleware.checkAuth, adminController.getAdminDashboard);
  app.get('/admin/view/:slug', middleware.checkAuth, adminController.getAdminView);
  app.get('/admin/users/list', middleware.checkAuth, adminController.getViewUsers);
  app.get('/admin/delete/:userId', middleware.checkAuth, adminController.getDeleteUserById);
  app.get('/admin/user/:userId', middleware.checkAuth, adminController.getUserById);
  app.post('/admin/user/:userId', middleware.checkAuth, adminController.postUserById);
};