function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    var greeting = ["更深夜静", "东方既白", "060708", "091011", "121314", "151617", "薄暮冥冥", "月明星稀"];
    //$('.clock-dig').html(h+":"+m+":"+s);
    $('.clock-dig .hour').html(h);
    $('.clock-dig .minute').html(m);
    if (s < 30) {
        var
            style = ".clock-dig:before{height:"
            + (30 - s)
            + "px;top:"
            + (s)
            + "px;}.clock-dig:after{height:30px;top: 0px;}";
        $(".clock-dig style").html(style);
    }
    else {
        var
            style = ".clock-dig:after{height:"
                + (60 - s)
                + "px;top:"
                + (s - 30)
                + "px;}.clock-dig:before{height:0px;top: 30px;}";
        $(".clock-dig style").html(style);
    }
    $('.greeting').html(greeting[Number.parseInt(h / 3)]);

    //$('.clock-sm').html(h+":"+m);
    $('.clock .minute').css("transform", "rotate(" + 6 * m + "deg)");
    $('.clock .hour').css("transform", "rotate(" + Number.parseInt(30 * h + 0.5 * m) + "deg)")
    setTimeout("startTime()", 500);
}

function checkTime(i) {
    if (i < 10) {
        i ="0" + i;
    }
    return i;
}
