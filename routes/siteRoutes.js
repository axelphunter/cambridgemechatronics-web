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
  app.get('/drones', siteController.getDrones);
  app.get('/virtual-reality', siteController.getVirtualReality);
  app.get('/contact', siteController.getContact);
  app.get('/news', siteController.getNews);
  app.get('/news/:uid', siteController.getNewsByUid);
  app.get('/careers', siteController.getCareers);
  app.get('/team', siteController.getTeam);
};
