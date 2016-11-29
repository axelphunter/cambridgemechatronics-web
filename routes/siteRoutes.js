'use strict';

// dependencies
const siteController = require('../controllers/siteController');

// exports
module.exports = (app) => {
  app.get('/', siteController.getHome);
  app.get('/about', siteController.getAbout);
};
