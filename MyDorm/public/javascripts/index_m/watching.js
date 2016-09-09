function loadWatchingText() {
    $(".text-update").css("stroke-dashoffset", "250");
    $(".text-update")
        .animate({strokeDashoffset: "0"}, 4000)
        .delay(1000)
        .animate({strokeDashoffset: "-250"}, 1000)
    ;
}

function watchingReload() {
    function getTimeFromFile(fName) {
        "use strict";
        return fName.substring(17, 17) + "000000";
    }
    console.log("watchingReload~");
    $.ajax({
        url: "/currentWatchingImgLocation",
        success: function(data) {
            $(".watching-img")
                .fadeOut(200, function() {
                    $(".watching-img").attr("src", data);
                })
                .fadeIn(300);
            $(".watching-time")
                .fadeOut(200, function() {
                    $(".watching-time").html(getTimeFromFile(data));
                })
                .fadeIn(300);
            loadWatchingText();
            if ($(".subtitle").html() == "Watching")
                setTimeout("watchingReload()", 7000);
        }
    });
}

function setWatching() {
    var
        bottom =
            parseFloat($('.watching-pc').css('height')) * 0.327 +
            parseFloat($('.watching-pc').css('bottom'));
    $('.watching-img').css('bottom', bottom + 'px');


    if (window.screen.availWidth > window.screen.availHeight) { //横屏
        $('.watching-pc').css('width', 'auto');
        $('.watching-pc').css('height', 'calc(95% - 90px)');
        $('.watching-img').css('height', '41.6%');
        $('.watching-img').css('width', 'auto');
        $('.watching-img').css('left', '6%');

    }
    else { // 竖屏
        $('.watching-pc').css('width', '95%');
        $('.watching-pc').css('height', 'auto');
        $('.watching-img').css('height', 'auto');
        $('.watching-img').css('width', '87%');
        $('.watching-img').css('left', '8%');

    }
}
