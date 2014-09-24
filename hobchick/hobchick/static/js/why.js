
var maxScreenWidth;
var maxScreenHeight;
var padding = 20;
var heightToWidthRatio = 7.0 / 5.0;
var numTotalPics = 163;
var picsOnScreenSet;

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

    picsOnScreenSet = {};
    for (var i = 0; i < numTotalPics; i++) {
        picsOnScreenSet[i] = false;
    }

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

        // Get a new random picture to show
        var newPicNumber = getRandomPictureNumberNotCurrentlyVisible();

        // Get the number of the current picture so we can mark it as no longer visible.
        var oldPicNumber = Number($(screen).attr('pic-number'));
        picsOnScreenSet[oldPicNumber] = false;

        // Mark the new picture as visible and save its number to the element
        picsOnScreenSet[newPicNumber] = true;
        $(screen).attr('pic-number', newPicNumber);

        var pathToPic = '/static/img/why/' + newPicNumber + '.jpg';
        $(screen).css('background-image', 'url(' + pathToPic + ')');
    }, 1000);

    $(screen).animate({'opacity':'1.0'}, 1000);

    window.setTimeout(function() {
            changePicture(screen)
        }, 8000);
}

function getRandomPictureNumberNotCurrentlyVisible() {
    while (true) {
        var picNumber = Math.floor(Math.random() * numTotalPics);
        if (picsOnScreenSet[picNumber] == false) {
            return picNumber;
        } else {
            console.log('picture ' + picNumber + ' is already on the screen... trying again.');
        }
    }
}