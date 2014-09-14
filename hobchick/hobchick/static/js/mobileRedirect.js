
if (screen.width <= 500 && window.location.href.search('/m/' == -1)) {
    window.location = 'm' + window.location.pathname;
}