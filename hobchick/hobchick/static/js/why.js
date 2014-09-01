
var maxScreenWidth;
var maxScreenHeight;
var padding = 20;

$(function() {

    maxScreenWidth = Math.floor(($(window).width() - padding * 6) / 3);
    maxScreenHeight = Math.floor(($(window).height() - $('.footer').height() - padding * 6) / 3);

    $('.screen').width(maxScreenWidth + 'px');
    $('.screen').height(maxScreenHeight + 'px');

    _.each($('.screen'), function(screen) {

        var delay = Math.floor(Math.random() * 10000)
        setTimeout(function() {
            changePicture(screen);
        }, delay);

    });

});


function changePicture(screen) {

    $(screen).animate({'opacity':'0.0'}, 1000);

    window.setTimeout(function() {
            $(screen).css({'background-color': getRandomColor()});
        }, 1000);

    $(screen).animate({'opacity':'1.0'}, 1000);

    window.setTimeout(function() {
            changePicture(screen)
        }, 8000);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}