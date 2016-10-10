const express = require('express');
const exphbs = require('express-handlebars');
// const handlebars = require('handlebars');
const path = require('path');
// const program = require('commander');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const request = require('request-promise');
const nodemailer = require('nodemailer');
const app = express();
const config = require('config');
const port = process.env.PORT || config.port;
const appDir = path.join(__dirname, config.debug ? '/app' : '/dist');
const appPaths = {
  js: path.resolve(appDir, 'js'),
  css: path.resolve(appDir, 'css'),
  images: path.resolve(appDir, 'images'),
  fonts: path.resolve(appDir, 'fonts'),
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
app.use('/images', express.static(appPaths.images, staticOpts));
app.use('/fonts', express.static(appPaths.fonts, staticOpts));
app.use('/bower_components', express.static(appPaths.bower, staticOpts));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(validator());

const appRoutes = express.Router();

// Meta tag content
const metaData = {
  title: 'Blue Bulldog - A creative web and app studio',
  description: 'A website and mobile application, design and development company based in Cambridge, UK.',
  website: 'http://www.bluebulldog.co.uk/',
  socialImage: 'http://www.bluebulldog.co.uk/images/main-bg.jpg',
  company: 'Ragnarok IT Solutions Ltd.',
  companyReg: '8919183',
  companyVat: 'GB 181 992 863'
};

// routes
app.get('/', (req, res) => {
  res.render('home', {
    metaData
  });
});

// app.get('/portfolio', (req, res) => {
//   res.render('portfolio', {});
// });

app.get('/about', (req, res) => {
  res.render('about', {
    metaData
  });
});

app.get('/careers', (req, res) => {
  res.render('careers', {
    metaData
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    metaData
  });
});

app.post('/contact', (req, res) => {
  const transporter = nodemailer.createTransport('smtps://axel.hunter@bluebulldog.co.uk:delta1234@smtp.gmail.com');

  const mailOpts = {
    from: 'Axel Hunter <axel.hunter@bluebulldog.co.uk>',
    to: 'axel.hunter@bluebulldog.co.uk, axel.hunter@bluebulldog.co.uk',
    subject: `Contact form - ${req.body.subject}`,
    text: `Name: ${req.body.name} - Email: ${req.body.email} Message: ${req.body.message}`,
    html: `Name: ${req.body.name}<br/> - Email: ${req.body.email}<br/> Message: ${req.body.message}`
  };
  transporter.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error);
      res.render('contact', {
        msg: 'Error occured, message not sent.',
        err: true
      });
      return;
    }
    console.log(response);

    res.render('contact', {
      msg: 'Message sent! Thank you.',
      err: false
    });
  });
});

app.use((req, res) => {
  res.status(404);
  res.render('404', {
    metaData
  });
});

app.use('/', appRoutes);
app.listen(port);
console.log(`Magic happens at http://localhost:${port}`);
