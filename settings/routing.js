// exports
module.exports = (app, config) => {
  // server-side routing dependencies
  require('../routes/siteRoutes')(app, config);

  app.use((req, res) => {
    res.status(404);
    res.render('404', {
      metaData: config.metaData
    });
  });
};
