/**
 * Created by leobai on 16/8/18.
 */

function homeCallFunc() {
    console.log('hcf');
    /*$('.guitar-sm').css('bottom', 'calc(100% + 121px)');
    $('.guitar-sm').animate({bottom: '141px'}, 500, function() {
        $('.guitar-sm').css('bottom', 'calc(5% + 121px)');
    });*/
    $('.guitar-sm').css('bottom', 'calc(5% + 121px)');
    //$('.guitar-sm').animate({bottom: '-=100%'}, 500);
    $('.stuff-on-top').animate({right: '+=100%'}, 500);
    $('.stuff-on-top .logo, .stuff-on-top .tip').delay(500).animate({opacity: '1'}, 200);
}

function homeLeaveFunc() {
    console.log('hlf');

    //$('.guitar-sm').animate({bottom: '+=100%'}, 500);
    $('.guitar-sm').css('bottom', 'calc(105% + 121px)');
    $('.stuff-on-top').animate({right: '-=100%'}, 500);
    $('.stuff-on-top .logo, .stuff-on-top .tip').animate({opacity: '0'}, 200);
}

function homeCallBackFunc() {
    // all have
    if ($(".title .subtitle").html() == 'Home') {
        return;
    }

    // only home
    $(".title .title").css("line-height", "50px");
    $(".title .subtitle").fadeOut(300, function(){changeSbt('Home')});

    typeOnNotebook();
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
    if (!adder)
        adder = 1;
    else
        return;

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

    setTimeout("adder = 0;", adder);
    setTimeout("if (adder == 0 && $('.title .subtitle').html() == 'Home') {typeOnNotebook();}", adder + 1500);
}
