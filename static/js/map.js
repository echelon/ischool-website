/**
 * Google Maps Tour Stops
 * TODO: Backbone this stuff!
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

function initialize() {
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
		atl: [33.7489, -84.3881],
		arkansas: [34.8000, -92.2000],
		austin: [30.2669, -97.7428],
		belton: [31.0558, -97.4642],
		sanan: [29.4239, -98.4933],
		washdc: [38.8900, -77.0300],
		willva: [37.2749, -76.7083],
		melny: [40.7933, -73.4156],
	};

	var tourStops = [];
	var markers = [];

	for(var x in places) {
		var p = places[x];
		places[x] = new google.maps.LatLng(p[0], p[1]);
		tourStops.push(places[x]);
	}

	// Build Stops
	var stops = [];
	for(var i = 0; i < tourStops.length - 2; i++) {
		stops.push({location: tourStops[i+1]});
	}

	var request = {
		origin: tourStops[0],
		destination: tourStops[tourStops.length-1],
		waypoints: stops,
		optimizeWaypoints: false,
		travelMode: google.maps.DirectionsTravelMode.DRIVING,
	};

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

	direc.route(request, function(resp, status) {
    	if (status != google.maps.DirectionsStatus.OK) {
			// TODO VISUAL ERROR PRINTED TO DOM?
			console.log('Couldn\'t query Gmaps API.');
			return;
		}
		direcDisp.setDirections(resp);

		// FIXME: NOT WORKING
		for(var x in places) {
			var m = new google.maps.Marker({
				position: places[x],
				map: map,
				title: 'title',
				draggable: false,
				flat: true, // XXX: ???
			});

			markers.push(m);
		}

		sizeMap();
	});

	/**
	 * Resize events code
	 */
	//google.maps.event.addListener(map, 'bounds_changed', function() {
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

	//google.maps.event.addListener(map, 'center_changed', function() {
	google.maps.event.addListener(map, 'dragend', function() {
		console.log('changed center');
		setTimeout(function() {
			map.panTo(center);
			//map.setCenter(center);
		}, 400);
	});
}

