// dependencies
const express = require('express');

// environment config
const config = require('config');
const appRoot = require('app-root-path');
const path = require('path');

config.rootPath = path.join(appRoot.path, config.debug
  ? '/app'
  : '/dist');

// express config
const app = express();
require('./configuration/express')(app, config);

// logger configuration
require('./configuration/logger')(app);

// mongoose config
require('./configuration/mongoose')(config);

// sitemap service run
require('./services/sitemap');

// routing configuration
require('./configuration/routing')(app, config);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// server
app.listen(port, () => {
  console.log(`${process.env.NODE_ENV} - NodeJS Server listening on port TCP/${port}...`);
});
