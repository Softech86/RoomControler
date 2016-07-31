function bgResize() {
    var
        width = parseFloat($('#bodyback').css('width')),
        skyline =  width / 2.28;
    $('#bodyback').css('height', skyline + 70 + 'px');
    //$('#night').css('top', skyline);
    
    //$('#bodyfront').css('height', skyline + (pagedown ? 900 : 0) + 'px');
    if (pagedown) {
        $('#bodyfront').animate({height: skyline + 900 + 'px'}, 500);
    }
    else
        $('#bodyfront').css('height', skyline + 'px');

    $('.title').css('top', (skyline - 360) * 0.15 + 25 + 'px');
    $('#title').css('font-size', 60 + 0.10 * (skyline - 360) + 'px');
    $('#subtitle').css('font-size', 30 + 0.05 * (skyline - 360) + 'px');

    $('#cvs').css('top', (skyline - 360) * 0.45 + 220 + 'px');
    $('#cvs').width(width + 'px');

    $('#topcvs').css('top', (skyline - 360) * 0.45 + 220 + 'px');
    $('#topcvs').width(width + 'px');
    $('#topcvs').height($('#cvs').height() + 'px');

    if (judgePhone()) { //phone page
        var windowHeight = document.documentElement.clientHeight;
        $('#bodytop').height(windowHeight - $('#bodyfront').height());
        $('#cvs').css('top', windowHeight - $('#cvs').height() - 32);
        $('#bodyback').css('height', windowHeight - 32 + 'px');
        $('#title').css('top', '0px');
        $('#title').css('font-size', '30px');


    }
    else {

    }

    $('#title').css('margin-left', width / 2 - $('#title').width() / 2 + 'px');

}

