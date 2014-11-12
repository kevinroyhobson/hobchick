
var _fallingWaterLocation = L.latLng(39.906560, -79.467913);
var _lgaLocation = L.latLng(40.77591055, -73.872799873);
var _cvgLocation = L.latLng(39.055584, -84.661873);
var _cmhLocation = L.latLng(40.000597, -82.887260);
var _bosLocation = L.latLng(42.366059, -71.009642);
var _bdlLocation = L.latLng(41.939222, -72.685979);
var _sdfLocation = L.latLng(38.176064, -85.736836);
var _ordLocation = L.latLng(41.974455, -87.907194);
var _iadLocation = L.latLng(38.851540, -77.040170);

var _pitLocation = L.latLng(40.496179, -80.241419);

var newYorkPlane = {
    "startingLocation": _lgaLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": 30000
};

var cincinnatiPlane = {
    "startingLocation": _cvgLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": -20000
};

var columbusPlane = {
    "startingLocation": _cmhLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": 50000
};

var bostonPlane = {
    "startingLocation": _bosLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": 30000
}

var hartfordPlane = {
    "startingLocation": _bdlLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": -30000
}

var louisvillePlane = {
    "startingLocation": _sdfLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": 30000
}

var chicagoPlane = {
    "startingLocation": _ordLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": 30000
}

var washingtonPlane = {
    "startingLocation": _iadLocation,
    "numTotalSteps": 400,
    "latitudeJitterCoefficient": 30000
}

var _planes = [ newYorkPlane,
                cincinnatiPlane,
                columbusPlane,
                bostonPlane,
                hartfordPlane,
                louisvillePlane,
                chicagoPlane,
                washingtonPlane];

var _maxPlaneSteps = 1000;

var _map;

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
    _map = L.mapbox.map('mapbox-map', 'kevinroyhobson.k618jbcp')
      .setView(_fallingWaterLocation, 7);

    _.each(_planes, function(plane) {
        initializePlane(plane);
    });

    setTimeout(function() {
        movePlanesRecursively();
    }, 400);
}

function initializePlane(plane) {
    plane.marker = L.marker(plane.startingLocation, {
        icon: L.mapbox.marker.icon({
          iconUrl: 'https://www.mapbox.com/maki/renders/airport-24@2x.png',
          iconSize: [24, 24],
        })
    });
    plane.marker.addTo(_map);
}


var _numCurrentPlaneSteps = 0;

function movePlanesRecursively() {

    _.each(_planes, function(plane) {
        if (_numCurrentPlaneSteps < plane.numTotalSteps) {
            movePlane(plane);
        }
    });

    _numCurrentPlaneSteps++;

    if (_numCurrentPlaneSteps < _maxPlaneSteps) {
        setTimeout(function() {
            movePlanesRecursively();
        }, 10);
    }
}

function movePlane(plane) {
    var newLatLng = computeNewLatLngForPlane(plane);
    plane.marker.setLatLng(newLatLng);
}

function computeNewLatLngForPlane(plane) {
    var latitudeStep = (_fallingWaterLocation.lat - plane.startingLocation.lat) / plane.numTotalSteps;
    var longitudeStep = (_fallingWaterLocation.lng - plane.startingLocation.lng) / plane.numTotalSteps;

    var latitudeJitterForCurve = ((plane.numTotalSteps / 2.0) - _numCurrentPlaneSteps) / plane.latitudeJitterCoefficient;

    return L.latLng(plane.marker.getLatLng().lat + latitudeStep + latitudeJitterForCurve,
                    plane.marker.getLatLng().lng + longitudeStep);
}



