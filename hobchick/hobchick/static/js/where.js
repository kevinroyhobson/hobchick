
$(function() {
    initializeMap();
    $('.footer').css('border-top', '1px dotted grey');
    onResize();
    $(window).resize(function() {
        onResize();
    });
});

function onResize() {
    var canvas = $('#map-canvas');
    var footerHeight = $('.footer').outerHeight();
    canvas.height($(window).height() - footerHeight);
}

function initializeMap() {

    var styleArray =
    [
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
     },
     {
       "featureType": "all",
       "elementType": "all",
       "stylers": [
         { "visibility": 'off' }
       ]
     },
     {
       "featureType": "administrative",
       "elementType": "geometry.stroke",
       "stylers": [
         { "visibility": 'on' },
         { "weight": 2 },
         { "color": '#000000' }
       ]
     },
     {
       "featureType": "water",
       "elementType": "geometry.fill",
       "stylers": [
         { "saturation": 50 },
         { "hue": "#0019ff" },
         { "gamma": 0.36 },
         { "lightness": 14 },
         { 'visibility': 'on' }
       ]
     }
    ];


    // Fallingwater
    var fallingwaterLocation = new google.maps.LatLng(39.906362,- 79.467943);

    var mapOptions = {
      center: new google.maps.LatLng(39.975015, -79.367005),
      zoom: Number(7),
      styles: styleArray,
      disableDefaultUI: true
    };

    var canvas = $('#map-canvas');
    var map = new google.maps.Map(canvas[0], mapOptions);

    // icons
    var goldStar = '/static/img/where/star.png';



    // Cincy
    var cincyMarker = new google.maps.Marker({
        position: new google.maps.LatLng(39.109817,-84.511009),
        icon: goldStar,
        map: map
    });

    // Cbus
    var cbusMarker = new google.maps.Marker({
        position: new google.maps.LatLng(39.971858,-82.99701),
        icon: goldStar,
        map: map
    });

    // Ithaca
    var ithacaMarker = new google.maps.Marker({
        position: new google.maps.LatLng(42.445375,-76.50185),
        icon: goldStar,
        map: map
    });

    // Brooklyn
    var brooklynMarker = new google.maps.Marker({
        position: new google.maps.LatLng(40.69001,-73.945649),
        icon: goldStar,
        map: map
    });

    //setTimeout(function() {
        //zoomIn(map);
    //}, 3500);

    makeFeaturesVisible(map);








  }

  function zoomIn(map) {
    var zoomSpeed = 300;

    map.setZoom(map.getZoom() + 1);

    setTimeout(function() {
        map.setZoom(map.getZoom() + 1);
    }, zoomSpeed);

    setTimeout(function() {
        map.setZoom(map.getZoom() + 1);
    }, zoomSpeed * 2);

    setTimeout(function() {
        map.setZoom(map.getZoom() + 1);
    }, zoomSpeed * 3);

    setTimeout(function() {
        map.setZoom(map.getZoom() + 1);
    }, zoomSpeed * 4);

    setTimeout(function() {
        makeFeaturesVisible(map);
    }, zoomSpeed * 2);

  }



  function makeFeaturesVisible(map) {

       console.log(map.data.getStyle());

       map.data.setStyle({
       "featureType": "water",
       "elementType": "geometry.fill",
       "stylers": [
         { "saturation": 100 },
         { 'visibility': 'off' }
       ]
     });

     setPennsylvaniaMarkers(map);
  }










  function setPennsylvaniaMarkers(map) {

    var rings = '/static/img/where/rings.png';
    var hotel = '/static/img/where/hotel.png';

    // The Barn at Fallingwater marker
    var barn = new google.maps.Marker({
      position: new google.maps.LatLng(39.906987, -79.460188),
      map: map,
      title: 'The Barn at Fallingwater',
      icon: rings
    });

    // Seven Springs marker
    var barn = new google.maps.Marker({
      position: new google.maps.LatLng(40.021732, -79.294234),
      map: map,
      title: 'Seven Springs Mountain Resort',
      icon: hotel
    });
  }




