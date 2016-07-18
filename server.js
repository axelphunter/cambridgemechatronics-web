const express = require('express');
const exphbs = require('express-handlebars');
// const handlebars = require('handlebars');
const path = require('path');
// const program = require('commander');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const request = require('request-promise');
const app = express();
const config = require('config');
const port = process.env.PORT || config.port;
const appDir = path.join(__dirname, config.debug ? '/app' : '/dist');
const appPaths = {
  js: path.resolve(appDir, 'js'),
  css: path.resolve(appDir, 'css'),
  img: path.resolve(appDir, 'img'),
  bower: path.resolve(appDir, 'bower_components')
};
const staticOpts = {
  etag: config.debug,
  lastModified: config.debug,
  maxAge: 0
};

app.set('views', path.join(appDir, '/views'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(appDir, '/views/layouts'),
  partialsDir: path.join(appDir, '/views/partials'),
  helpers: {

  }
}));
app.set('view engine', '.hbs');

app.use('/js', express.static(appPaths.js, staticOpts));
app.use('/css', express.static(appPaths.css, staticOpts));
app.use('/img', express.static(appPaths.img, staticOpts));
app.use('/bower_components', express.static(appPaths.bower, staticOpts));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(validator());

const appRoutes = express.Router();

// routes
app.get('/', (req, res) => {
  res.render('home', {});
});

app.use('/', appRoutes);
app.listen(port);
console.log(`Magic happens at http://localhost:${port}`);
