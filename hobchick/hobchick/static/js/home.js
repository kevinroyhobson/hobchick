$(function() {
    setTimeout(function() {

        var marginLeft = $('.hobson-column').width() - $('.hob-name-start').width() - 10;
        var marginRight = $('.sanchick-column').width() - $('.chick-name-start').width() - 10;

        $('.son-name-start').animate({opacity: '0'}, 1500);
        $('.san-name-start').animate({opacity: '0'}, 1500);
        $('.hobson-column').animate({marginLeft: marginLeft + 'px' }, 2000);
        $('.sanchick-column').animate({marginRight: marginRight + 'px' }, 2000);
    }, 1000)}

);