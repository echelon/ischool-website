/**
 * Google Maps Tour Stops
 * TODO: Backbone this stuff!
 * TODO: Organize and cleanup!
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

// Resize breakpoints -- may need to move to main.js
BREAKPOINTS = {
	PHONE_PORTRAIT: 479, // < 480
	PHONE_LANDSCAPE: 599, // 480 - 599
	TABLET_PORTRAIT: 768, // 600 - 768
	TABLET_LANDSCAPE: 1024, // 769 - 1024
	DESKTOP_REGULAR: 1280, // 1025 - 1280
	// DESKTOP_HUGE >= 1281
}

/*
	PLACE		  DATES				NAME
	Atlanta, GA   6/15 - 6/16       DLR Tour Kick Off
	Arkansas      6/17 - 6/20       Schools without walls
	Austin, TX    6/18 - 6/19       iPad Palooza
	Belton, TX    6/20 - 6/21       Belton district
	San AntonioTX 6/22 - 6/26       ISTE
	Wash, DC      6/30 - 7/3        Natl Alliance for 
									Public Charter Schools
	Williamsburg, VA 7/9 - 7/10     Visions to Practice
	Melvil, NY    10/21 - 10/22     Eastern Suffolk Boces
*/

function initialize() 
{
	var c1 = new google.maps.LatLng(39.000, -95.000); // kansas
	var c2 = new google.maps.LatLng(35.8490, -86.2272); // tenn
	var c3 = new google.maps.LatLng(35.5608, -96.8461); // oklahoma

	var center = c1;

	var mapOptions = {
		center: new google.maps.LatLng(39.000, -95.000),
		zoom: 4,
		disableDefaultUI: true,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		disableDoubleClickZoom: true,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	// New post-Google IO design
	google.maps.visualRefresh = true;

	// I believe removing the 'report error' link falls within
	// Google's usage terms. If they tell us no, we can revert
	// back. <http://stackoverflow.com/a/11625444>
	var styleOptions = {
		name: 'No Report Error',
	};

	var MAP_STYLE = [{
		featureType: 'road',
		elementType: 'all',
		stylers: [
			{ visibility: 'on' }
		]
	}];

	var map = new google.maps.Map(
		document.getElementById('maps'),
		mapOptions);

	var mapType = new google.maps.StyledMapType(MAP_STYLE, 
		styleOptions);

	map.mapTypes.set('No Report Error', mapType);
	map.setMapTypeId('No Report Error');

	//position: map.getCenter(),

	// XXX: Only allowed to have 8 waypoints in Google Maps free API
	var places = {
		atl: [33.7489, -84.3881], // #1
		arkansas: [34.8000, -92.2000],
		austin: [30.2669, -97.7428],
		belton: [31.0558, -97.4642],
		sanan: [29.4239, -98.4933],
		washdc: [38.8900, -77.0300], // #6 (F)
		willva: [37.2749, -76.7083],// #7 (G)
		melny: [40.7933, -73.4156], // #8 (H)
		//
		// TEST DATA ONLY:
		/*wisconsin: [44.5000, -89.5000], // #9 I
		nebraska: [41.2324, -98.4160], // J
		newmexico: [35.6869, -105.9372], // K
		iowa: [42.0546, -93.3718], // L
		oklahoma: [35.5608, -96.8461], // M
		indiana: [40.0066, -86.2914], // N
		michigan: [43.6867, -85.0102], // O
		northdakota: [46.8083, -100.7833], // P
		utah: [39.5000, -111.5000], // Q #17*/
	};

	var tourStops = [];
	var markers = [];

	for(var x in places) {
		var p = places[x];
		places[x] = new google.maps.LatLng(p[0], p[1]);
		tourStops.push(places[x]);
	}


	var tourStopsCopy= tourStops.slice(0);
	var tourBits = [];

	// Build the tour "legs" to query.
	tourBits.push(_.first(tourStopsCopy, 8));
	tourStopsCopy = _.rest(tourStopsCopy, 8);
	while(tourStopsCopy.length) {
		var f = _.last(_.last(tourBits))
		tourBits.push([f].concat(_.first(tourStopsCopy, 7)));
		tourStopsCopy = _.rest(tourStopsCopy, 7);
	}

	// Balance the last two "legs". 
	// Last leg must have at least 3 stops.
	if(tourBits.length >= 2) {
		var xl = tourBits[tourBits.length-2];
		var yl = tourBits[tourBits.length-1];
		if(yl.length < 3) {
			for(var i = 0; i < 3; i++) {
				yl.unshift(xl.pop());
			}
		}
		// FIXME: yl.unshift(_.last(xl));
	}


	var direc = new google.maps.DirectionsService();
	var direcDisp = new google.maps.DirectionsRenderer({
		map: map,
		suppressInfoWindows: false,
		suppressMarkers: true,
		preserveViewport: true,
		polylineOptions:{
			strokeColor:'#000000',
			strokeOpacity: 0.2,
			strokeWeight: 4,
		},
	});

	/**
	 * Resize events code
	 */
	//google.maps.event.addListener(map, 
	//'bounds_changed', function() {
	var sizeMap = function() {
		//var bounds = map.getBounds();
		var width = $('#maps').width();

		if(width <= BREAKPOINTS.PHONE_PORTRAIT) {
			//console.log('phone_portrait')
			map.setZoom(4);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.PHONE_LANDSCAPE) {
			//console.log('phone_landscape')
			map.setZoom(4);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.TABLET_PORTRAIT) {
			//console.log('tablet_portrait')
			map.setZoom(4);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.TABLET_LANDSCAPE) {
			//console.log('tablet_landscape')
			map.setZoom(5);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.DESKTOP_REGULAR) {
			//console.log('desktop_regular')
			map.setZoom(5);
			map.setCenter(c2);
			center = c2;
		}
		else { // We're at width >= DESKTOP_HUGE
			//console.log('desktop_huge')
			map.setZoom(5);
			map.setCenter(c3);
			center = c3;
		}
		//console.log(width);
	}
	$(window).on('resize', sizeMap);

	//google.maps.event.addListener(map, 
	//'center_changed', function() {
	google.maps.event.addListener(map, 'dragend', function() {
		console.log('changed center');
		setTimeout(function() {
			map.panTo(center);
			//map.setCenter(center);
		}, 400);
	});

	var querySubroute = function(subroute, i) 
	{
		var direc = new google.maps.DirectionsService(),
			start = subroute[0],
			end = subroute[subroute.length-1],
			waypoints = subroute.slice(1, -1);

		for(var i = 0; i < waypoints.length; i++) {
			waypoints[i] = {location: waypoints[i]};
		}

		direc.route({
				origin: start,
				destination: end,
				waypoints: waypoints,
				optimizeWaypoints: false,
				travelMode: google.maps.DirectionsTravelMode.DRIVING,
			}, 
			function(resp, status) {
				if (status != google.maps.DirectionsStatus.OK) {
					// TODO: VISUAL ERROR PRINTED TO DOM?
					console.log('Couldn\'t query Gmaps API.');
					return;
				}
				visualize(resp, false);
				sizeMap();
			}
		);
	}

	// Trying to get labels working...
	var infoWindow = new google.maps.InfoWindow({ 
		content: '<h1><b>Title</b></h1>Text String Goes Here',
		disableAutoPan: true,
	});

	var ROUTE = null;

	// Work in progress route concatenation
	var visualize = function(response, reset) 
	{
		var merge_copyrights = function(copyright) {
			// TODO
		}

		var merge_asdf = function() {
		}

		var route = response.routes[0];

		console.log(response);

		route.overview_polyline = null;
		route.overview_path = null;
		route.waypoint_order = null;

		// Make markers
		for(var i = 0; i < route.legs.length; i++) {
			var mark = new google.maps.Marker({
				position: route.legs[i].start_location,
				draggable: false,
				clickable: true,
				flat: true,
				map: map,
				//title: 'this is the onhover tooltip title' + i,
				title: 'Tour Stop', // TODO Actual Title
				zIndex: 90000, // render above result markers
				visible: true,
			});

			markers.push(mark);

			/*google.maps.event.addListener(mark, 'click', 
					function(event) {
				infoWindow.setContent(mark.getTitle());
				//infoWindow.setContent('<h1>Foo</h1>Bar');
				infoWindow.setPosition(event.latLng);
				infoWindow.open(map);
			});*/
		}

		if(reset || !ROUTE) {
			ROUTE = response;
			direcDisp.setDirections(ROUTE);
			return;
		}

		// Merge the result sets
		for(var i = 0; i < route.legs.length; i++) {
			ROUTE.routes[0].legs.push(route.legs[i]);
		}

		direcDisp.setDirections(ROUTE);
	}

	for(var i = 0; i < tourBits.length; i++) {
		querySubroute(tourBits[i]);
	}
}

