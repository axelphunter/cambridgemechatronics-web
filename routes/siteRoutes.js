'use strict';

// dependencies
const siteController = require('../controllers/siteController');

// exports
module.exports = (app) => {
  app.get('/', siteController.getHome);
  app.get('/about', siteController.getAbout);
  app.get('/technology', siteController.getTechnology);
  app.get('/powerful', siteController.getSmallLightweightPrecisePowerful);
  app.get('/ois', siteController.getOis);
  app.get('/drones', siteController.getDrones);
  app.get('/virtual', siteController.getVirtual);
};
