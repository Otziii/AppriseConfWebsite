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

    $(".speaker-card").click(function (e) {
        let speakerId = e.currentTarget.id;
        $(".speaker-modal-card").css({"display": "none"});

        if (speakerId) {
            $(".speaker-modal-container").css({"display": "flex"});
            $("." + speakerId).css({"display": "flex"})
        }
    })

    $(".back-arrow").click(function (e) {
        clearModals()
    });

    $(".slot-entry").click(function (e) {
        let talkId = e.currentTarget.id;

        if (talkId) {
            $(".talk-modal-container").css({"display": "flex"});
            $("." + talkId).css({"display": "flex"})
        }
    })

    $(".slot-speaker").click(function (e) {
        let speakerId = e.currentTarget.id;
        clearModals()

        if (speakerId) {
            $(".speaker-modal-container").css({"display": "flex"});
            $("." + speakerId).css({"display": "flex"})
        }
    })

    function clearModals() {
        $(".speaker-modal-container").css({"display": "none"});
        $(".speaker-modal-card").css({"display": "none"});
        $(".talk-modal-container").css({"display": "none"});
    }
});