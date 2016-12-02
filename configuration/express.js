'use strict';

// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const handlebarsHelpers = require('../services/handlebarsHelpers');

// exports
module.exports = (app, config) => {
  app.use(compression());
  // view engine configuration
  app.set('views', path.join(config.rootPath, '/views'));

  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(config.rootPath, '/views/layouts'),
    partialsDir: path.join(config.rootPath, '/views/partials'),
    helpers: handlebarsHelpers
  }));
  app.set('view engine', '.hbs');

  // body parser configuration
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(bodyParser.json());

  // serve static files
  const appPaths = {
    js: path.resolve(config.rootPath, 'js'),
    css: path.resolve(config.rootPath, 'css'),
    images: path.resolve(config.rootPath, 'images'),
    fonts: path.resolve(config.rootPath, 'fonts'),
    sitemap: path.resolve(config.rootPath, 'sitemap.xml'),
    bower_components: path.resolve(config.rootPath, 'bower_components')
  };
  const staticOpts = {
    etag: config.debugMode,
    lastModified: config.debugMode,
    maxAge: 0
  };

  app.use('/js', express.static(appPaths.js, staticOpts));
  app.use('/css', express.static(appPaths.css, staticOpts));
  app.use('/images', express.static(appPaths.images, staticOpts));
  app.use('/fonts', express.static(appPaths.fonts, staticOpts));
  app.use('/sitemap.xml', express.static(appPaths.sitemap, staticOpts));
  app.use('/bower_components', express.static(appPaths.bower_components, staticOpts));
};
