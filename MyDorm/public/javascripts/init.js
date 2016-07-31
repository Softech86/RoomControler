var
    pagedown = false,
    isPhone = true;

function nextpage() {
    pagedown = true;
    //alert('hal');
    /*$('html, body').animate(
     {scrollTop:
     parseFloat($('#topcvs').css('top')) + 'px'
     }, 400
     );*/

    bgResize();
    $('html, body').animate(
        {
            scrollTop:
            parseFloat($('#topcvs').css('top')) + parseFloat($('#topcvs').css('height')) + 'px'
        }, 500
    );

    //$('html, body').css("background-color", "#001");
}

function init() {

    if (judgePhone()) {
        window.location.href = '/m';
        return;
    }

    setColor();

    bgResize();
    startTime();
    startAni();

    bgResize();
    window.onresize = bgResize;

    $('#out').html(navigator.platform + ' ' + document.documentElement.clientHeight);
}

function judgePhone() {
    var p = navigator.platform;
    isPhone =
        ((p.indexOf("Win") == 0) ||
        (p.indexOf("Mac") == 0) ||
        (p == "X11") || (p.indexOf("Linux") == 0))
        &&
        (parseFloat($('#bodyback').css('width')) <= 768);
    return isPhone;
}

function setColor() {
    $(".title").css('text-shadow', "#889 0px 0px 15px");
    $('.copyright').css('color', "#aab");
}

function startAni() {
    var aniClassList = [
        'bodytop',
        'bodyback',
        'title',
        'subtitle'
    ]
    for (i in aniClassList) {
        $('.' + aniClassList[i]).css('animation-play-state', 'running');
    }
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    var greeting = ["更深夜静", "东方既白", "060708", "091011", "121314", "151617", "薄暮冥冥", "月明星稀"];
    $('.clock').html(h+":"+m+":"+s);
    $('.clock-sm').html(h+":"+m);
    $('.greeting').html(greeting[Number.parseInt(h / 3)]);
    t=setTimeout('startTime()',500);
}

function checkTime(i) {
    if (i < 10) {
        i ="0" + i;
    }
    return i;
}