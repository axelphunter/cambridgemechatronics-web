'use strict';

// dependencies
const indexController = require('../controllers/indexController');

// exports
module.exports = (app) => {
  app.get('/', indexController.getHome);
  app.get('/about', indexController.getAbout);
  app.get('/technology', indexController.getTechnology);
  app.get('/our-platform-technology', indexController.getOurPlatformTechnology);
  app.get('/ois', indexController.getOis);
  app.get('/contact', indexController.getContact);
  app.get('/news', indexController.getNews);
  app.get('/news/:uid', indexController.getNewsByUid);
  app.get('/careers', indexController.getCareers);
  app.get('/team', indexController.getTeam);
  app.get('/terms', indexController.getTerms);
};
