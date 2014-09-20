
var maxScreenWidth;
var maxScreenHeight;
var padding = 20;
var heightToWidthRatio = 7.0 / 5.0;
var numTotalPics = 163;

$(function() {

    onResize();

    _.each($('.screen'), function(screen) {

        var delay = Math.floor(Math.random() * 10000)
        setTimeout(function() {
            changePicture(screen);
        }, delay);

    });

    $(window).resize(function () {
        onResize();
    });

});

function onResize() {
    var maxScreenHeight = Math.floor(($(window).height() - $('.footer').height() - padding * 6) / 3);
    var maxScreenWidth = Math.floor(maxScreenHeight * heightToWidthRatio);
    var mainContainerWidth = Math.floor(maxScreenWidth * 3 + padding * 4);

    $('.why-main-container').width(mainContainerWidth + 'px');
    $('.screen').width(maxScreenWidth + 'px');
    $('.screen').height(maxScreenHeight + 'px');
}


function changePicture(screen) {

    $(screen).animate({'opacity':'0.0'}, 1000);

    window.setTimeout(function() {
        var picNumber = Math.floor(Math.random() * numTotalPics);
        var pathToPic = '/static/img/why/' + picNumber + '.jpg'
        $(screen).css('background-image', 'url(' + pathToPic + ')');
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