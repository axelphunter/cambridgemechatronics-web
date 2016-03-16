'use strict';

var express = require('express'),
	exphbs  = require('express-handlebars'),
	path = require('path'),
	program = require('commander'),
	app = express();

function Server(portNo, debugMode) {

	portNo = portNo || 3000;

	var appDir = path.join(__dirname, debugMode ? '/app' : '/dist');

	app.set('views', path.join(appDir, '/views'));
	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: path.join(appDir, '/views/layouts'),
		partialsDir: path.join(appDir, '/views/partials')
	}));
	app.set('view engine', '.hbs');

	var appPaths = {
			//root : path.resolve(appDir),
			js : path.resolve(appDir, 'js'),
			css : path.resolve(appDir, 'css'),
			img : path.resolve(appDir, 'img')
		},
		staticOpts = {
			etag      : debugMode ? false : true,
			lastModified  : debugMode ? false : true,
			maxAge      : 0
		};

	app.use('/js', express.static(appPaths.js, staticOpts));
	app.use('/css', express.static(appPaths.css, staticOpts));
	app.use('/img', express.static(appPaths.img, staticOpts));

	// routes
	app.get('/', function (req, res) {
		res.render('home', {
			title: 'REVOLUTIONISING HAIRDRESSING IN CAMBRIDGE',
			subTitle: 'WELCOME TO ADAMSON BEREKOFF'
		});
	});

	app.get('/services', function (req, res) {
		res.render('services');
	});

	app.get('/team', function (req, res) {
		res.render('team');
	});

	app.get('/gallery', function (req, res) {
		res.render('gallery', {
			title: 'Home'
		});
	});

	app.get('/contact', function (req, res) {
		res.render('contact',
			{
				loadMap: true
			});

	});

	app.post('/contact', function (req, res) {
		res.render('contact');
	});

	app.listen(portNo, function () {
		console.log('Example app listening on port ' + portNo + '!');
	});
}

// if running from the command line, pass in params
if (!module.parent){

	// setup command line args
	program.version('0.0.1')
		.option('-d, --debug', 'run the app in debug mode')
		.option('-p, --port <integer>', 'http port number')
		.parse(process.argv);


	// start the server
	new Server(program.port, program.debug);
}

module.exports = Server;