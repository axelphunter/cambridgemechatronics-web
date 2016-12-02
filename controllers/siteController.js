'use strict';

const config = require('config');
const fs = require('fs');

// */ controllers
module.exports = {
  getHome(req, res) {
    const slides = fs.readdirSync(`${config.rootPath}/images/hero-images`);
    res.render('home', {
      pageName: 'Home',
      slides,
      metaData: config.metaData
    });
  },
  getAbout(req, res) {
    res.render('about', {
      pageName: 'About',
      active_about: true,
      metaData: config.metaData
    });
  },
  getTechnology(req, res) {
    res.render('technology', {
      pageName: 'Technology',
      active_tech: true,
      metaData: config.metaData
    });
  },
  getSmallLightweightPrecisePowerful(req, res) {
    res.render('powerful', {
      pageName: 'Powerful',
      active_tech: true,
      metaData: config.metaData
    });
  },
  getOis(req, res) {
    res.render('ois', {
      pageName: 'OIS',
      active_tech: true,
      metaData: config.metaData
    });
  },
  getDrones(req, res) {
    res.render('drones', {
      pageName: 'Drones',
      active_tech: true,
      metaData: config.metaData
    });
  },
  getVirtualReality(req, res) {
    res.render('virtual-reality', {
      pageName: 'Virtual Reality',
      active_tech: true,
      metaData: config.metaData
    });
  },
  getContact(req, res) {
    res.render('contact', {
      pageName: 'Contact',
      active_contact: true,
      metaData: config.metaData
    });
  },
  getNews(req, res) {
    res.render('news', {
      pageName: 'News',
      active_news: true,
      metaData: config.metaData
    });
  },
  getCareers(req, res) {
    res.render('careers', {
      pageName: 'Careers',
      active_careers: true,
      metaData: config.metaData
    });
  },
  getTeam(req, res) {
    res.render('team', {
      pageName: 'Team',
      active_team: true,
      metaData: config.metaData
    });
  }
};
