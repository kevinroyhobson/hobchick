

function onResize() {

    var theCards = $('.baseball-card');

    var windowHeight = $(window).height() - $('.footer').height();
    var cardHeight = windowHeight * .90;
    var cardWidth = cardHeight * 0.727379556;

    $('.flip-container').width(cardWidth);
    $('.flipper').width(cardWidth);
    $('.front').width(cardWidth);
    $('.back').width(cardWidth);

    $('.flip-container').height(cardHeight);
    $('.flipper').height(cardHeight);
    $('.front').height(cardHeight);
    $('.back').height(cardHeight);

    var columnEmptySpaceWidth = Math.floor(($(window).width()/2) - cardWidth);
    var pixelsToPushKevinRight = (5/6) * columnEmptySpaceWidth;
    var pixelsToPushDanielleLeft = (1/6) * columnEmptySpaceWidth;

    $('.kevin-card-holder').css('padding-left', pixelsToPushKevinRight + 'px');
    $('.danielle-card-holder').css('padding-left', pixelsToPushDanielleLeft + 'px');
}

$(function() {

    $(window).resize(function() {
        onResize();
    });

    onResize();
});