
var canvas;
var context;
var canvasScaleFactor;

var defaultOhioXPosition = 65;
var defaultOhioYPosition = 665;

var defaultNewYorkXPosition = 780;
var defaultNewYorkYPosition = 640;

var kevinXPosition;
var kevinYPosition;

var mazeWidth;
var mazeHeight;

var defaultKevWidth = 25;
var defaultKevHeight = 37;

var defaultDanielleWidth = 25;
var defaultDanielleHeight = 25;

var kevWidth;
var kevHeight;

var kevImage;

var currentXSpeed = 0;
var currentYSpeed = 0;
var speedConstant = 6;

var boundarySet;

var kevinModeActive = false;
var danielleModeActive = false;

var debugMode = false;

$(function() {

    $('.kevin-head').click(function() {

        $('.selection').hide();
        $('.kevin-maze-instructions').show('fast');

        disableDrawingPeople();

        initKevinMaze();

        setTimeout(function() {
            constructBoundarySet();
            enableDrawingKevin();
        }, 100);

    });

    $('.danielle-head').click(function() {

        $('.selection').hide();
        $('.danielle-maze-instructions').show('fast');

        disableDrawingPeople();

        initDanielleMaze();

        setTimeout(function() {
            constructBoundarySet();
            enableDrawingDanielle();
        }, 100);

    });

    drawKev();
    handleMovement();

    setUpKeyListeners();
});

function disableDrawingPeople() {
    kevinModeActive = false;
    danielleModeActive = false;
}

function enableDrawingKevin() {
    kevinModeActive = true;
    danielleModeActive = false;
}

function enableDrawingDanielle() {
    kevinModeActive = false;
    danielleModeActive = true;
}

function initKevinMaze() {

    // center the maze
    var mazeWrapper = $('.maze-wrapper');
    var footer = $('.footer');

    canvas = $('.maze-canvas')[0];
    context = canvas.getContext("2d");

    drawOhioMaze();

    mazeHeight = $('.maze-wrapper').height();
    mazeWidth = Math.round(mazeHeight / 1.093495935);

    canvasScaleFactor = mazeHeight / 807;

    kevWidth = defaultKevWidth * canvasScaleFactor;
    kevHeight = defaultKevHeight * canvasScaleFactor;

    kevinXPosition = Math.round(defaultOhioXPosition * canvasScaleFactor);
    kevinYPosition = Math.round(defaultOhioYPosition * canvasScaleFactor);

    mazeWrapper.css('padding-top', ($(window).height() - mazeHeight - footer.outerHeight()) / 2);

    canvas.width = mazeWidth;
    canvas.height = mazeHeight;

}

function initDanielleMaze() {

    // center the maze
    var mazeWrapper = $('.maze-wrapper');
    var footer = $('.footer');

    canvas = $('.maze-canvas')[0];
    context = canvas.getContext("2d");

    drawNewYorkMaze();

    mazeHeight = $('.maze-wrapper').height();
    mazeWidth = Math.round(mazeHeight * 1.31061599);

    canvasScaleFactor = mazeHeight / 763;

    kevWidth = defaultDanielleWidth * canvasScaleFactor;
    kevHeight = defaultDanielleHeight * canvasScaleFactor;

    kevinXPosition = Math.round(defaultNewYorkXPosition * canvasScaleFactor);
    kevinYPosition = Math.round(defaultNewYorkYPosition * canvasScaleFactor);

    mazeWrapper.css('padding-top', ($(window).height() - mazeHeight - footer.outerHeight()) / 2);

    canvas.width = mazeWidth;
    canvas.height = mazeHeight
}

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
    if (kevinModeActive) {
        drawOhioMaze();
    }
    if (danielleModeActive) {
        drawNewYorkMaze();
    }
}

function drawOhioMaze() {
    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0, mazeWidth, mazeHeight);
    };
    mazeImg.src = "/static/img/how/ohio-maze.jpg";
}

function drawNewYorkMaze() {
    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0, mazeWidth, mazeHeight);
    };
    mazeImg.src = "/static/img/how/new-york-maze.jpg";
}

function drawKev() {

    if (kevinModeActive || danielleModeActive) {

        if (!debugMode) {
            drawMaze();
        }

        kevImage = new Image();
        kevImage.onload = function() {
            context.drawImage(kevImage, kevinXPosition, kevinYPosition, kevWidth, kevHeight);
        };

        if (kevinModeActive) {
            kevImage.src = "/static/img/how/kevin-head-small.png";
        }
        else if (danielleModeActive) {
            kevImage.src = "/static/img/how/danielle-head-small.png";
        }
    }

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
    boundarySet = {};
    var imgData = context.getImageData(0, 0, mazeWidth, mazeHeight);
    var data = imgData.data;

    // If the point at 0,0 is black... then the image must not have loaded yet. Let's check back in a few ms.
    if (pixelIsBlack(0, data)) {
        setTimeout(function() {
            constructBoundarySet();
        }, 10);
        console.log('image not loaded yet... punting on constructing boundary set.');
        return;
    }

    console.log('okay, constructing boundary set now.');

    for (var i = 0; i < 4 * mazeWidth * mazeHeight; i += 4) {
        if (pixelIsBlack(i, data)) {

            var index = i / 4;
            var y = Math.floor(index / mazeWidth);
            var x = index - (y * mazeWidth);

            boundarySet[x + ',' + y] = true;
            if (debugMode) {
                makeGreen(x, y, 1, 1);
            }
        }
    }
}

function pixelIsBlack(index, imageData) {
    return imageData[index] < 100 && imageData[index + 1] < 100 && imageData[index + 2] < 100; // "black
}

function canMoveTo(x, y) {
    var canMove = 1; // 1 means: the rectangle can move

    var topToCheck = y + Math.floor((3.0 / 8.0) * kevHeight);
    var bottomToCheck = topToCheck + Math.floor(kevHeight/4.0);
    var leftToCheck = x + Math.floor((3.0 / 8.0) * kevWidth);
    var rightToCheck = leftToCheck + Math.floor(kevWidth/4.0);

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
