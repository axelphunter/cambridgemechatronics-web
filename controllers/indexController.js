'use strict';

const config = require('config');
const prismicConfig = require('../configuration/prismic');
const prismic = require('prismic.io');

// */ controllers
module.exports = {
  getHome(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        const query = api.query(prismic.Predicates.at('document.type', 'homepage'));
        return query;
      })
      .then((pageContent) => {
        res.render('home', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'Home',
          ctx: res.locals.ctx,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getAbout(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        const query = api.query(prismic.Predicates.at('document.type', 'aboutpage'));
        return query;
      })
      .then((pageContent) => {
        res.render('about', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'About',
          ctx: res.locals.ctx,
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
        const query = api.query(prismic.Predicates.at('document.type', 'technologypage'));
        return query;
      })
      .then((pageContent) => {
        res.render('technology', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'Technology',
          ctx: res.locals.ctx,
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
        const query = api.query(prismic.Predicates.at('document.type', 'ourplatformtechnologypa'));
        return query;
      })
      .then((pageContent) => {
        res.render('our-platform-technology', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'Our Platform Technology',
          ctx: res.locals.ctx,
          active_tech: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getOis(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        const query = api.query(prismic.Predicates.at('document.type', 'oispage'));
        return query;
      })
      .then((pageContent) => {
        res.render('ois', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'OIS',
          ctx: res.locals.ctx,
          active_tech: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getContact(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        const query = api.query(prismic.Predicates.at('document.type', 'contactpage'));
        return query;
      })
      .then((pageContent) => {
        res.render('contact', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'Contact',
          ctx: res.locals.ctx,
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
        const query = api.query(prismic.Predicates.at('document.type', 'news'));
        return query;
      })
      .then((pageContent) => {
        pageContent
          .results
          .sort((a, b) => {
            const sorter = new Date(a.data['news.post-date'].value) - new Date(b.data['news.post-date'].value);
            return sorter;
          });
        pageContent
          .results
          .reverse();
        res.render('news', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'News',
          ctx: res.locals.ctx,
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
            authUser: req.session.user,
            error: req.flash('error')[0],
            success: req.flash('success')[0],
            pageName: 'News',
            ctx: res.locals.ctx,
            active_news: true,
            pageContent,
            metaData: config.metaData
          });
        }
        res.status(404);
        return res.render('404', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: '404',
          metaData: config.metaData
        });
      })
      .catch(() => {
        res.status(404);
        res.render('404', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: '404',
          metaData: config.metaData
        });
      });
  },

  getCareers(req, res) {
    prismicConfig
      .api(req, res)
      .then((api) => {
        const query = api.query(prismic.Predicates.at('document.type', 'careerspage'));
        return query;
      })
      .then((pageContent) => {
        res.render('careers', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'Careers',
          ctx: res.locals.ctx,
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
        const query = api.query(prismic.Predicates.at('document.type', 'teampage'));
        return query;
      })
      .then((pageContent) => {
        res.render('team', {
          authUser: req.session.user,
          error: req.flash('error')[0],
          success: req.flash('success')[0],
          pageName: 'Team',
          ctx: res.locals.ctx,
          active_team: true,
          pageContent: pageContent.results[0],
          metaData: config.metaData
        });
      });
  },

  getTerms(req, res) {
    res.render('terms', {
      authUser: req.session.user,
      error: req.flash('error')[0],
      success: req.flash('success')[0],
      pageName: 'Terms and Conditions',
      metaData: config.metaData
    });
  }
};
