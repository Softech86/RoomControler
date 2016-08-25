/**
 * Created by leobai on 16/8/18.
 */
function controlLock() {
    $('.control-lock-yin').css("left", "-50%").css("transform", "rotate(0deg)");
    $('.control-lock-yang').css("right", "-50%").css("transform", "rotate(0deg)");
    $('.control-lock-yin').css("left", "-75px");
    $('.control-lock-yang').css("right", "-75px");
    setTimeout('$(".control-lock-yin").css("transform", "rotate(90deg)");', 500);
    setTimeout('$(".control-lock-yang").css("transform", "rotate(90deg)");', 500);
}

function controlUnlock() {
    $('.control-lock-yin').css("left", "-75px").css("transform", "rotate(90deg)");
    $('.control-lock-yang').css("right", "-75px").css("transform", "rotate(90deg)");
    $('.control-lock-yin').css("transform", "rotate(0deg)");
    $('.control-lock-yang').css("transform", "rotate(0deg)");
    setTimeout('$(".control-lock-yin").css("left", "-50%");', 500);
    setTimeout('$(".control-lock-yang").css("right", "-50%");', 500);
}

function controlToggle() {
    if (Math.abs(parseInt($('.control-lock-yin').css("left")) + 75) < 5) {
        controlUnlock();
        console.log('unlocking');
    }
    else {
        controlLock();
        console.log('locking');
    }
}
