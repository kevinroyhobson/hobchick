
$(function() {

    var cardWidth = $('.card-wrapper').width();
    var cardHeight = cardWidth * (1/0.727379556);

    var verticalPadding = ($(window).height() - cardHeight) / 6;

    $('.flip-container').width(cardWidth);
    $('.flipper').width(cardWidth);
    $('.front').width(cardWidth);
    $('.back').width(cardWidth);

    $('.flip-container').height(cardHeight);
    $('.flipper').height(cardHeight);
    $('.front').height(cardHeight);
    $('.back').height(cardHeight);

    $('.flip-container').css('padding-top', verticalPadding + 'px');
    $('.front, .back').css('transition', '1.0s');

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
    $('.card-wrapper').hide();
    $('.card-wrapper').css('opacity', '0');
}

function showCard(cardDiv) {
    returnToCardFronts();
    cardDiv.show();
    cardDiv.css('opacity', '1');
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