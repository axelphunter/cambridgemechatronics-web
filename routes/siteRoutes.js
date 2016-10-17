// dependencies
const siteController = require('../controllers/siteController');

// exports
module.exports = (app) => {
  app.get('/', siteController.getHome);
  app.get('/about', siteController.getAbout);
  app.get('/careers', siteController.getCareers);
  app.get('/planner', siteController.getPlanner);
  app.get('/contact', siteController.getContact);
  app.post('/contact', siteController.postContact);
  app.get('/privacy-policy', siteController.getPrivacyPolicy);
  app.get('/cookie-policy', siteController.getCookiePolicy);
  app.get('/website-terms', siteController.getWebsiteTerms);
  app.get('/agency-terms', siteController.getAgencyTerms);
};
