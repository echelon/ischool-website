/**
 * Google Maps Tour Stops
 * TODO: Backbone this stuff!
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
		wisconsin: [44.5000, -89.5000], // #9
		nebraska: [41.2324, -98.4160],
		newmexico: [35.6869, -105.9372],
		iowa: [42.0546, -93.3718],
		oklahoma: [35.5608, -96.8461],
		indiana: [40.0066, -86.2914],
		michigan: [43.6867, -85.0102],
		northdakota: [46.8083, -100.7833],
		utah: [39.5000, -111.5000], // #17
	};

	var tourStops = [];
	var markers = [];

	for(var x in places) {
		var p = places[x];
		places[x] = new google.maps.LatLng(p[0], p[1]);
		tourStops.push(places[x]);
	}


	var tourStopsCopy= tourStops.slice(0);
	var tourBits = []
	while(tourStopsCopy.length) {
		tourBits.push(tourStopsCopy.slice(0, 8));
		for(var i = 0; i < 8; i++) {
			tourStopsCopy.shift();
		}
	}

	// Balance the last two legs. 
	// Last leg must have at least 3 stops.
	if(tourBits.length >= 2) {
		var xl = tourBits[tourBits.length-2];
		var yl = tourBits[tourBits.length-1];
		if(yl.length < 3) {
			for(var i = 0; i < 3; i++) {
				yl.unshift(xl.pop());
			}
		}
	}

	var direc = new google.maps.DirectionsService();
	var direcDisp = new google.maps.DirectionsRenderer({
		map: map,
		suppressInfoWindows: false,
		preserveViewport: true,
		polylineOptions:{
			strokeColor:'#000000',
			strokeOpacity: 0.5,
			strokeWeight: 10,
		},
	});

	/*direc.route(request2, function(resp, status) {
    	if (status != google.maps.DirectionsStatus.OK) {
			// TODO VISUAL ERROR PRINTED TO DOM?
			console.log('Couldn\'t query Gmaps API.');
			return;
		}
		sizeMap();
		console.log('route2');
		//direcDisp.setDirections(resp);
		visualize(resp, false);

	});*/


	/**
	 * Resize events code
	 */
	//google.maps.event.addListener(map, 
	//'bounds_changed', function() {
	var sizeMap = function() {
		//var bounds = map.getBounds();
		var width = $('#maps').width();

		if(width <= BREAKPOINTS.PHONE_PORTRAIT) {
			console.log('phone_portrait')
			map.setZoom(4);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.PHONE_LANDSCAPE) {
			console.log('phone_landscape')
			map.setZoom(4);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.TABLET_PORTRAIT) {
			console.log('tablet_portrait')
			map.setZoom(4);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.TABLET_LANDSCAPE) {
			console.log('tablet_landscape')
			map.setZoom(5);
			map.setCenter(c2);
			center = c2;
		}
		else if(width <= BREAKPOINTS.DESKTOP_REGULAR) {
			console.log('desktop_regular')
			map.setZoom(5);
			map.setCenter(c2);
			center = c2;
		}
		else { // We're at width >= DESKTOP_HUGE
			console.log('desktop_huge')
			map.setZoom(5);
			map.setCenter(c3);
			center = c3;
		}

		console.log(width);
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
				console.log('queried!');
				if (status != google.maps.DirectionsStatus.OK) {
					// TODO: VISUAL ERROR PRINTED TO DOM?
					console.log('Couldn\'t query Gmaps API.');
					return;
				}
				console.log('subroute done');
				visualize(resp, false);
				sizeMap();
			}
		);
	}

	var ROUTE = null;

	// Work in progress route concatenation
	var visualize = function(response, reset) 
	{
		var merge_copyrights = function(copyright) {
		}

		var merge_asdf = function() {
		}

		console.log('VISUALIZE()');

		var route = response.routes[0];
		console.log(route);
		console.log(route.copyrights);

		route.overview_polyline = null;
		route.overview_path = null;
		route.waypoint_order = null;

		console.log(route);

		if(reset || !ROUTE) {
			ROUTE = response;
			direcDisp.setDirections(ROUTE);
			return;
		}

		for(var i = 0; i < route.legs.length; i++) {
			ROUTE.routes[0].legs.push(route.legs[i]);
		}

		direcDisp.setDirections(ROUTE);

	}

	for(var i = 0; i < tourBits.length; i++) {
		querySubroute(tourBits[i]);
	}


}

