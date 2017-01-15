'use strict';

// dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const handlebarsHelpers = require('../services/handlebarsHelpers');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const expressValidator = require('express-validator');

// exports
module.exports = (app, config) => {
  // app paths
  const appPaths = {
    js: path.resolve(config.rootPath, 'js'),
    css: path.resolve(config.rootPath, 'css'),
    images: path.resolve(config.rootPath, 'images'),
    fonts: path.resolve(config.rootPath, 'fonts'),
    sitemap: path.resolve(config.rootPath, 'sitemap.xml'),
    bower_components: path.resolve(config.rootPath, 'bower_components')
  };
  // static options
  const staticOpts = {
    etag: config.debugMode,
    lastModified: config.debugMode,
    maxAge: 0
  };
  // express handlebars
  const exphbsOptions = {
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(config.rootPath, '/views/layouts'),
    partialsDir: path.join(config.rootPath, '/views/partials'),
    helpers: handlebarsHelpers
  };

  app
    .use(compression())
    .set('views', path.join(config.rootPath, '/views'))
    .engine('.hbs', exphbs(exphbsOptions))
    .set('view engine', '.hbs')
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use('/js', express.static(appPaths.js, staticOpts))
    .use('/css', express.static(appPaths.css, staticOpts))
    .use('/images', express.static(appPaths.images, staticOpts))
    .use('/fonts', express.static(appPaths.fonts, staticOpts))
    .use('/sitemap.xml', express.static(appPaths.sitemap, staticOpts))
    .use('/bower_components', express.static(appPaths.bower_components, staticOpts))
    .use(cookieParser('secret'))
    .use(session({
      secret: 'ilovescotchyscotchscotch',
      store: new RedisStore({
        url: process.env.REDIS_URL || config.redis.uri
      }),
      saveUninitialized: false,
      resave: false
    }))
    .use(flash())
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use(expressValidator());
};
