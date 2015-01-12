
var canvas;
var context;
var canvasScaleFactor;

var defaultOhioYPosition = 665;
var defaultOhioXPosition = 65;

var ohioFinishXPosition = 700;
var ohioFinishYPosition = 390;

var defaultNewYorkXPosition = 780;
var defaultNewYorkYPosition = 640;

var newYorkFinishXPosition = 20;
var newYorkFinishYPosition = 500;

var kevinXPosition;
var kevinYPosition;

var mazeWidth;
var mazeHeight;

var defaultKevWidth = 25;
var defaultKevHeight = 37;

var defaultDanielleWidth = 35;
var defaultDanielleHeight = 35;

var kevWidth;
var kevHeight;

var kevImage;

var currentXSpeedKeyboard = 0;
var currentYSpeedKeyboard = 0;
var currentXSpeedMouse = 0;
var currentYSpeedMouse = 0;
var speedConstant = 6;

var boundarySet;
var winningSet;

var kevinModeActive = false;
var danielleModeActive = false;

var previousMouseX;
var previousMouseY;

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

        ga('send', 'event', 'maze', 'kevin-start');

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

        ga('send', 'event', 'maze', 'danielle-start');

    });

    drawKev();
    handleMovement();
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

    if (debugMode) {
        defaultOhioYPosition = 400;
        defaultOhioXPosition = 650;
    }

    kevinXPosition = Math.round(defaultOhioXPosition * canvasScaleFactor);
    kevinYPosition = Math.round(defaultOhioYPosition * canvasScaleFactor);

    var finishXPosition = Math.round(ohioFinishXPosition * canvasScaleFactor);
    var finishYPosition = Math.round(ohioFinishYPosition * canvasScaleFactor);

    mazeWrapper.css('padding-top', ($(window).height() - mazeHeight - footer.outerHeight()) / 2);

    canvas.width = mazeWidth;
    canvas.height = mazeHeight;

    constructWinningSet(finishXPosition, finishYPosition);

    setUpKeyListeners();
    //setUpMouseListener();

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

    if (debugMode) {
        defaultNewYorkXPosition = 100;
        defaultNewYorkYPosition = 400;
    }

    kevinXPosition = Math.round(defaultNewYorkXPosition * canvasScaleFactor);
    kevinYPosition = Math.round(defaultNewYorkYPosition * canvasScaleFactor);

    var finishXPosition = Math.round(newYorkFinishXPosition * canvasScaleFactor);
    var finishYPosition = Math.round(newYorkFinishYPosition * canvasScaleFactor);

    mazeWrapper.css('padding-top', ($(window).height() - mazeHeight - footer.outerHeight()) / 2);

    canvas.width = mazeWidth;
    canvas.height = mazeHeight;

    constructWinningSet(finishXPosition, finishYPosition);

    setUpKeyListeners();
    //setUpMouseListener();


}

function setUpKeyListeners(){
    var listener = new window.keypress.Listener();

    listener.register_combo({
        "keys" : "up",
        "on_keydown" : function() {
            currentYSpeedKeyboard = -1 * speedConstant;
        },
        "on_keyup" : function() {
            currentYSpeedKeyboard = 0;
        }
    });

    listener.register_combo({
        "keys" : "down",
        "on_keydown" : function() {
            currentYSpeedKeyboard = speedConstant;
        },
        "on_keyup" : function() {
            currentYSpeedKeyboard = 0;
        }
    });

    listener.register_combo({
        "keys" : "left",
        "on_keydown" : function() {
            currentXSpeedKeyboard = -1 * speedConstant;
        },
        "on_keyup" : function() {
            currentXSpeedKeyboard = 0;
        }
    });

    listener.register_combo({
        "keys" : "right",
        "on_keydown" : function() {
            currentXSpeedKeyboard = speedConstant;
        },
        "on_keyup" : function() {
            currentXSpeedKeyboard = 0;
        }
    });

    if (debugMode) {
        listener.register_combo({
            "keys" : "d",
            "on_keydown" : function() {
                danielleWins();
            }
        });

        listener.register_combo({
            "keys" : "k",
            "on_keydown" : function() {
                kevinWins();
            }
        });
    }
}

function setUpMouseListener() {

    $('body').mousemove(function(event) {
       console.log('moved the mouse!');

        if (previousMouseX == undefined && previousMouseY == undefined) {
            previousMouseX = event.pageX;
            previousMouseY = event.pageY;
            console.log('x=' + previousMouseX + ', y=' + previousMouseY);
        }

        if (event.pageX > previousMouseX) {
            currentXSpeedMouse = speedConstant;
        }
        else if (event.pageX < previousMouseX) {
            currentXSpeedMouse = -1 * speedConstant;
        }
        else {
            currentXSpeedMouse = 0;
        }

        if (event.pageY > previousMouseY) {
            currentYSpeedMouse = speedConstant;
        }
        else if (event.pageY < previousMouseY) {
            currentYSpeedMouse = -1 * speedConstant;
        }
        else {
            currentYSpeedMouse = 0;
        }


    });

}

function handleMovement() {
    var potentialX = kevinXPosition + currentXSpeedKeyboard + currentXSpeedMouse;
    var potentialY = kevinYPosition + currentYSpeedKeyboard + currentYSpeedMouse;

    if ((currentXSpeedKeyboard != 0 || currentXSpeedMouse != 0) && canMoveTo(potentialX, kevinYPosition)) {
        kevinXPosition = potentialX;
    }

    if ((currentYSpeedKeyboard != 0 || currentYSpeedMouse != 0) && canMoveTo(kevinXPosition, potentialY)) {
        kevinYPosition = potentialY;
    }

    currentXSpeedMouse = 0;
    currentYSpeedMouse = 0;

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

function makeRed(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "red";
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
    if (debugMode)
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

                if (winningSet[strToCheck] == true) {
                    if (danielleModeActive) {
                        danielleWins();
                    } else {
                        kevinWins();
                    }
                }
                else {
                    console.log('checked ' + strToCheck + ' for victory.');
                }
            }
        }
    }
    else {
        canMove = 0;
    }
    return canMove;
}

function constructWinningSet(finishXPosition, finishYPosition) {
    winningSet = {};
    setTimeout(function() {
        for (var i = finishXPosition - 2; i <= finishXPosition + 2; i++) {
            for (var j = finishYPosition - 2; j <= finishYPosition + 2; j++) {
                winningSet[i + ',' + j] = true;
                if (debugMode) {
                    makeRed(i, j, 1, 1);
                }
            }
        }
    }, 1000);
}

function danielleWins() {

    $('.danielle-wins').show();

}

function kevinWins() {

    $('.kevin-wins').show();

}