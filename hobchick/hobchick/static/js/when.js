

$(function() {

    var wedding = new Date(2015, 6, 4, 17, 0, 0, 0);
    var now = new Date();

    var secondsTillTheWedding = (wedding.getTime() - now.getTime()) / 1000;

    // Put a leading zero on the clock if we're less than 100 days from the wedding.
    callbacks = new Object();
    callbacks.start = function() {
      if(secondsTillTheWedding < (3600 * 24 * 100)) {
        leading_zero = $('ul.flip').first().clone();
        leading_zero.find('li.flip-clock-active').removeClass('flip-clock-active');
        leading_zero.find('li.flip-clock-before').removeClass('flip-clock-before');
        leading_zero.find('.inn').html('0');

        $('span.days').after(leading_zero);
      }
    }


    var clock = $('.clock').FlipClock(secondsTillTheWedding, {
        clockFace: 'DailyCounter',
        countdown: true,
        callbacks: callbacks
    });
});