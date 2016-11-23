'use strict';

// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');
const compression = require('compression');
const markdown = require('markdown').markdown;

// exports
module.exports = (app, settings) => {
  app.use(compression());
  // view engine configuration
  app.set('views', path.join(settings.rootPath, '/views'));

  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(settings.rootPath, '/views/layouts'),
    partialsDir: path.join(settings.rootPath, '/views/partials'),
    helpers: {
      dateFormat(date) {
        return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
      },
      markdown(content) {
        return new Handlebars.SafeString(markdown.toHTML(content));
      }
    }
  }));
  app.set('view engine', '.hbs');

  // body parser configuration
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(bodyParser.json());

  // serve static files
  const appPaths = {
    js: path.resolve(settings.rootPath, 'js'),
    css: path.resolve(settings.rootPath, 'css'),
    images: path.resolve(settings.rootPath, 'images'),
    fonts: path.resolve(settings.rootPath, 'fonts'),
    sitemap: path.resolve(settings.rootPath, 'sitemap.xml'),
    bower_components: path.resolve(settings.rootPath, 'bower_components')
  };
  const staticOpts = {
    etag: settings.debugMode,
    lastModified: settings.debugMode,
    maxAge: 0
  };

  app.use('/js', express.static(appPaths.js, staticOpts));
  app.use('/css', express.static(appPaths.css, staticOpts));
  app.use('/images', express.static(appPaths.images, staticOpts));
  app.use('/fonts', express.static(appPaths.fonts, staticOpts));
  app.use('/sitemap.xml', express.static(appPaths.sitemap, staticOpts));
  app.use('/bower_components', express.static(appPaths.bower_components, staticOpts));
};
