function initialize() {

    var styleArray = [
      {
        featureType: "all",
        stylers: [
          { saturation: 100 }
        ]
      }
     ];

    var mapOptions = {
      center: new google.maps.LatLng(39.910131, -79.467915),
      zoom: 14,
      styles: styleArray,
      disableDefaultUI: true
    };

    var canvas = $('#map-canvas');
    canvas.height(canvas.height() - 100);
    var map = new google.maps.Map(canvas[0], mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);