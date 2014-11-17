
$(function() {

    var theCards = $('.baseball-card');

    var windowWidth = $(window).width();
    var cardWidth = windowWidth * 0.25;

    $('.flip-container').width(cardWidth);
    $('.flipper').width(cardWidth);
    $('.front').width(cardWidth);
    $('.back').width(cardWidth);



    $('.flip-container').height(cardWidth * 1.6);
    $('.flipper').height(cardWidth * 1.6);
    $('.front').height(cardWidth *1.6);
    $('.back').height(cardWidth *1.6);



});