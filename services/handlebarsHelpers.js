'use strict';

const Handlebars = require('handlebars');
const moment = require('moment');
const prismic = require('../configuration/prismic');

module.exports = {
  dateFormat(date) {
    return moment(date).format('dddd, MMMM Do YYYY');
  },

  dateTimeFormat(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  },

  isOnline(date) {
    let response = '';
    if (moment(date).diff(moment()) < -300000) {
      response += '<i class="fa fa-user-circle-o" aria-hidden="true"></i>';
    } else {
      response += '<i class="fa fa-user-circle" aria-hidden="true"></i>';
    }
    return new Handlebars.SafeString(response);
  },

  group(obj, ref, data) {
    let response = '';
    const array = obj
      .getGroup(ref)
      .toArray();
    for (let i = 0, j = array.length; i < j; i++) {
      let item = array[i];
      if (typeof(item) === 'object') {
        item.index = i;
      } else {
        item = {
          value: item,
          index: i
        };
      }
      response += data.fn(item);
    }
    return response;
  },

  text(obj, ref) {
    return new Handlebars.SafeString(obj.getText(ref));
  },

  image(obj, ref) {
    return new Handlebars.SafeString(obj.getImage(ref).url || false);
  },

  structuredText(obj, ref, ctx) {
    return new Handlebars.SafeString(obj.getStructuredText(ref).asHtml(ctx.linkResolver));
  },

  structuredTextPlain(obj) {
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
