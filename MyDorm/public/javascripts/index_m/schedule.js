/**
 * Created by leobai on 16/8/18.
 */

function scheduleCallFunc() {
}

function scheduleLeaveFunc() {
    console.log('slf');
}

function scheduleCallBackFunc() {
    // all have
    if ($(".title .subtitle").html() == 'Schedule') {
        return;
    }

    // all except home
    $(".title .title").css("line-height", "35px");
    $(".title .subtitle").fadeOut(100, function(){changeSbt('Schedule')}).fadeIn(300);

    // only schedule

}
