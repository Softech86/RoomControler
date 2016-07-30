function getMousePos(event) {             
     var e = event || window.event;       
      return {x : e.clientX, y : e.clientY} 
} 

function getShadowAttr(pos, scaleX=1, scaleY = 1, dx = 3, dy = 3, color = '#889') {
    return color + ' ' + (pos.x * scaleX + dx) + 'px ' + (pos.y * scaleY + dy) + 'px 15px';
}

function getPositionAttr(pos, scaleX = 1, scaleY = 1) {
    return pos.x * scaleX + 'px ' + (pos.y * scaleY + 10) + 'px';
}

function moveWithMouse() {
    var pos = getMousePos();
    var center = {x: document.documentElement.clientWidth / 2, y: document.documentElement.clientHeight / 2}; 
    var relativePos =  {x: pos.x - center.x, y: pos.y - center.y};
    $('#out').html([pos.x, pos.y, center.x * 2, center.y * 2, relativePos.x, relativePos.y].toString());

    var shadowAttr = getShadowAttr(relativePos, -0.01, -0.01);
    $('#title').css('textShadow', shadowAttr);
    $('#subtitle').css('textShadow', shadowAttr);

    shadowAttr = getShadowAttr(relativePos, -0.006, -0.003, 0, 10, '#666');
    $('#topbar').css('boxShadow', shadowAttr);

    //$('a.navbar-brand').css('boxShadow', shadowAttr);

    //document.getElementById('bodyfront').style.backgroundPosition = getPositionAttr(relativePos, -0.001, -0.02);
    
}
