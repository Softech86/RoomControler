function watchingCallFunc() {

    $('.watching-pc').animate({left: '+=100%'}, 500);
    $('.watching-img').delay(500).animate({opacity: '1'}, 200);

    for (var i in $('.watching-tip')) {
        $('.watching-tip').eq(i).delay(i * 50).animate({right: '+=240px'}, 500);
    }

}

function watchingLeaveFunc() {
    console.log('wlf');

    $('.watching-pc').animate({left: '-=100%'}, 500);
    $('.watching-img').css('opacity', '0');

    for (var i in $('.watching-tip')) {
        $('.watching-tip').eq(i).delay(i * 50).animate({right: '-=240px'}, 500);
    }
}

function watchingCallBackFunc() {
    // all have
    if ($(".title .subtitle").html() == 'Watching') {
        return;
    }

    // all except home
    $(".title .title").css("line-height", "35px");
    $(".title .subtitle").fadeOut(100, function(){changeSbt('Watching')}).fadeIn(300);

    // only watching
    setWatching();
    watchingReload();
}

function loadWatchingText() {
    $(".text-update").css("stroke-dashoffset", "250");
    $(".text-update")
        .animate({strokeDashoffset: "0"}, 4000)
        .delay(1000)
        .animate({strokeDashoffset: "-250"}, 1000)
    ;
}

function watchingReload() {
    $.ajax({
        url: "/currentWatchingData",
        success: function(data) {
            console.log("watchingReload~", data);

            $(".watching-img")
                .fadeOut(200, function() {
                    $(".watching-img").attr("src", data.path);
                })
                .fadeIn(300);
            $(".watching-time")
                .fadeOut(200, function() {
                    $(".watching-time").html(data.updateTime);
                })
                .fadeIn(300);
            $(".watching-electric").html(data.electric);
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
