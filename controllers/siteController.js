'use strict';

const config = require('config');
const fs = require('fs');
const prismicConfig = require('../configuration/prismic');
const prismic = require('prismic.io');

// */ controllers
module.exports = {
  getHome(req, res) {
    const slides = fs.readdirSync(`${config.rootPath}/images/hero-images`);
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'homepage'));
      })
      .then((pageContent) => {
        res.render('home', {
          pageName: 'Home',
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getAbout(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'aboutpage'));
      })
      .then((pageContent) => {
        res.render('about', {
          pageName: 'About',
          active_about: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getTechnology(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'technologypage'));
      })
      .then((pageContent) => {
        res.render('technology', {
          pageName: 'Technology',
          active_tech: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getOurPlatformTechnology(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'ourplatformtechnologypa'));
      })
      .then((pageContent) => {
        res.render('our-platform-technology', {
          pageName: 'Our Platform Technology',
          active_tech: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getOis(req, res) {
    res.render('ois', {
      pageName: 'OIS',
      active_tech: true,
      metaData: config.metaData
    });
  },

  getContact(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'contactpage'));
      })
      .then((pageContent) => {
        res.render('contact', {
          pageName: 'Contact',
          active_contact: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getNews(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'news'));
      })
      .then((pageContent) => {
        pageContent
          .results
          .sort((a, b) => {
            return new Date(a.data['news.post-date'].value) - new Date(b.data['news.post-date'].value);
          });
        pageContent
          .results
          .reverse();
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
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'careerspage'));
      })
      .then((pageContent) => {
        res.render('careers', {
          pageName: 'Careers',
          active_careers: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getTeam(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        return api.query(prismic.Predicates.at('document.type', 'teampage'));
      })
      .then((pageContent) => {
        res.render('team', {
          pageName: 'Team',
          active_team: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getTerms(req, res) {
    res.render('terms', {
      pageName: 'Terms and Conditions',
      metaData: config.metaData
    });
  }
};
