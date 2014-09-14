
var canvas;
var context;
var currRectX = 425;
var currRectY = 3;
var mazeWidth = 1091;
var mazeHeight = 783;
var intervalVar;

$(function() {

    // center the maze
    var mazeWrapper = $('.maze-wrapper');
    var footer = $('.footer');
    mazeWrapper.width(mazeWidth);
    mazeWrapper.css('margin-top', ($(window).height() - mazeWrapper.height() - footer.outerHeight()) / 2);

    canvas = $('.maze-canvas')[0];
    context = canvas.getContext("2d");

    drawMazeAndRectangle(425, 3);
});




function drawMazeAndRectangle(rectX, rectY) {
    //makeWhite(0, 0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function () { // when the image is loaded, draw the image, the rectangle and the circle
        context.drawImage(mazeImg, 0, 0);
        drawRectangle(rectX, rectY, "#0000FF", false, true);
        context.beginPath();
        context.arc(542, 122, 7, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();
    };
    mazeImg.src = "/static/img/how/maze-1.jpg";
}

function drawRectangle(x, y, style) {
    //makeWhite(currRectX, currRectY, 15, 15);
    currRectX = x;
    currRectY = y;
    context.beginPath();
    context.rect(x, y, 15, 15);
    context.closePath();
    context.fillStyle = style;
    context.fill();
}

