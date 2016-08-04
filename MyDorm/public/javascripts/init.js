function init(title) {
    setPage();
    $(window).resize(function() {
        setPage();
    });

    setDebug(title);
    setMoreBtn();
    setClock();
    typeOnNotebook();
}

function setPage() {
    console.log("before" + $(".list-group").css("margin-bottom"));
    //TODO: rewrite! 太差了! 重构!
    $(".city").height(parseInt($("body").width() / 2800 * 991));

    console.log($(".city").offset().top);
    console.log($(".city").height());

    var
        h = $(window).height() - $(".city").offset().top - $(".city").height() + parseFloat($(".list-group").css("margin-bottom")),
        min = parseInt($(".city").height() * 0.2);
    $(".list-group").css("margin-bottom", (h >= min ? h : min) + "px");

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
    //thisListItem.parent().css("background-color", "#555");
    //thisListItem.parent().css("background", "linear-gradient(to right, #000 0%,#fff 100%)")
};

function setMoreBtn() {
    /*$(".moreBtn").click(function() {
        $("#page-l").animate({
            width: "25px"
        }, 500);
    });*/
    $(".moreBtn").click(function() {
        $("#page-l").toggleClass("page-rotate").toggleClass("page-l-rotate");
        $("#page-m").toggleClass("page-rotate").toggleClass("page-m-rotate");
        $("#page-r").toggleClass("page-rotate").toggleClass("page-r-rotate");

        $("body").toggleClass("darkBg");
        $("#topbar").toggleClass("darkBg");

        $("#list").slideToggle(500, setPage);
        $("#display").slideToggle(400);
    });

    $("body").click(function() {
        $(".list-group-item a").css("opacity", "1.0");
        //$(".list-group-item").css("border-color", "transparent");
        //$(".list-group-item").css("background-color", "transparent");
        //$(".list-group-item").css("background", "none");
        $(".list-group-item div").css("width", "0");
        //$(".list-group-item div").css("background-color", "transparent");
    });

    /*listClicked = () => {
        $(".list-group-item a").css("opacity", "0.3");
        $(".list-group-item").css("border-color", "transparent");
        thisListItem.css("opacity", "1.0");
        thisListItem.css("color", "#fff");
        thisListItem.prev().css("background-color", "#fff");
        thisListItem.prev().css("width", "100%");
        //thisListItem.parent().css("background-color", "#555");
        //thisListItem.parent().css("background", "linear-gradient(to right, #000 0%,#fff 100%)")
    };*/

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
    adder = 0;

    appendText("l1", "", 0, 0);
    appendText("l1", "brew install", 100, 500);
    appendText("l2", "Girlfriend", 100, 0);
    appendText("l3", "Error: No", 5, 1000);
    rollText(200);
    appendText("l3", "available", 5, 0);
    rollText(200);
    appendText("l3", "^C", 5, 0);
    rollText(500);
    appendText("l3", "$ ", 5, 0);
    appendText("l3", "clear", 5, 1000);
    rollText(100);
    clrscr(500);
    appendText("l1", "$ ", 5, 0);

    setTimeout("typeOnNotebook()", 10000);
}