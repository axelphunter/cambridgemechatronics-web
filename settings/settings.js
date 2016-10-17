// dependencies
const appRoot = require('app-root-path');
const path = require('path');
var debugMode = false;

// environment
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || process.env.NODE_PORT || 3000;

if (env === 'development') debugMode = true;

// Set path based on ENV
const rootPath = path.join(appRoot.path, debugMode ? '/app' : '/dist');

// module exports
module.exports = {
  development: {
    rootPath,
    port
  },
  production: {
    rootPath,
    port
  }
};
