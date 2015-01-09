

function onResize() {

    var theCards = $('.baseball-card');

    var windowHeight = $(window).height();
    var cardHeight = windowHeight * .8;
    var cardWidth = cardHeight * 0.727379556;

    $('.flip-container').width(cardWidth);
    $('.flipper').width(cardWidth);
    $('.front').width(cardWidth);
    $('.back').width(cardWidth);



    $('.flip-container').height(cardHeight);
    $('.flipper').height(cardHeight);
    $('.front').height(cardHeight);
    $('.back').height(cardHeight);

}

$(function() {

    $(window).resize(function() {
        onResize();
    });

    onResize();
});