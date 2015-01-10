
$(function() {

    $(window).resize(function() {
        onResize();
    });

    onResize();

});

function onResize() {

    var height = $(window).height() - $('.footer').outerHeight();
    $('.what-main').height(height);

}