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
  },
  getAbout(req, res) {
    res.render('about', {
      pageName: 'About',
      metaData: config.metaData
    });
  },
  getTechnology(req, res) {
    res.render('technology', {
      pageName: 'Technology',
      metaData: config.metaData
    });
  },
  getSmallLightweightPrecisePowerful(req, res) {
    res.render('powerful', {
      pageName: 'Powerful',
      metaData: config.metaData
    });
  },
  getOis(req, res) {
    res.render('ois', {
      pageName: 'OIS',
      metaData: config.metaData
    });
  },
  getDrones(req, res) {
    res.render('drones', {
      pageName: 'Drones',
      metaData: config.metaData
    });
  },
  getVirtual(req, res) {
    res.render('virtual', {
      pageName: 'Virtual',
      metaData: config.metaData
    });
  }
};
