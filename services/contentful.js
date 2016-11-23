'use strict';

// dependencies
const contentful = require('contentful');
const config = require('config');
const client = contentful.createClient({space: config.contentful.spaceId, accessToken: config.contentful.accessToken});

const getEntryBySlug = (slug) => {
  const promise = new Promise((resolve, reject) => {
    client
      .getEntries({content_type: 'blogPost', 'fields.slug': slug})
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

const getBlogEntries = () => {
  const promise = new Promise((resolve, reject) => {
    client
      .getEntries({order: '-sys.createdAt', content_type: 'blogPost'})
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

module.exports = {
  getEntryBySlug,
  getBlogEntries
};
