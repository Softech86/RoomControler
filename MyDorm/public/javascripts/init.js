function init() {
    $('#copyright').css('color', '#aab');

    setColor();

    bgResize();
    startTime();
    startAni();

    bgResize();
    window.onresize = bgResize;
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
    $('#clock').html(h+":"+m+":"+s);
    $('#greeting').html(greeting[Number.parseInt(h / 3)]);
    t=setTimeout('startTime()',500);
}

function checkTime(i) {
    if (i < 10) {
        i ="0" + i;
    }
    return i;
}