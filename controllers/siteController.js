const config = require('config');
const contentful = require('../services/contentful');

// */ controllers
const getHome = (req, res) => {
  res.render('home', {
    pageName: 'Home',
    metaData: config.metaData
  });
};

// */about controllers
const getAbout = (req, res) => {
  res.render('about', {
    pageName: 'About',
    metaData: config.metaData
  });
};

// */blog controllers
const getBlogList = (req, res) => {
  contentful
    .getBlogEntries()
    .then((response) => {
      res.render('blog-listing', {
        pageName: 'Blog',
        blogPosts: response,
        metaData: config.metaData
      });
    })
    .catch(() => {
      res.render('404', {
        metaData: config.metaData
      });
    });
};

const getBlogPost = (req, res) => {
  const slug = req.params.slug;
  contentful
    .getEntryBySlug(slug)
    .then((response) => {
      res.render('blog-post', {
        pageName: response.items[0].fields.title,
        fields: response.items[0].fields,
        metaData: config.metaData
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('404', {
        pageName: '404',
        metaData: config.metaData
      });
    });
};

// */careers controllers
const getCareers = (req, res) => {
  res.render('careers', {
    pageName: 'Careers',
    metaData: config.metaData
  });
};

// */planner controllers
// const getPlanner = (req, res) => {
//   res.render('planner', {pageName: '404',metaData: config.metaData});
// };

// */contact controllers
const getContact = (req, res) => {
  res.render('contact', {
    pageName: 'Contact',
    metaData: config.metaData
  });
};

const postContact = (req, res) => {
  const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{
          email: 'axel.hunter@bluebulldog.co.uk'
        }, {
          email: 'eik.hunter@bluebulldog.co.uk'
        }],
        subject: `Contact form - ${req.body.subject}`
      }],
      from: {
        email: 'info@bluebulldog.co.uk'
      },
      content: [{
        type: 'text/plain',
        value: `Name: ${req.body.name} - Email: ${req.body.email} Message: ${req.body.message}`
      }]
    }
  });
  sg
    .API(request)
    .then(response => {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
      res.render('contact', {
        msg: 'Message sent! Thank you.',
        err: false
      });
    })
    .catch(error => {
      console.log(error.response.statusCode);
      res.render('contact', {
        msg: 'Error occured, message not sent.',
        err: true
      });
      return;
    });
};

// */privacy-policy controllers
const getPrivacyPolicy = (req, res) => {
  res.render('privacy-policy', {
    pageName: 'Privacy policy',
    metaData: config.metaData
  });
};

// */privacy-policy controllers
const getCookiePolicy = (req, res) => {
  res.render('cookie-policy', {
    pageName: 'Cookie Policy',
    metaData: config.metaData
  });
};

// */website-terms controllers
const getWebsiteTerms = (req, res) => {
  res.render('website-terms', {
    pageName: 'Website Terms',
    metaData: config.metaData
  });
};

// */website-terms controllers
const getAgencyTerms = (req, res) => {
  res.render('agency-terms', {
    pageName: 'Agency Terms',
    metaData: config.metaData
  });
};

module.exports = {
  getHome,
  getAbout,
  getBlogList,
  getBlogPost,
  getCareers,
  getContact,
  postContact,
  getPrivacyPolicy,
  getCookiePolicy,
  getWebsiteTerms,
  getAgencyTerms
};
