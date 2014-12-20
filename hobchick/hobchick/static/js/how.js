
var canvas;
var context;
var canvasScaleFactor;

var defaultKevinXPosition = 0; // todo: when I set this to (5, 565), like I want to, everything breaks and I can walk through walls. Weird.
var defaultKevinYPosition = 0;

var kevinXPosition;
var kevinYPosition;

var mazeWidth; // = 1091;
var mazeHeight; // = 783;

var defaultKevWidth = 35
var defaultKevHeight = 51;

var kevWidth;
var kevHeight;

var intervalVar;
var kevImage;

var currentXSpeed = 0;
var currentYSpeed = 0;
var speedConstant = 6;

var boundarySet;

var debugMode = false;

$(function() {

    // center the maze
    var mazeWrapper = $('.maze-wrapper');
    var footer = $('.footer');

    canvas = $('.maze-canvas')[0];
    context = canvas.getContext("2d");

    drawMaze();

    mazeWidth = $('.maze-wrapper').width();
    mazeHeight = mazeWidth * 0.717;

    canvasScaleFactor = mazeWidth / 1091;

    kevWidth = defaultKevWidth * canvasScaleFactor;
    kevHeight = defaultKevHeight * canvasScaleFactor;

    kevinXPosition = defaultKevinXPosition * canvasScaleFactor;
    kevinYPosition = defaultKevinYPosition * canvasScaleFactor;

    mazeWrapper.css('margin-top', ($(window).height() - mazeHeight - footer.outerHeight()) / 2);

    canvas.width = mazeWidth;
    canvas.height = mazeHeight;

    setTimeout(function() {
        boundarySet = constructBoundarySet();
        drawKev();
        handleMovement();
    }, 100);

    setUpKeyListeners();
});

function setUpKeyListeners(){
    var listener = new window.keypress.Listener();

    listener.register_combo({
        "keys" : "up",
        "on_keydown" : function() {
            currentYSpeed = -1 * speedConstant;
        },
        "on_keyup" : function() {
            currentYSpeed = 0;
        }
    });

    listener.register_combo({
        "keys" : "down",
        "on_keydown" : function() {
            currentYSpeed = speedConstant;
        },
        "on_keyup" : function() {
            currentYSpeed = 0;
        }
    });

    listener.register_combo({
        "keys" : "left",
        "on_keydown" : function() {
            currentXSpeed = -1 * speedConstant;
        },
        "on_keyup" : function() {
            currentXSpeed = 0;
        }
    });

    listener.register_combo({
        "keys" : "right",
        "on_keydown" : function() {
            currentXSpeed = speedConstant;
        },
        "on_keyup" : function() {
            currentXSpeed = 0;
        }
    });

}

function handleMovement() {
    var potentialX = kevinXPosition + currentXSpeed;
    var potentialY = kevinYPosition + currentYSpeed;

    if (currentXSpeed != 0 && canMoveTo(potentialX, kevinYPosition)) {
        kevinXPosition = potentialX;
    }

    if (currentYSpeed != 0 && canMoveTo(kevinXPosition, potentialY)) {
        kevinYPosition = potentialY;
    }

    setTimeout(function() {
        handleMovement();
    }, 50);
}

function drawMaze() {

    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0, mazeWidth, mazeHeight);
    };
    mazeImg.src = "/static/img/how/maze-1.jpg";
}

function drawKev() {

    if (!debugMode) {
        drawMaze();
    }

    kevImage = new Image();
    kevImage.onload = function() {
        context.drawImage(kevImage, kevinXPosition, kevinYPosition, kevWidth, kevHeight);
    };
    kevImage.src = "/static/img/how/kev-cartoon-small.png";

    setTimeout(function() {
        drawKev();
    }, 50);
}

function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}

function makeGreen(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "green";
    context.fill();
}

function constructBoundarySet() {
    var boundarySet = {};
    var imgData = context.getImageData(0, 0, mazeWidth, mazeHeight);
    var data = imgData.data;

    for (var i = 0; i < 4 * mazeWidth * mazeHeight; i += 4) {
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black

            var index = i / 4;
            var y = Math.floor(index / mazeWidth);
            var x = index - (y * mazeWidth);

            boundarySet[x + ',' + y] = true;
            if (debugMode) {
                makeGreen(x, y, 1, 1);
            }
        }
    }
    return boundarySet;
}

function canMoveTo(x, y) {
    var canMove = 1; // 1 means: the rectangle can move

    var topToCheck = y + Math.floor(kevHeight/4);
    var bottomToCheck = topToCheck + Math.floor(kevHeight/2);
    var leftToCheck = x + Math.floor(kevWidth/4);
    var rightToCheck = leftToCheck + Math.floor(kevWidth/2);

    // Debug: so you can see the space we're comparing against the boundary
    if (debugMode == true)
    {
        makeWhite(leftToCheck, topToCheck, Math.floor(kevWidth/2), Math.floor(kevHeight/2));
    }
    if (x >= 0 && x <= mazeWidth - kevWidth/2 && y >= 0 && y <= mazeHeight - kevHeight/2) { // check whether the rectangle would move inside the bounds of the canvas
        for (var xToCheck = leftToCheck; xToCheck < rightToCheck; xToCheck++) {
            for (var yToCheck = topToCheck; yToCheck < bottomToCheck; yToCheck++) {

                var strToCheck = xToCheck + ',' + yToCheck;

                if (boundarySet[strToCheck] == true) {
                    console.log("that's a wall");
                    return 0; // there's a pixel that overlaps with a boundary -- we can't move here.
                }
                else if (false) {
                    // add a check here for if you won
                    canMove = 2; // 2 means you win.
                }
            }
        }
    }
    else {
        canMove = 0;
    }
    return canMove;
}
