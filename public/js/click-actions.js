$(document).ready(function (e) {
    var menuopen = false;

    $("#hamburger").click(function (e) {
        if (menuopen === false) {
            $(".top-menu").animate({
                top: "60px"
            }, 200)
            menuopen = true;
        } else if (menuopen === true) {
            $(".top-menu").animate({
                top: "-600px"
            }, 200)
            menuopen = false
        }
    });

    $(".top-menu-list a").click(function (e) {
        if (menuopen === true) {
            $(".top-menu").animate({
                top: "-600px"
            }, 200)
            menuopen = false
        }
    });
});