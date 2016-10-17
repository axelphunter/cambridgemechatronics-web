// dependencies
const SitemapGenerator = require('sitemap-generator');
const fs = require('fs');
const path = require('path');
const settings = require('../settings/settings')
  .production;

const generator = new SitemapGenerator('http://www.bluebulldog.co.uk');

generator.on('done', (sitemap) => {
  fs.writeFile(path.join(settings.rootPath, '/sitemap.xml'), sitemap, (err) => {
    if (!err) {
      return console.log('The sitemap was saved!');
    }
    return console.log(err);
  });
});
generator.start();
