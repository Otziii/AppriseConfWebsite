$(document).ready(function (e) {
    let menuOpen = false;

    $("#hamburger").click(function (e) {
        if (menuOpen === false) {
            $(".top-menu").animate({
                top: "60px"
            }, 200)
            menuOpen = true;
        } else if (menuOpen === true) {
            $(".top-menu").animate({
                top: "-600px"
            }, 200)
            menuOpen = false
        }
    });

    $(".top-menu-list a").click(function (e) {
        if (menuOpen === true) {
            $(".top-menu").animate({
                top: "-600px"
            }, 200)
            menuOpen = false
        }
    });
});