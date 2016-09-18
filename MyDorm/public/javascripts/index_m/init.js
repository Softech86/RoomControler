function init(title) {
    setPage();
    $(window).resize(function() {
        console.log('window resize');
        setPage();
    });


    setReadyPositionBeforeTab();
    var
        callFunc = {
            0: homeCallFunc,
            1: watchingCallFunc,
            2: controlCallFunc,
            3: messageCallFunc,
            4: scheduleCallFunc,
            5: listCallFunc
        },
        leaveFunc = {
            0: homeLeaveFunc,
            1: watchingLeaveFunc,
            2: controlLeaveFunc,
            3: messageLeaveFunc,
            4: scheduleLeaveFunc,
            5: listLeaveFunc
        },
        delayTime = {
            0: 700,
            1: 700,
            2: 700,
            3: 700,
            4: 700,
            5: 0
        },
        callbackFunc = {
            0: homeCallBackFunc,
            1: watchingCallBackFunc,
            2: controlCallBackFunc,
            3: messageCallBackFunc,
            4: scheduleCallBackFunc,
            5: null
        };

    window.pageTabber = new PageTabber(callFunc, leaveFunc, delayTime, callbackFunc);

    setDebug(title);
    setMoreBtn();
    setClock();
    typeOnNotebook();

    setControl();
}

function setReadyPositionBeforeTab() {
    $('.guitar-sm').css('bottom', 'calc(105% + 121px)');
    $('.stuff-on-top').css('right', '-100%');
    $('.stuff-on-top .logo, .stuff-on-top .tip').css('opacity', '0');

    $('.watching-pc').css('left', '-96%');
    $('.watching-tip').css('right', '-240px');
    $('.watching-img').css('opacity', '0');

    $('.control-lock-pad').css('top', '23%');
    $('.control-lock-pad').css('opacity', '0');
    $('.control-lock-btn').css('opacity', '0');

    $('.message-window').css('opacity', '0');
    $('.message-window-bg').css('opacity', '0');

    $('#list ul li').css('left', -innerWidth / 2 + 'px');
}

function changeSbt(title) {
    $(".title .subtitle").html(title);
}

function isVertical() {
    return innerHeight > innerWidth;
}

function setPage() {
    if (isVertical()) {
        $('#copyright').css('font-size', '12px');
        $('.bottom-button').removeClass('bottom-button-width');
        $('.bottom-right-button').removeClass('bottom-right-button-width');
    }
    else {
        $('#copyright').css('font-size', '16px');
        $('.bottom-button').addClass('bottom-button-width');
        $('.bottom-right-button').addClass('bottom-right-button-width');
    }

    setWatching();
    setBottomBar();
}

function setBottomBar() {
    // bottom-page-bar to center
    var
        bpb = $(".bottom-page-bar"),
        bpbBlank = parseFloat($('body').css('width')) - parseFloat(bpb.css('width'));
    bpb.css('left', bpbBlank / 2 + 'px');
    $(".bottom-bar").hide();
    $(".bottom-bar").fadeIn(500);

    // set bottom-button
    $('.bottom-left-button').click(function() {
        if (pageTabber.pageNowIndex == 0)
            pageTabber.tabTo(pageTabber.pageNowIndex - 2);
        else
            pageTabber.tabTo(pageTabber.pageNowIndex - 1);
    });

    $('.bottom-right-button').click(function() {
        if (pageTabber.pageNowIndex + 2 == pageTabber.pageLen)
            pageTabber.tabTo(pageTabber.pageNowIndex + 2);
        else
            pageTabber.tabTo(pageTabber.pageNowIndex + 1);
    });
}

function setMoreBtn() {
    $(".moreBtn").click(function() {
        $("#page-l").toggleClass("page-rotate").toggleClass("page-l-rotate");
        $("#page-m").toggleClass("page-rotate").toggleClass("page-m-rotate");
        $("#page-r").toggleClass("page-rotate").toggleClass("page-r-rotate");

        $("#topbar").toggleClass("darkBg");


        $('.bottom-bar').fadeToggle(500);

        if (pageTabber.pageNow.id == 'list') {
            var lastIndex = pageTabber.pages.index(pageTabber.pageLast);
            pageTabber.tabTo(lastIndex);
        }
        else {
            pageTabber.tabTo(5);
        }
    });

    $(".list-group-item a").click(function() {
        $("#page-l").toggleClass("page-rotate").toggleClass("page-l-rotate");
        $("#page-m").toggleClass("page-rotate").toggleClass("page-m-rotate");
        $("#page-r").toggleClass("page-rotate").toggleClass("page-r-rotate");
        $("#topbar").toggleClass("darkBg");

        $('.bottom-bar').fadeToggle(500);
    });
}


function setClock() {
    startTime();
    $(".clock").click(function() {
        $(".clock").toggle(500);
        $(".clock-dig").toggle(500);
    });
    $(".clock-dig").click(function() {
        $(".clock").toggle(500);
        $(".clock-dig").toggle(500);
    })

}

function setDebug(title) {
    $(".debug").html("<div id='title'><h2></h2><p></p><p id='ua'></p></div>");
    $(".debug h2").html(title);
    $(".debug #ua").html("UA: " + navigator.userAgent);
    $(".debug").click(function () {

        var f = function() {$(".debug div").slideToggle(500);};
        if ($(this).width() > 50)
            $(".debug div").slideToggle(300, function() {$(".debug").animate({width: "50px"}, 300);});
        else
            $(".debug").animate({width: "100%"}, 300, function() {$(".debug div").slideToggle(300);});
    });
}
