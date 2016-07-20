function bgResize() {
    var skyline = $('#bodyback').css('width').split('px')[0] / 2.28;
    $('#bodyback').css('height', skyline + 40 + 'px'); 
    //$('#night').css('top', skyline);
    
    $('#bodyfront').css('height', skyline + 'px');
}

