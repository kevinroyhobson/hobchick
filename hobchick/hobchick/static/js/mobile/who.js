
$(function() {

    var cardWidth = $('.card-wrapper').width();
    var cardHeight = cardWidth * (1/0.727379556);

    // Unless the card height is too big to fit all the buttons and the footer comfortably, in
    // which case we need to shrink the height to fit and then match the width to that height.
    var buttonsHeight = $('.buttons-holder').height();
    var footerHeight = 100;
    var padding = 50;
    var maxCardHeight = $(window).height() - buttonsHeight - footerHeight - padding;
    if (maxCardHeight < cardHeight) {
        cardHeight = maxCardHeight;
        cardWidth = cardHeight * 0.727379556;
    }


    $('.flip-container').width(cardWidth);
    $('.flipper').width(cardWidth);
    $('.front').width(cardWidth);
    $('.back').width(cardWidth);

    $('.flip-container').height(cardHeight);
    $('.flipper').height(cardHeight);
    $('.front').height(cardHeight);
    $('.back').height(cardHeight);

    $('.front, .back, .card-wrapper').css('transition', '1.0s');

    bindCards();

});

function bindCards() {

    $('.kevin-button').click(function() {
        hideCards();
        showCard($('.kevin-card-wrapper'));
        setButton($(this));
    });

    $('.danielle-button').click(function() {
        hideCards();
        showCard($('.danielle-card-wrapper'));
        setButton($(this));
    });

    $('.flip-button').click(function() {
        flip();
    });

}

function hideCards() {
    $('.card-wrapper').css('opacity', '0');
    $('.card-wrapper').css('z-index', '-1');
}

function showCard(cardDiv) {
    returnToCardFronts();
    cardDiv.css('z-index', '0');
    cardDiv.css('opacity', '1');
    $('.flip-button').css('opacity', '1');
}

function setButton(button) {
    $('.button').removeClass('button-selected');
    button.addClass('button-selected');
}

function returnToCardFronts() {
    $('.front').removeClass('flipped');
    $('.back').removeClass('flipped');
}

function flip() {
    $('.front').toggleClass('flipped');
    $('.back').toggleClass('flipped');
}