
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
    "latitudeJitterCoefficient": 30000
};

var cincinnatiPlane = {
    "startingLocation": _cvgLocation,
    "latitudeJitterCoefficient": -20000
};

var columbusPlane = {
    "startingLocation": _cmhLocation,
    "latitudeJitterCoefficient": 50000
};

var bostonPlane = {
    "startingLocation": _bosLocation,
    "latitudeJitterCoefficient": 30000
}

var hartfordPlane = {
    "startingLocation": _bdlLocation,
    "latitudeJitterCoefficient": -30000
}

var louisvillePlane = {
    "startingLocation": _sdfLocation,
    "latitudeJitterCoefficient": 30000
}

var chicagoPlane = {
    "startingLocation": _ordLocation,
    "latitudeJitterCoefficient": 30000
}

var washingtonPlane = {
    "startingLocation": _iadLocation,
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

var _totalPlaneSteps = 500;
var _planeAnimationSeconds = 4.0;
var _secondsToWaitBeforePlanesMove = 0.75;

var _startDisappearingAtStepNumber = 450;
var _planesAreVisible = true;

var _secondsUntilZoom = 5.5;

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
    }, _secondsToWaitBeforePlanesMove * 1000);

    setTimeout(function() {
        centerAndZoom();
    }, _secondsUntilZoom * 1000);
}

function initializePlane(plane) {
    plane.marker = L.rotatedMarker(plane.startingLocation, {
        icon: L.icon({
          iconUrl: 'https://www.mapbox.com/maki/renders/airport-24@2x.png',
          iconSize: [48, 48],
        })
    });
    plane.marker.addTo(_map);

    // Set the initial angle properly by moving it one step
    movePlane(plane);
}


var _numCurrentPlaneSteps = 0;

function movePlanesRecursively() {

    _.each(_planes, function(plane) {
        if (_numCurrentPlaneSteps < _totalPlaneSteps) {
            movePlane(plane);
        }
    });

    _numCurrentPlaneSteps++;

    var timeTillNextMovement = _planeAnimationSeconds * 1000 / _totalPlaneSteps;
    if (_numCurrentPlaneSteps < _totalPlaneSteps) {
        setTimeout(function() {
            movePlanesRecursively();
        }, timeTillNextMovement);
    }

    if (_numCurrentPlaneSteps >= _startDisappearingAtStepNumber && _planesAreVisible) {
        fadePlanes();
    }
}

function movePlane(plane) {
    var newLatLng = computeNewLatLngForPlane(plane);
    var newPlaneAngle = computeNewAngleForPlane(plane, newLatLng);

    plane.marker.options.angle = newPlaneAngle;
    plane.marker.setLatLng(newLatLng);
}

function computeNewLatLngForPlane(plane) {
    var latitudeStep = (_fallingWaterLocation.lat - plane.startingLocation.lat) / _totalPlaneSteps;
    var longitudeStep = (_fallingWaterLocation.lng - plane.startingLocation.lng) / _totalPlaneSteps;

    var latitudeJitterForCurve = ((_totalPlaneSteps / 2.0) - _numCurrentPlaneSteps) / plane.latitudeJitterCoefficient;

    return L.latLng(plane.marker.getLatLng().lat + latitudeStep + latitudeJitterForCurve,
                    plane.marker.getLatLng().lng + longitudeStep);
}

function computeNewAngleForPlane(plane, newLatLng) {

    var xDelta = newLatLng.lng - plane.marker.getLatLng().lng;
    var yDelta = newLatLng.lat - plane.marker.getLatLng().lat;

    var angleInRadians = Math.atan2(yDelta, xDelta);
    var angleInDegrees = angleInRadians * 180 / Math.PI;

    // Correction for the stupid way the rotated marker works.
    angleInDegrees = 450 - angleInDegrees;

    //console.log('xDelta = ' + xDelta + ', yDelta = ' + yDelta + ', angle = ' + angleInDegrees);

    return angleInDegrees;
}

function fadePlanes() {
    _.each(_planes, function(plane) {
        var newOpacity = plane.marker.options.opacity - .02;
        plane.marker.setOpacity(newOpacity);

        if (newOpacity <= 0.0) {
            _planesAreVisible = false;
        }
    });
}

function centerAndZoom() {
    var shouldKeepZooming = true;
    var newZoomLevel = _map.getZoom() + 1;
    _map.setZoom(newZoomLevel);

    if (newZoomLevel >= 12) {
        shouldKeepZooming = false;
    }

    if (shouldKeepZooming) {
        setTimeout(function() {
            centerAndZoom();
        }, 15);
    }
}