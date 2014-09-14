
var canvas;
var context;

var currRectX = 5;
var currRectY = 565;

var mazeWidth = 1091;
var mazeHeight = 783;

var kevWidth = 35;
var kevHeight = 51;

var intervalVar;
var kevImage;

var boundarySet;

$(function() {

    // center the maze
    var mazeWrapper = $('.maze-wrapper');
    var footer = $('.footer');
    mazeWrapper.width(mazeWidth);
    mazeWrapper.css('margin-top', ($(window).height() - mazeWrapper.height() - footer.outerHeight()) / 2);

    canvas = $('.maze-canvas')[0];
    context = canvas.getContext("2d");

    drawMaze();

    // Construct a set of all the black pixels. We'll use it later for boundary checking.
    setTimeout(function() {
        boundarySet = constructBoundarySet();
    }, 50);

    setTimeout(function() {
        drawKev(currRectX, currRectY);
    }, 50);

    window.addEventListener("keydown", moveKev, true);
});

function drawMaze() {

    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0);
    };
    mazeImg.src = "/static/img/how/maze-1.jpg";
}

function drawKev(newX, newY) {

    kevImage = new Image();
    kevImage.onload = function() {
        context.drawImage(kevImage, newX, newY);
    };
    kevImage.src = "/static/img/how/kev-cartoon-small.png";
}

function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
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
        }
    }
    return boundarySet;
}

function moveKev(e) {
    var newX;
    var newY;
    var canMove;
    e = e || window.event;
    switch (e.keyCode) {
        case 38:   // arrow up key
        case 87: // W key
            newX = currRectX;
            newY = currRectY - 3;
            break;
        case 37: // arrow left key
        case 65: // A key
            newX = currRectX - 3;
            newY = currRectY;
            break;
        case 40: // arrow down key
        case 83: // S key
            newX = currRectX;
            newY = currRectY + 3;
            break;
        case 39: // arrow right key
        case 68: // D key
            newX = currRectX + 3;
            newY = currRectY;
            break;
    }
    movingAllowed = canMoveTo(newX, newY);
    if (movingAllowed === 1) {      // 1 means kev can move
        drawMaze();
        drawKev(newX, newY);
        currRectX = newX;
        currRectY = newY;
    }
    else if (movingAllowed === 2) { // 2 means kev reached the end
        clearInterval(intervalVar); // we'll set the timer later in this article
        makeWhite(0, 0, canvas.width, canvas.height);
        context.font = "40px Arial";
        context.fillStyle = "blue";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Congratulations!", canvas.width / 2, canvas.height / 2);
        window.removeEventListener("keydown", moveRect, true);
    }
    else {
        console.log("can't move, that's a wall.");
    }
}

function canMoveTo(destX, destY) {
    var canMove = 1; // 1 means: the rectangle can move

    var topToCheck = destY + Math.floor(kevHeight/4);
    var bottomToCheck = topToCheck + Math.floor(kevHeight/2);
    var leftToCheck = destX + Math.floor(kevWidth/4);
    var rightToCheck = leftToCheck + Math.floor(kevWidth/2);

    // Debug: so you can see the space we're comparing against the boundary
    //makeWhite(leftToCheck, topToCheck, Math.floor(kevWidth/2), Math.floor(kevHeight/2));

    if (destX >= 0 && destX <= mazeWidth - kevWidth/2 && destY >= 0 && destY <= mazeHeight - kevHeight/2) { // check whether the rectangle would move inside the bounds of the canvas
        for (var xToCheck = leftToCheck; xToCheck < rightToCheck; xToCheck++) {
            for (var yToCheck = topToCheck; yToCheck < bottomToCheck; yToCheck++) {

                var strToCheck = xToCheck + ',' + yToCheck;

                if (boundarySet[strToCheck] == true) {
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
