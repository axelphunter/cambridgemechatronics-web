"use strict";

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (config) => {
  // db connection
  mongoose.connect(process.env.MONGO_URL || config.mongodb.uri);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDb conneciton error'));
  db.once('open', () => {
    console.log('MongoDb listening on port TCP/27017...');
    console.log('MongoDb database online...');
  });
};
