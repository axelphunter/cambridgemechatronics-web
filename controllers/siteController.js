'use strict';

const config = require('config');
const fs = require('fs');

// */ controllers
module.exports = {
  getHome(req, res) {
    const slides = fs.readdirSync(`${config.rootPath}/images/slides`);
    res.render('home', {
      pageName: 'Home',
      slides,
      metaData: config.metaData
    });
  }
};
