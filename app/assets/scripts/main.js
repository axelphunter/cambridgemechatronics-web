var app = {

	init: function() {
		var openMenu = new Hammer(document.querySelector('.open')),
			closeMenu = new Hammer(document.querySelector('.close')),
			body = new Hammer(document.querySelector('body')),
			wrapper = document.querySelector('.wrap');
		openMenu.on('tap', function(ev) {
			wrapper.classList.add('active');
		});
		closeMenu.on('tap', function(ev) {
			wrapper.classList.remove('active');
		});
		body.on('swipeleft swiperight', function(ev) {
			if(ev.type === 'swiperight' && !wrapper.classList.contains('active')) {
				wrapper.classList.add('active')
			}
			else if(ev.type === 'swipeleft' && wrapper.classList.contains('active')) {
				wrapper.classList.remove('active');
			}
		});

		if(document.querySelector('.errors') !== null) {
			setTimeout(function() {
				document.querySelector('.errors').classList.add('hide');
			}, 5000);
		}

	},

	loadMap: function() {
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 17,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(52.2074739,0.1259373), // New York

				disableDefaultUI: true,
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				scaleControl: false,

				// How you would like to style the map.
				// This is where you would paste any style found on Snazzy Maps.
				styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
			};

			// Get the HTML DOM element that will contain your map
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('map');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			var icon = {
				url: "/img/marker.svg", // url
			};

			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(52.2074739,0.1259373),
				map: map,
				icon: icon,
				animation: google.maps.Animation.DROP
			});
	}

};

app.init();