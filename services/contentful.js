// dependencies
const contentful = require('contentful');
const config = require('config');
const client = contentful.createClient({
  space: config.contentful.spaceId,
  accessToken: config.contentful.accessToken
});

const getEntry = (id) => {
  const promise = new Promise((resolve, reject) => {
    client.getEntry(id)
      .then((entry) => {
        resolve(entry);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

const getBlogEntries = () => {
  const promise = new Promise((resolve, reject) => {
    client.getEntries({
        'content_type': 'blogPost'
      })
      .then((entry) => {
        resolve(entry);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

module.exports = {
  getEntry,
  getBlogEntries
};
