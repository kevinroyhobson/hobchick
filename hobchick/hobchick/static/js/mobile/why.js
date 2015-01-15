
var maxScreenWidth;
var maxScreenHeight;
var padding = 5;
var heightToWidthRatio = 7.0 / 5.0;
var numTotalPics = 488;
var picsOnScreenSet;

// We cache an image one screen transition before it is supposed to be displayed. This way we never see a loading delay during fade-in.
var cachedImageNumber = 0;
var cachedImage;

$(function() {

    onResize();

    showThanks();

    initializeScreens();

    $(window).resize(function () {
        onResize();
    });

});

function isVertical() {
    var height = $(window).height();
    var width = $(window).width();

    return height > width;
}

function initializeScreens() {
    picsOnScreenSet = {};
    for (var i = 0; i < numTotalPics; i++) {
        picsOnScreenSet[i] = false;
    }

    var delaysArray = [0, 1, 2, 3];
    delaysArray = shuffle(delaysArray);
    delaysArray.push(4);
    delaysArray.push(5);

    // Set up the first picture to be cached.
    cachedImageNumber = getRandomPictureNumberNotCurrentlyVisible();
    cacheImage(cachedImageNumber);

    var delayIndex = 0;
    var screens = isVertical() ? getScreensForVertical() : getScreensForHorizontal();
    _.each(screens, function(screen) {

        var delay = Math.floor(delaysArray[delayIndex] * 1000)
        setTimeout(function() {
            changePicture(screen);
        }, delay);

        delayIndex++;
    });
}

function getScreensForVertical() {
    var screens = $('.screen-1');
    screens.push($('.screen-2'));
    screens.push($('.screen-5'));
    screens.push($('.screen-6'));
    screens.push($('.screen-3'));
    screens.push($('.screen-4'));
    return screens;
}

function getScreensForHorizontal() {
    var screens = $('.screen-1');
    screens.push($('.screen-2'));
    screens.push($('.screen-x-1'));
    screens.push($('.screen-3'));
    screens.push($('.screen-x-2'));
    screens.push($('.screen-4'));
    return screens;
}

function onResize() {

    if (isVertical()) {
        setUpVertical();
    } else {
        setUpHorizontal();
    }

    initializeScreens();
}

function setUpVertical() {

    $('.screen-x-1').hide();
    $('.screen-x-2').hide();
    $('.screen-x-3').hide();

    var footerHeight = 100;
    var maxScreenWidth = Math.floor(($(window).width() - padding * 3) / 2);
    var maxScreenHeight = Math.floor(maxScreenWidth * (1.0/heightToWidthRatio));
    var mainContainerWidth = Math.floor(maxScreenWidth * 2 + padding * 3);
    var pixelsToShoveDown = ($(window).height() - footerHeight - (3*maxScreenHeight) - (4 * padding)) / 2.0;

    $('.why-main-container').width(mainContainerWidth + 'px');
    $('.why-main-container').css('padding-top', pixelsToShoveDown + 'px');
    $('.screen').width(maxScreenWidth + 'px');
    $('.screen').height(maxScreenHeight + 'px');
}

function setUpHorizontal() {

    $('.screen-5').hide();
    $('.screen-6').hide();
    $('.screen-x-3').hide();



    var footerHeight = 100;
    var maxScreenHeight = Math.floor(($(window).height() - footerHeight - padding * 6) / 3);
    var maxScreenWidth = Math.floor(maxScreenHeight * heightToWidthRatio);
    var mainContainerWidth = Math.floor(maxScreenWidth * 2 + padding * 3);

    $('.why-main-container').width(mainContainerWidth + 'px');
    $('.screen').width(maxScreenWidth + 'px');
    $('.screen').height(maxScreenHeight + 'px');
}

function showThanks() {
    $('.screen-4').animate({'opacity':'1.0'}, 1000);

    setTimeout(function() {
        $('.screen-4').animate({'opacity':'0.0'}, 1000);

        setTimeout(function() {
            $('.screen-4').css('margin-left','5px');
        }, 1000);
    }, 4000);
}

function changePicture(screen) {

    $(screen).animate({'opacity':'0.0'}, 1000);

    window.setTimeout(function() {

        // Get the number of the current picture so we can mark it as no longer visible.
        var oldPicNumber = Number($(screen).attr('pic-number'));
        picsOnScreenSet[oldPicNumber] = false;

        // Grab the cached image and throw it in this screen.
        var pathToPic = '/static/img/why/' + cachedImageNumber + '.jpg';
        $(screen).css('background-image', 'url(' + pathToPic + ')');
        $(screen).attr('pic-number', cachedImageNumber);
        //console.log('showing picture' + cachedImageNumber);

        // Cache a new picture.
        var newPicNumber = getRandomPictureNumberNotCurrentlyVisible();
        cacheImage(newPicNumber);

    }, 1000);

    $(screen).animate({'opacity':'1.0'}, 1000);

    window.setTimeout(function() {
            changePicture(screen)
        }, 6000);
}

function cacheImage(pictureNumber) {
  //console.log('precaching image' + pictureNumber);

  cachedImage = new Image();
  cachedImage.src = '/static/img/why/' + pictureNumber + '.jpg';
  cachedImageNumber = pictureNumber;

  picsOnScreenSet[pictureNumber] = true;
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

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}