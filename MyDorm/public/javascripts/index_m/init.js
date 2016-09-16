//interval function
var
    laserAdjust,
    typeAni = null;


function init(title) {
    setPage();
    $(window).resize(function() {
        console.log('window resize');
        setPage();
    });

    var f = function(title) {
        if (!title)
            title = "MyDorm";
        return function() {
            var changeSbt = function() {
                $(".title .subtitle").html(title);
            };

            if ($(".title .subtitle").html() == title) {
                return;
            }

            if (title == "MyDorm") {
                $(".title .title").css("line-height", "50px");
                $(".title .subtitle").fadeOut(300, changeSbt);

                if (!typeAni) {
                    if (typingMutex) {
                        typeOnNotebook();
                    }
                    typeAni = setInterval("typeOnNotebook()", 10000);
                }
            }
            else {
                $(".title .title").css("line-height", "35px");
                $(".title .subtitle").fadeOut(100, changeSbt).fadeIn(300);

                window.clearInterval(typeAni);
                typeAni = null;
                typingMutex = true;
            }

            //watching 显示屏特效
            console.log(title);

            if (title == "Watching") {
                setWatching();
                watchingReload();
            }

            if (title == "Control") {
                getLockStatus();
                $('.control-lock-btn').fadeIn();
            }
            else {
                $('.control-lock-btn').fadeOut();
            }
        }
    };
    var callbackFunc = {
        0: f("MyDorm"),
        1: f("Watching"),
        2: f("Control"),
        3: f("Message"),
        4: f("Schedule")
    };
    //var pageSlider = PageSlider.case({callback: callback});

    window.pageTabber = new PageTabber(callbackFunc);

    setDebug(title);
    setMoreBtn();
    setClock();
    typeOnNotebook();

    setControl();

    //pageSlider.go(2);
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
    var
        bpb = $(".bottom-page-bar"),
        bpbBlank = parseFloat($('body').css('width')) - parseFloat(bpb.css('width'));
    bpb.css('left', bpbBlank / 2 + 'px');
    $(".bottom-bar").hide();
    $(".bottom-bar").fadeIn(500);
}

function setMoreBtn() {
    $(".moreBtn").click(function() {
        $("#page-l").toggleClass("page-rotate").toggleClass("page-l-rotate");
        $("#page-m").toggleClass("page-rotate").toggleClass("page-m-rotate");
        $("#page-r").toggleClass("page-rotate").toggleClass("page-r-rotate");

        $("#topbar").toggleClass("darkBg");


        $('.bottom-bar').fadeToggle(500);

        /*$("#list").fadeToggle(500, setPage);
        $("#display").fadeToggle(500);
        $("#copyright").fadeToggle(500);*/

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
        //$(".debug div").css("display", "block");

        var f = function() {$(".debug div").slideToggle(500);};
        if ($(this).width() > 50)
            $(".debug div").slideToggle(300, function() {$(".debug").animate({width: "50px"}, 300);});
        else
            $(".debug").animate({width: "100%"}, 300, function() {$(".debug div").slideToggle(300);});
    });
}

var l1 = "$ ", l2 = "", l3 = "", adder;

function fresh() {
    $("#l1").html(l1);
    $("#l2").html(l2);
    $("#l3").html(l3);
}

function appendText(id, text, step, delay) {
    adder += delay;

    for (var i = 0; i < text.length; ++i) {
        adder += step;
        setTimeout(id + '+="' + text[i] + '"; fresh();', adder);
    }
}

function clrscr(delay) {
    adder += delay;

    rollText(0);
    rollText(0);
    rollText(0);
}

function rollText(delay) {
    adder += delay;

    setTimeout("l1 = l2; l2 = l3; l3 = ''; fresh();", adder);
}

var typingMutex = false;

function typeOnNotebook() {
    var cmds = [
        "brew install",
        "Girlfriend",
        " available formula with the name \"girlfriend\""
    ];
    console.log(adder);
    adder = 0;
    typingMutex = true;

    appendText("l1", "", 0, 0);
    appendText("l1", "brew install", 100, 500);
    appendText("l2", "Girlfriend", 100, 0);
    appendText("l3", "Error: No", 5, 2000);
    rollText(200);
    appendText("l3", "available", 5, 0);
    rollText(200);
    appendText("l3", "^C", 5, 0);
    rollText(500);
    appendText("l3", "$ ", 5, 0);
    appendText("l3", "clear", 5, 2000);
    rollText(100);
    clrscr(500);
    appendText("l1", "$ ", 5, 0);

    setTimeout("typingMutex = false;", adder);
}
