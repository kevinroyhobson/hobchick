
var maxScreenWidth;
var maxScreenHeight;
var padding = 10;
var heightToWidthRatio = 7.0 / 5.0;
var numTotalPics = 388;
var picsOnScreenSet;

// We cache an image one screen transition before it is supposed to be displayed. This way we never see a loading delay during fade-in.
var cachedImageNumber = 0;
var cachedImage;

$(function() {

    onResize();

    showThanks();

    setTimeout(function() {
        initializeScreens();
    }, 1500);

    $(window).resize(function () {
        onResize();
    });

});

function initializeScreens() {
    picsOnScreenSet = {};
    for (var i = 0; i < numTotalPics; i++) {
        picsOnScreenSet[i] = false;
    }

    var delaysArray = [0, 1, 2, 3, 4, 5, 6, 7];
    delaysArray = shuffle(delaysArray);
    delaysArray.push(8);

    // Set up the first picture to be cached.
    cachedImageNumber = getRandomPictureNumberNotCurrentlyVisible();
    cacheImage(cachedImageNumber);

    var delayIndex = 0;
    var screens = $('.non-center-screen');
    screens.push($('.screen-5'));
    _.each(screens, function(screen) {

        var delay = Math.floor(delaysArray[delayIndex] * 1000)
        setTimeout(function() {
            changePicture(screen);
        }, delay);

        delayIndex++;
    });
}

function onResize() {
    var maxScreenHeight = Math.floor(($(window).height() - $('.footer').height() - padding * 6) / 3);
    var maxScreenWidth = Math.floor(maxScreenHeight * heightToWidthRatio);
    var mainContainerWidth = Math.floor(maxScreenWidth * 3 + padding * 4);

    $('.why-main-container').width(mainContainerWidth + 'px');
    $('.screen').width(maxScreenWidth + 'px');
    $('.screen').height(maxScreenHeight + 'px');
}

function showThanks() {
    $('.screen-5').animate({'opacity':'1.0'}, 1000);
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
        }, 9000);
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