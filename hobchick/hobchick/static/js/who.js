
$(function() {

    var theCards = $('.baseball-card');
    var cardWidth = $(theCards[0]).width();

    _.each(theCards, function(card) {
        $(card).height(cardWidth * 1.6);
    });

});