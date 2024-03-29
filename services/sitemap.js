'use strict';

// dependencies
const SitemapGenerator = require('sitemap-generator');
const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;

const generator = new SitemapGenerator('http://www.cambridgemechatronics.com/');

generator.on('done', (sitemap) => {
  fs.writeFile(path.join('dist/sitemap.xml'), sitemap, (err) => {
    if (!err) {
      return console.log('The sitemap was saved!');
    }
    return console.log(err);
  });
});

new CronJob('0 0 24 * * *', () => {
  generator.start();
}, null, true, 'America/Los_Angeles');
