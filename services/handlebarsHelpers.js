'use strict';

const Handlebars = require('handlebars');
const moment = require('moment');

module.exports = {
  dateFormat(date) {
    return moment(date).format('dddd, MMMM Do YYYY');
  },
  structuredText(obj) {
    let response = '';

    obj
      .value
      .forEach((val) => {
        switch (val.type) {
          case 'heading1':
            response += `<h1>${val.text}</h1>`;
            break;
          case 'heading2':
            response += `<h2>${val.text}</h2>`;
            break;
          case 'heading3':
            response += `<h3>${val.text}</h3>`;
            break;
          case 'heading4':
            response += `<h4>${val.text}</h4>`;
            break;
          case 'image':
            response += `<img src='${val.url}' alt='${val.alt}'/>`;
            break;
          case 'list-item':
            response += `<li>${val.text}</li>`;
            break;
          default:
            response += `<p>${val.text}</p>`;
        }
      });

    return new Handlebars.SafeString(response);
  }
};
