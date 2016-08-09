function init(title) {
    setPage();
    $(window).resize(function() {
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

            var bgc = $(".current").css("background-color");
            $("body").css("background-color", bgc);
            if (title == "MyDorm") {
                $(".title .title").css("line-height", "50px");
                $(".title .subtitle").fadeOut(300, changeSbt);
            }
            else {
                $(".title .title").css("line-height", "35px");
                $(".title .subtitle").fadeOut(100, changeSbt).fadeIn(300);
            }

            //watching 显示屏特效
            console.log(title);

            if (title == "Watching") {
                watchingPageAnimate();
            }
            else {
                watchingPageReset();
            }
        }
    }
    var callback = {
        1: f("MyDorm"),
        2: f("Watching"),
        3: f("Control"),
        4: f("Message"),
        5: f("Schedule")
    };
    var pageSlider = PageSlider.case({callback: callback});

    setDebug(title);
    setMoreBtn();
    setClock();
    typeOnNotebook();
    watchingPageReset();

    pageSlider.go(2);
}

function watchingPageReset() {
    $(".watching-img").css("height", "4px");
    $(".watching-img").css("width", "4px");
    if ($(window).height() > $(window).width()) {
        $(".watching-img").css("top", 75 + 0.375 * $(window).width() - 9 + "px");
        $(".watching-img").css("left", 12 + 0.5 * $(window).width() - 12 + "px");
    }
    else {
        $(".watching-img").css("top", 56 + 0.5 * $(window).height() - 53 + "px");
        $(".watching-img").css("left", 24 + 0.5 * $(window).height() / 0.75 - 53 / 0.75 + "px");
    }
}
function watchingPageAnimate() {
    if ($(window).height() > $(window).width()) {
        $(".watching-img").css("width", "calc(100% - 24px)");
        $(".watching-img").css("left", "12px");
        setTimeout('$(".watching-img").css("height", getPicHeight())', 400);
        setTimeout('$(".watching-img").css("top", "75px")', 400);

    }
    else {
        $(".watching-img").css("height", "calc(100% - 106px)");
        $(".watching-img").css("top", "56px");
        setTimeout('$(".watching-img").css("width", getPicWidth())', 400);
        setTimeout('$(".watching-img").css("left", "24px")', 400);

    }

    //setTimeout('$(".watching-img").css("height", getPicHeight())', 1000);
    //setTimeout('$(".watching-img").css("top", "calc(25% - 24px)")', 1000);

}
function getPicHeight() {
    return parseFloat($(".watching-img").css("width")) * 0.75;
}
function getPicWidth() {
    return parseFloat($(".watching-img").css("height")) / 0.75;
}



function setPage() {
    console.log("before" + $(".list-group").css("margin-bottom"));

    $(".city").height(parseInt($("body").width() / 2800 * 991));

    console.log($(".city").offset().top);
    console.log($(".city").height());

    var
        h = $(window).height() - $(".city").offset().top - $(".city").height() + parseFloat($(".list-group").css("margin-bottom")),
        min = parseInt($(".city").height() * 0.2);
    if (h >= min) {
        $(".city").css("display", "block");
        $(".list-group").css("margin-bottom", h + "px");
    }
    else {
        $(".city").css("display", "none");
        var hAve = $(window).height() / 12 - 17.6;
        $(".list-group-item").css("padding", hAve >= 10 ? 10 : hAve + "px 15px");
    }
    console.log("after" + $(".list-group").css("margin-bottom"));
}

var thisListItem;
function listClicked() {
    $(".list-group-item a").css("opacity", "0.3");
    //$(".list-group-item").css("border-color", "transparent");
    thisListItem.css("opacity", "1.0");
    thisListItem.css("color", "#fff");
    thisListItem.prev().css("background-color", "#fff");
    thisListItem.prev().css("width", "100%");
    thisListItem.prev().css("height", "100%");
    thisListItem.prev().css("top", "0px");
    thisListItem.prev().css("left", "0px");

};

function bodyClicked() {
    $(".list-group-item a").css("opacity", "1.0");
    $(".list-group-item div").css("width", "0%");
    //$(".list-group-item div").css("height", "0%");
    //$(".list-group-item div").css("top", "23px");
    $(".list-group-item div").css("left", "12px");

};

function setMoreBtn() {
    $(".moreBtn").click(function() {
        $("#page-l").toggleClass("page-rotate").toggleClass("page-l-rotate");
        $("#page-m").toggleClass("page-rotate").toggleClass("page-m-rotate");
        $("#page-r").toggleClass("page-rotate").toggleClass("page-r-rotate");

        $("body").toggleClass("darkBg");
        $("#topbar").toggleClass("darkBg");

        $("#list").fadeToggle(500, setPage);
        $("#display").fadeToggle(500);
        $("#copyright").fadeToggle(500);

    });

    $("body").click(bodyClicked);

    $(".list-group-item a").click(function() {
        thisListItem = $(this);
        setTimeout("listClicked()", 1);
    });

}


function setClock() {
    startTime();
    $(".clock").click(function() {
        $(".clock").toggle(500);
        $(".clock-dig").toggle(500);
    })
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

function typeOnNotebook() {
    var cmds = [
        "brew install",
        "Girlfriend",
        " available formula with the name \"girlfriend\""
    ];
    console.log(adder);
    adder = 0;

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

    setTimeout("typeOnNotebook()", 10000);
}