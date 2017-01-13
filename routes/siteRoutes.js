'use strict';

// dependencies
const siteController = require('../controllers/siteController');

// exports
module.exports = (app) => {
  app.get('/', siteController.getHome);
  app.get('/about', siteController.getAbout);
  app.get('/technology', siteController.getTechnology);
  app.get('/our-platform-technology', siteController.getOurPlatformTechnology);
  app.get('/ois', siteController.getOis);
  app.get('/contact', siteController.getContact);
  app.get('/news', siteController.getNews);
  app.get('/news/:uid', siteController.getNewsByUid);
  app.get('/careers', siteController.getCareers);
  app.get('/team', siteController.getTeam);
  app.get('/terms', siteController.getTerms);
  app.get('/login', siteController.getLogin);
  app.get('/admin-portal-list', siteController.getAdminPortalList);
  app.get('/admin-portal-view', siteController.getAdminPortalView);
  app.get('/view-users', siteController.getViewUsers);
  app.get('/create-user', siteController.getCreateUser);
};
