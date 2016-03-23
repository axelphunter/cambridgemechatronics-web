'use strict';

var express = require('express'),
	exphbs  = require('express-handlebars'),
	handlebars = require('handlebars'),
	path = require('path'),
	program = require('commander'),
	bodyParser = require('body-parser'),
	validator = require('express-validator'),
	email = require('emailjs'),
	request = require('request-promise'),
	app = express(),

	server  = email.server.connect({
		user: "adamsonberekoff.co.uk",
		password: "",
		host: "smtp.hosts.com",
		ssl: true
	}),
	googlePlaces = {
		url: "https://maps.googleapis.com/maps/api/place/details/json?",
		key: "AIzaSyDkwhiEd4Vv4a_iaogXdtnVOdklk75VRWc",
		placeid: "ChIJcdltBJRw2EcRs7ibwO4KaMM",
		data: {}
	};

function Server(portNo, debugMode) {

	portNo = portNo || 3000;

	var appDir = path.join(__dirname, debugMode ? '/app' : '/dist');

	app.set('views', path.join(appDir, '/views'));

	app.engine('.hbs', exphbs({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: path.join(appDir, '/views/layouts'),
		partialsDir: path.join(appDir, '/views/partials'),
		helpers: {
			stars: function() { return new handlebars.SafeString(Array(6).join("<img src='/img/icons/star.svg' />")); }
		}
	}));
	app.set('view engine', '.hbs');

	var appPaths = {
			//root : path.resolve(appDir),
			js : path.resolve(appDir, 'js'),
			css : path.resolve(appDir, 'css'),
			img : path.resolve(appDir, 'img'),
			bower: path.resolve(appDir, 'bower_components')
		},
		staticOpts = {
			etag      : debugMode ? false : true,
			lastModified  : debugMode ? false : true,
			maxAge      : 0
		};

	app.use('/js', express.static(appPaths.js, staticOpts));
	app.use('/css', express.static(appPaths.css, staticOpts));
	app.use('/img', express.static(appPaths.img, staticOpts));
	app.use('/bower_components', express.static(appPaths.bower, staticOpts));

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(validator());

	// routes
	app.get('/', function (req, res) {

		var url = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDkwhiEd4Vv4a_iaogXdtnVOdklk75VRWc&placeid=ChIJcdltBJRw2EcRs7ibwO4KaMM';

		request({uri: url, json: true}).then(function(data){
				googlePlaces.data = data;
				res.render('home', {
					places: googlePlaces.data
				});
			})
			.catch(function(){
				res.render('home', {
					places: googlePlaces.data
				});
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

		var url = 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDkwhiEd4Vv4a_iaogXdtnVOdklk75VRWc&placeid=ChIJcdltBJRw2EcRs7ibwO4KaMM';

		request({uri: url, json: true}).then(function(data){
				googlePlaces.data = data;
				res.render('contact', {
					places: googlePlaces.data,
					loadMap:true,
					helpers: {
						stars: function(stars) {
							return Array(stars + 1).join("<img src='/img/icons/star.svg' />");
						}
					}
				});
			})
			.catch(function(){
				res.render('contact', {
					places: googlePlaces.data,
					loadMap:true
				});
			});
	});

	app.post('/contact', function (req, res) {

		req.checkBody("name", "Enter your name").isAlpha();
		req.checkBody("email", "Enter a valid email address.").isEmail();
		req.checkBody("telephone", "Enter a valid telephone number.").optional().isNumeric();

		var errors = req.validationErrors();
		if (errors) {
			res.render('contact', { errors: errors });
			return;
		} else {
			var message = {
				text:    "Contact from adamsonberekoff.co.uk",
				from:    "Info info@adamsonberekoff.co.uk",
				to:      "Info info@adamsonberekoff.co.uk, Jamie jamie@adamsonberekoff.co.uk",
				subject: "Adamson Berekoff website contact form",
				attachment:
					[
						{
							data:"<html>" +
							"<p>Contact from adamsonberekoff.co.uk</p>" +
							"<ul>" +
							"<li>Date - "+new Date()+"</li>" +
							"<li>Name - "+req.body.name+"</li>" +
							"<li>Email - "+req.body.email+"</li>" +
							"<li>Telephone - "+req.body.telephone+"</li>" +
							"</ul>" +
							"<p>Message:</p>" +
							"<p>"+req.body.message+"</p>" +
							"</html>",
							alternative:true
						}
					]
			};

			server.send(message, function(err, message) {
				if(!err) {
					res.render('contact', {email: true});
				}
				else {
					res.render('contact', {
						errors: {
							msg: "Whoops something went wrong. Wait a few minutes and try again."
						}
					});
				}
			});
		}
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