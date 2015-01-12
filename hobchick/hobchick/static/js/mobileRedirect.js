
setTimeout(function() {

    //alert('screen.width = ' + screen.width + ', pathname = ' + window.location.pathname);

    if (screen.width <= 500 && window.location.pathname.indexOf('/m/') != 0) {
        //window.location = 'm' + window.location.pathname;
    }

}, 50);