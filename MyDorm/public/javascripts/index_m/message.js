/**
 * Created by leobai on 16/8/18.
 */

function messageCallFunc() {
    console.log('mcf');

    $('.message-window').animate({opacity: '1'}, 500);
    $('.message-window-bg').animate({opacity: '1'}, 300);
}

function messageLeaveFunc() {
    console.log('mlf');

    $('.message-window').animate({opacity: '0'}, 500);
    $('.message-window-bg').animate({opacity: '0'}, 300);
}

function messageCallBackFunc() {
    // all have
    if ($(".title .subtitle").html() == 'Message') {
        return;
    }

    // all except home
    $(".title .title").css("line-height", "35px");
    $(".title .subtitle").fadeOut(100, function(){changeSbt('Message')}).fadeIn(300);

    // only message
}
