const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
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
  images: path.resolve(appDir, 'images'),
  fonts: path.resolve(appDir, 'fonts'),
  bower: path.resolve(appDir, 'bower_components')
};
const staticOpts = {
  etag: config.debug,
  lastModified: config.debug,
  maxAge: 0
};

app.use(morgan('dev'));

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

app.get('/planner', (req, res) => {
  res.render('planner', {
    metaData
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    metaData
  });
});

app.post('/contact', (req, res) => {
  const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{
          email: 'axel.hunter@bluebulldog.co.uk',
        }, {
          email: 'eik.hunter@bluebulldog.co.uk',
        }, ],
        subject: `Contact form - ${req.body.subject}`,
      }, ],
      from: {
        email: 'info@bluebulldog.co.uk',
      },
      content: [{
        type: 'text/plain',
        value: `Name: ${req.body.name} - Email: ${req.body.email} Message: ${req.body.message}`
      }]
    }
  });
  sg.API(request)
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
});

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', {
    metaData
  });
});

app.get('/cookie-policy', (req, res) => {
  res.render('cookie-policy', {
    metaData
  });
});

app.get('/website-terms', (req, res) => {
  res.render('website-terms', {
    metaData
  });
});

app.get('/agency-terms', (req, res) => {
  res.render('agency-terms', {
    metaData
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
