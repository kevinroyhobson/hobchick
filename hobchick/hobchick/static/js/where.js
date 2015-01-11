
var _fallingwaterLocation = L.latLng(39.906230, -79.467922);
var _barnLocation = L.latLng(39.906607, -79.460282);
var _sevenSpringsLocation = L.latLng(40.023137, -79.297773);
var _laurelHighlandsToursLocation = L.latLng(39.871145, -79.492621);
var _kentuckKnobLocation = L.latLng(39.872380, -79.523123);

var _lgaLocation = L.latLng(40.77591055, -73.872799873);
var _cvgLocation = L.latLng(39.055584, -84.661873);
var _cmhLocation = L.latLng(40.000597, -82.887260);
var _bosLocation = L.latLng(42.366059, -71.009642);
var _bdlLocation = L.latLng(41.939222, -72.685979);
var _sdfLocation = L.latLng(38.176064, -85.736836);
var _ordLocation = L.latLng(41.974455, -87.907194);
var _iadLocation = L.latLng(38.851540, -77.040170);

var _pitLocation = L.latLng(40.496179, -80.241419);

var _centerOfMap = L.latLng((_kentuckKnobLocation.lat + _sevenSpringsLocation.lat) / 2,
                            (_kentuckKnobLocation.lng + _sevenSpringsLocation.lng) / 2);

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

var _stepsUntilZoom = 460;

var _stepsToPopMarkers = 499;

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
      .setView(_centerOfMap, 7);

    var startingBounds = L.latLngBounds([_cvgLocation, _lgaLocation]);
    //_map.fitBounds(startingBounds);

    _.each(_planes, function(plane) {
        initializePlane(plane);
    });

    setTimeout(function() {
        movePlanesRecursively();
    }, _secondsToWaitBeforePlanesMove * 1000);

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

    if (_numCurrentPlaneSteps == _stepsUntilZoom) {
        centerAndZoom();
    }

    if (_numCurrentPlaneSteps == _stepsToPopMarkers) {
        setTimeout(function() {
            addFallingwaterPointsOfInterest();
        }, 250);
    }
}

function movePlane(plane) {
    var newLatLng = computeNewLatLngForPlane(plane);
    var newPlaneAngle = computeNewAngleForPlane(plane, newLatLng);

    plane.marker.options.angle = newPlaneAngle;
    plane.marker.setLatLng(newLatLng);
}

function computeNewLatLngForPlane(plane) {
    var latitudeStep = (_fallingwaterLocation.lat - plane.startingLocation.lat) / _totalPlaneSteps;
    var longitudeStep = (_fallingwaterLocation.lng - plane.startingLocation.lng) / _totalPlaneSteps;

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
    _map.panTo(_centerOfMap);

    if (newZoomLevel >= 12) {
        shouldKeepZooming = false;
    }

    if (shouldKeepZooming) {
        setTimeout(function() {
            centerAndZoom();
        }, 15);
    }
}

var _fallingwaterPoi;
var _barnPoi;
var _sevenSpringsPoi;
var _laurelHighlandsToursPoi;
var _kentuckKnobPoi;

function addFallingwaterPointsOfInterest() {

    _barnPoi = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                _barnLocation.lng,
                _barnLocation.lat
            ]
        },
        properties: {
            title: 'The Barn at Fallingwater',
            description: "Originally built in 1870, the Barn at Fallingwater was purchased by Fallingwater owner Edgar J. Kaufmann in 1940 and operated as a dairy farm. It became a nature center after being entrusted to the Western Pennsylvania Conservancy in 1963, and has been used as an administrative and event space since being renovated in 2002.<br/><br/>Kevin and Danielle's ceremony and reception will be held here.<br/><br/><a target='_blank' href='http://www.fallingwater.org/49/about-the-barn-at-fallingwater'>Information</a>&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://maps.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&geocode=KROB5TsGNDWIMXuGpBdfLPl-&daddr=The%20Barn%20at%20Fallingwater,%20Mill%20Run%20Road,%20Mill%20Run,%20PA&sa=X&ei=AcSiVNHGHJLOgwT7n4PADg&ved=0CI0BEPUXMA4&output=classic&dg=brw'>Directions</a>",
            'marker-size': 'medium',
            'marker-color': '#a51e2d',
            'marker-symbol': 'farm',
            'zIndexOffset': 1
        }
    });
    _barnPoi.addTo(_map);

    _fallingwaterPoi = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                _fallingwaterLocation.lng,
                _fallingwaterLocation.lat
            ]
        },
        properties: {
            title: 'Fallingwater',
            description: "Frank Lloyd Wright's masterpiece was built for the Kaufmann family in 1939. Sited over a waterfall on Bear Run, the house features a dramatic use of cantilevers and demonstrates Wright's \"organic\" style of architecture by engaging the surrounding natural elements.<br/><br/>Fallingwater served as the Kaufmann's country home until 1963 when it was entrusted to the Western Pennsylvania Conservancy. The house is a National Historic Landmark and tours are available to the public.<br/><br/><a target='_blank' href='http://www.fallingwater.org/'>Information</a>&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://maps.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&geocode=KTHneU33MzWIMbiaCnnTKxZu&daddr=Fallingwater,%201491%20Mill%20Run%20Road,%20Mill%20Run,%20Pennsylvania%2015464&sa=X&ei=useiVL78E8WZgwTl44DoAw&ved=0CJcBEPUXMA8&output=classic&dg=brw'>Directions</a>",
            'marker-size': 'medium',
            'marker-color': '#222222',
            'marker-symbol': 'star'
        }
    });
    _fallingwaterPoi.addTo(_map);

    _sevenSpringsPoi = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                _sevenSpringsLocation.lng,
                _sevenSpringsLocation.lat
            ]
        },
        properties: {
            title: 'Seven Springs',
            description: "Ski Resort by winter, golf course by summer. Guests will find a block of rooms reserved at this resort along with several bars, restaurants & outdoor activities.<br/><br/><a target='_blank' href='http://www.7springs.com/lodging/hotel/'>Information</a>&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://maps.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&geocode=KTHneU33MzWIMbiaCnnTKxZu&daddr=Ski%20View%20Ave,%20Seven%20Springs,%20PA&sa=X&ei=useiVL78E8WZgwTl44DoAw&ved=0CJcBEPUXMA8&output=classic&dg=brw'>Directions</a>",
            'marker-size': 'medium',
            'marker-color': '#222222',
            'marker-symbol': 'lodging'
        }
    });
    _sevenSpringsPoi.addTo(_map);

    _laurelHighlandsToursPoi = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                _laurelHighlandsToursLocation.lng,
                _laurelHighlandsToursLocation.lat
            ]
        },
        properties: {
            title: 'Laurel Highlands River Tours and Outdoor Center',
            description: "Zip-lining, mountain biking, rock climbing, white water rafting and kayaking in beautiful Ohiopyle State Park.<br/><br/><a target='_blank' href='http://www.laurelhighlands.com/activities/'>Information</a>&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://maps.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&geocode=KTHneU33MzWIMbiaCnnTKxZu&daddr=4+Sherman+St,+Ohiopyle,+PA+15470&sa=X&ei=useiVL78E8WZgwTl44DoAw&ved=0CJcBEPUXMA8&output=classic&dg=brw'>Directions</a>",
            'marker-size': 'medium',
            'marker-color': '#222222',
            'marker-symbol': 'ferry'
        }
    });
    _laurelHighlandsToursPoi.addTo(_map);

    _kentuckKnobPoi = L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                _kentuckKnobLocation.lng,
                _kentuckKnobLocation.lat
            ]
        },
        properties: {
            title: 'Kentuck Knob',
            description: 'While focusing on many other projects including the Guggenheim Museum in New York, the 86-year-old Wright "shook [Kentuck Knob] out of his sleeves."<br/><br/><a target="_blank" href="http://kentuckknob.com/">Information</a>&nbsp;&nbsp;&nbsp;<a target="_blank" href="https://maps.google.com/maps?um=1&ie=UTF-8&fb=1&gl=us&geocode=KTHneU33MzWIMbiaCnnTKxZu&daddr=723+Kentuck+Rd,+Dunbar,+PA+15431&sa=X&ei=useiVL78E8WZgwTl44DoAw&ved=0CJcBEPUXMA8&output=classic&dg=brw">Directions</a>',
            'marker-size': 'medium',
            'marker-color': '#222222',
            'marker-symbol': 'star'
        }
    });
    _kentuckKnobPoi.addTo(_map);

    _barnPoi.bringToFront();

    setTimeout(function() {
        _barnPoi.openPopup();
    }, 2000);
}
