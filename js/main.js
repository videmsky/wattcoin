// main javascript file

(function() {

	var map = L.map('map', {
		center: [39.50, -98.35],
		zoom: 4
	});

	var tileURL1 = 'http://tile.stamen.com/terrain/{z}/{x}/{y}.png';
	var tileURL2 = 'http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';

	L.tileLayer(tileURL2, {

	}).addTo(map);


	// http://coinmap.org/data/data-overpass-bitcoin.json
	// http://coinmap.org/data/data-overpass-litecoin.json

	// var url = "http://coinmap.org/data/data-overpass-bitcoin.json";
	var path = "/data-overpass-bitcoin.json";

	$.getJSON(path, function(data) {

		var d = data;
		console.log(d[0]);	
		
		$.each(d, function(i, item) {

			var lat = d[i].lat;
			var lng = d[i].lon;
			var latlng = [lat, lng];
			var val = d[i];
			var title = d[i].title;
			var city = d[i].city;
			var web = d[i].web;

			$.each(val, function(k, item) {	

				var cmarker = L.circleMarker(latlng, {
					radius: 8

				}).addTo(map);

				cmarker.on('mouseover', function(e) {
						var popup = L.popup()
							.setLatLng(e.latlng)
							.setContent(title + "<br>" + city);
						map.openPopup(popup);
					})
					.on('mouseout', function(e) {
						map.closePopup();
					});

			});


		});

	});


})();