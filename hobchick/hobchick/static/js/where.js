
var _fallingWaterLocation = L.latLng(39.906560, -79.467913);
var _lgaLocation = L.latLng(40.77591055, -73.872799873);

$(function() {
    initializeMap();
    $('.footer').css('border-top', '1px dotted grey');
    onResize();
    $(window).resize(function() {
        onResize();
    });
});

function onResize() {
    var canvas = $('#mapbox-map');
    var footerHeight = $('.footer').outerHeight();
    canvas.height($(window).height() - footerHeight);
}

function initializeMap() {

    L.mapbox.accessToken = 'pk.eyJ1Ijoia2V2aW5yb3lob2Jzb24iLCJhIjoiRmpkMTJoNCJ9.Ki1Wowu9Y_CvTp0cQk4iBg';
    var map = L.mapbox.map('mapbox-map', 'kevinroyhobson.k618jbcp')
      .setView(_fallingWaterLocation, 7);

    var marker = L.marker(_lgaLocation, {
        icon: L.mapbox.marker.icon({
          iconUrl: 'https://www.mapbox.com/maki/renders/airport-24@2x.png',
          iconSize: [24, 24],
        })
    });

    var t = 0;
    window.setInterval(function() {

        var nycPlaneCoordinates = marker.getLatLng();

        var overallDistance = _lgaLocation.distanceTo(_fallingWaterLocation);

        


    }, 50);

    marker.addTo(map);

}



