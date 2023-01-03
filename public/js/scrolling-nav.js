//jQuery for page scrolling feature - requires jQuery Easing plugin
$(document).ready(function (e) {
    // Open ws on launch
    if (window.document.URL.includes("ws=true")) {
        $('#day-1').addClass("active in")
        $('#day-2').removeClass("active in")

        $('#tab-day-1').addClass("active")
        $('#tab-day-2').removeClass("active")
    }
});

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1200, 'easeInOutExpo');
        event.preventDefault();
    });
});
