"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActivitySchema = new Schema({
  activity: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  }
}, {
  strict: false
});

module.exports = mongoose.model('UserActivity', UserActivitySchema);
