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

		var m = new google.maps.Marker({
			position: places[x],
			map: map,
			title: 'title',
		});

		markers.push(m);
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
		polylineOptions:{
			strokeColor:'#000000',
			strokeOpacity: 0.5,
			strokeWeight: 10,
		},
	});

	direc.route(request, function(resp, status) {
		direcDisp.setDirections(resp);
	});
}


