'use strict';

// exports
module.exports = (app, config) => {
  // server-side routing dependencies
  require('../routes/indexRoutes')(app, config);
  require('../routes/adminRoutes')(app, config);

  app.use((req, res) => {
    res.status(404);
    res.render('404', {
      pageName: '404',
      metaData: config.metaData
    });
  });
};
