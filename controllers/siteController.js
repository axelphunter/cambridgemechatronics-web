'use strict';

const config = require('config');
const fs = require('fs');
const prismicConfig = require('../configuration/prismic');
const prismic = require('prismic.io');

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
  getOurPlatformTechnology(req, res) {
    res.render('our-platform-technology', {
      pageName: 'Our Platform Technology',
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
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'news'), {orderings: '[my.blog-post.post-date desc]'});
      })
      .then((pageContent) => {
        res.render('news', {
          pageName: 'News',
          active_news: true,
          pageContent,
          metaData: config.metaData
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getNewsByUid(req, res) {
    const uid = req.params.uid;
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.getByUID('news', uid);
      })
      .then((pageContent) => {
        if (pageContent) {
          return res.render('news-item', {
            pageName: 'News',
            active_news: true,
            pageContent,
            metaData: config.metaData
          });
        }
        res.status(404);
        res.render('404', {
          pageName: '404',
          metaData: config.metaData
        });
      })
      .catch((err) => {
        res.status(404);
        res.render('404', {
          pageName: '404',
          metaData: config.metaData
        });
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
