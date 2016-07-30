function bgResize() {
    var skyline = $('#bodyback').css('width').split('px')[0] / 2.28;
    $('#bodyback').css('height', skyline + 40 + 'px'); 
    //$('#night').css('top', skyline);
    
    $('#bodyfront').css('height', skyline + 'px');

    $('.title').css('top', (skyline - 360) * 0.15 + 25 + 'px');
    $('#title').css('font-size', 60 + 0.10 * (skyline - 360) + 'px');
    $('#subtitle').css('font-size', 30 + 0.05 * (skyline - 360) + 'px');

}

