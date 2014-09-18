
var menuOpen = false;

$(function() {

    $('.burger').click(function() {
        handleBurgerClick();
     });

     $('body').click(function(e) {
        if ($(e.target).parents('.mobile-footer').length == 0) {
            closeBurgerMenu();
        }
     });

});

function handleBurgerClick() {

    if (menuOpen) {
        closeBurgerMenu();
    } else {
        openBurgerMenu();
    }

}

function openBurgerMenu() {
    $('.burger').addClass('burger-open');
    $('body').addClass('smb-open');

    menuOpen = true;
}

function closeBurgerMenu() {
    $('.burger').removeClass('burger-open');
    $('body').removeClass('smb-open');

    menuOpen = false;
}