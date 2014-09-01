
$(function() {
    initializeMap();
});

function initializeMap() {

    var styleArray = [
     {
       "featureType": "landscape.natural",
       "elementType": "geometry.fill",
       "stylers": [
         { "gamma": 0.57 },
         { "hue": "#ff9100" },
         { "saturation": -100 },
         { "lightness": 100 }
       ]
     },{
       "featureType": "water",
       "elementType": "geometry.fill",
       "stylers": [
         { "saturation": 100 },
         { "hue": "#0019ff" },
         { "gamma": 0.36 },
         { "lightness": 14 }
       ]
     },{
       "featureType": "poi.park",
       "stylers": [
         { "color": "#dfe8d8" },
         { "saturation": -26 },
         { "gamma": 1.66 },
         { "lightness": -16 }
       ]
     },{
       "featureType": "road.arterial",
       "elementType": "geometry.fill",
       "stylers": [
         { "gamma": 1 },
         { "invert_lightness": true },
         { "lightness": 41 }
       ]
     },{
       "featureType": "road.arterial",
       "elementType": "geometry.stroke",
       "stylers": [
         { "invert_lightness": true },
         { "lightness": 27 },
         { "gamma": 0.25 }
       ]
     },{
       "featureType": "road.arterial",
       "stylers": [
         { "invert_lightness": true }
       ]
     },{
       "featureType": "poi.park",
       "elementType": "labels.text.fill",
       "stylers": [
         { "saturation": 100 },
         { "hue": "#11ff00" },
         { "gamma": 0.01 }
       ]
     },{
       "featureType": "road.arterial",
       "elementType": "labels.text.fill",
       "stylers": [
         { "lightness": -100 },
         { "gamma": 0.01 },
         { "visibility": "off" }
       ]
     },{
       "featureType": "road.local",
       "elementType": "geometry.fill",
       "stylers": [
         { "saturation": -100 },
         { "gamma": 1.18 },
         { "visibility": "on" },
         { "lightness": -26 }
       ]
     },{
       "featureType": "road.highway",
       "elementType": "geometry.fill",
       "stylers": [
         { "saturation": -100 },
         { "visibility": "on" },
         { "lightness": -56 }
       ]
     },{
       "featureType": "road.highway",
       "elementType": "geometry",
       "stylers": [
         { "saturation": -100 },
         { "visibility": "on" },
         { "lightness": 12 }
       ]
     },{
       "featureType": "road.highway",
       "elementType": "labels.text.fill",
       "stylers": [
         { "visibility": "simplified" }
       ]
     },{
       "featureType": "poi.school",
       "elementType": "geometry.fill",
       "stylers": [
         { "hue": "#fff700" },
         { "saturation": -58 },
         { "lightness": 83 }
       ]
     },{
       "featureType": "poi.place_of_worship",
       "elementType": "geometry.fill",
       "stylers": [
         { "saturation": -100 },
         { "lightness": 43 }
       ]
     },{
       "featureType": "poi.business",
       "elementType": "labels.icon",
       "stylers": [
         { "hue": "#ff0900" },
         { "saturation": 96 },
         { "gamma": 0.51 }
       ]
     },{
       "featureType": "administrative.neighborhood",
       "elementType": "geometry.fill",
       "stylers": [
         { "lightness": 99 },
         { "hue": "#ff0000" },
         { "saturation": 100 }
       ]
     }
    ];

    var mapOptions = {
      center: new google.maps.LatLng(39.966333, -79.383484),
      zoom: Number(12),
      styles: styleArray,
      disableDefaultUI: true
    };

    var canvas = $('#map-canvas');
    canvas.height(canvas.height() - 100);
    var map = new google.maps.Map(canvas[0], mapOptions);


    // Fallingwater marker
    var fallingwater = new google.maps.Marker({
      position: new google.maps.LatLng(39.906543, -79.467870),
      map: map,
      title: 'Fallingwater'
    });

    // The Barn at Fallingwater marker
    var barn = new google.maps.Marker({
      position: new google.maps.LatLng(39.906987, -79.460188),
      map: map,
      title: 'The Barn at Fallingwater'
    });

    // Seven Springs marker
    var barn = new google.maps.Marker({
      position: new google.maps.LatLng(40.021732, -79.294234),
      map: map,
      title: 'Seven Springs Mountain Resort'
    });






  }