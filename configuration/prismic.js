const Prismic = require('prismic.io');

module.exports = {

  apiEndpoint: 'https://cambridgemechatronics.prismic.io/api',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver(doc, ctx) {
    return '/';
  },

  api(req, res) {
    res.locals.ctx = { // So we can use this information in the views
      endpoint: this.apiEndpoint,
      linkResolver: this.linkResolver
    };
    return Prismic.api(this.apiEndpoint, {
      accessToken: this.accessToken,
      req
    });
  }
};
