'use strict';

// dependencies
const express = require('express');

// environment config
const config = require('config');
const env = process.env.NODE_ENV || 'development';
const settings = require('./settings/settings')[env];

// express config
const app = express();
require('./settings/express')(app, settings);

// logger configuration
require('./settings/logger')(app);

// sitemap service run
require('./services/sitemap');

// routing configuration
require('./settings/routing')(app, config);

// server
app.listen(settings.port, () => {
  console.log(`${process.env.NODE_ENV || 'development'} - NodeJS Server listening on port TCP/${settings.port}...`);
});
