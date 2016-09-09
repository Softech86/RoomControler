/**
 * Created by leobai on 16/8/18.
 */

function setLoadingAni() {
    $('.control-lock-bg').html('...');
    setTimeout("$('.control-lock-bg').html('..');", 300);
    setTimeout("$('.control-lock-bg').html('.');", 600);
}

function yinyangLockAni() {
    $('.control-lock-yin').css('left', 'calc(50% - 37px)');
    $('.control-lock-yang').css('right', 'calc(50% - 38px)');
    $('.control-lock-bg').css('width', '0');
    $('.control-lock-bg').css('margin-left', 'calc(45% - 24px)');
    $('.control-lock-bg').css('opacity', '0');
}

function yinyangUnlockAni() {
    $('.control-lock-yin').css('left', '5%');
    $('.control-lock-yang').css('right', '5%');
    $('.control-lock-bg').css('width', 'calc(90% - 48px)');
    $('.control-lock-bg').css('margin-left', '0');
    $('.control-lock-bg').css('opacity', '0.3');
}

function controlLockBtnClick() {
    if ($('.control-lock-bg').text().search('\\\.') > -1)
        return;

    var
        userPassword = $('#user-password').text(),
        operate = $('.control-lock-btn-remind').text(),
        loadingAni = setInterval('setLoadingAni()', 900);

    $('.control-lock-btn').css('background-color', '#999');

    $.ajax({
        type: 'POST',
        url: "/changeLockStatus",
        data: {
            operate: operate,
            userPassword: userPassword
        },
        success: function(data) {
            clearInterval(loadingAni);

            $('.control-lock-btn').css('background-color', '#fff');

            console.log(data);
            $('.control-lock-bg').html(data.status);
            if (data.status == 'CLOSE') {
                yinyangLockAni();
            }
            else {
                yinyangUnlockAni();
            }
            $('.control-lock-btn-remind').html(data.operate);
        },
        error: function(data) {
            clearInterval(loadingAni);

            $('.control-lock-btn').css('background-color', '#fff');

            console.log(data);
            $('.control-lock-bg').html('ERROR');
        }
    })
}

function setControl() {

    $('.control-lock-btn').click(controlLockBtnClick);

}

function getLockStatus() {
    $.ajax({
        url: "/getLockStatus",
        success: function(data) {
            console.log(data);
            $('.control-lock-bg').html(data ? 'CLOSE' : 'OPEN');

            if (data) {
                yinyangLockAni();
            }
            else {
                yinyangUnlockAni();
            }
            
            $('.control-lock-btn-remind').html(data ? 'UNLOCK' : 'LOCK')
        }
    })
}