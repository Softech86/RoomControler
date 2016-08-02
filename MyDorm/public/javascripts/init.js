function init(title) {
    setPage();
    setDebug(title);
    setMoreBtn();
    setClock();
}

function setPage() {

}

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

        $("#list").slideToggle(500);
        $("#display").slideToggle(500);
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