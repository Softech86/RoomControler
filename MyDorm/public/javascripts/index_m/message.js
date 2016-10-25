/**
 * Created by leobai on 16/8/18.
 */

function messageCallFunc() {
    console.log('mcf');
    var h = innerHeight * 0.95 - 118;

    $('.message-window').animate({opacity: '1', height: h + 'px'}, 500);
    $('.message-window-bg').animate({opacity: '1', height: h + 30 + 'px'}, 300);
    $('.message-window').scrollTop(30);
    $('.message-sendBox').delay(200).fadeIn(300);

    getNew();
    $('.message-window').scrollTop(0);

}

function messageLeaveFunc() {
    console.log('mlf');

    $('.message-window').animate({opacity: '0', height: '0'}, 500);
    $('.message-window-bg').animate({opacity: '0', height: '0'}, 300);
    $('.message-sendBox').fadeOut(300);
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

function setMessage() {
    var h = innerHeight * 0.95 - 118;
    $('.message-window').animate({opacity: '1', height: h + 'px'}, 100);
    $('.message-window-bg').animate({opacity: '1', height: h + 30 + 'px'}, 100);
}

function generateMessage(data) {
    var
        d = new Date(),
        today = new Date(),
        _id = data._id,
        userName = data.userName,
        isReceive = (userName != $('.username').text()),
        content = data.content;
        msgTime = "";
    d.setTime(data.createTimestamp);
    var
        h = checkTime(d.getHours()),
        m = checkTime(d.getMinutes()),
        s = checkTime(d.getSeconds());
    msgTime = '{0}:{1}:{2}'.format(h, m, s);

    var html =
        '<div class="message-panel message-{0}">'.format(isReceive ? 'receive' : 'send') +
            '<div class="_id" hidden>{0}</div>'.format(_id) +
            '<span class="message-userCap">{0}</span>'.format(userName[0]) +
            '<span class="message-createTime">{0}</span>'.format(msgTime) +
            '<div class="message-title">{0}</div>'.format(userName) +
            '<div class="message-content">{0}</div>'.format(content) +
        '</div>';
    return html;
}

/**
 * ajax from backend
 * @param from
 * @param to
 * @param latestId
 * @param top : bool, insert after the top or before the bottom
 * @param recursion : should start a new download or not
 */
function downloadMessage(from, to, latestId, top, recursion) {
    console.log(latestId);
    if (pageTabber.pageNowIndex != 3 && latestId)
        return;
    console.log(from, to);

    //$('.message-load-status').html('Loading...');
    $.ajax({
        type: 'GET',
        url: '/downloadMessage',
        data: {
            from: from,
            to: to,
            latestId: latestId
        },
        success: function (data) {
            console.log('ajaxgetback', data);
            if (data.length) {
                console.log(data);
                //$('.message-top').html('Downloading...');
                for (var i in data) {
                    console.log(data[i]);
                    window.data = data[i];
                    var
                        message = generateMessage(data[i]);
                    console.log(message);
                    if (top)
                        $('.message-top').after(message);
                    else
                        $('.message-load-btn').before(message)
                }
                //$('.message-load-status').html('Click <b>HERE</b> to load more.');
                if (top)
                    $('.message-window').scrollTop(0);
            }
            else {
                if (!top)
                    $('.message-load-btn').html('No more messages.');
            }

            if (recursion)
                setTimeout('getNew();', 1000);
        },
        error: function () {
            console.log('error');
        }
    });
}

function setMessageData() {
    // set submit event
    $('#message-submit').click(function() {
        $('#message-submit').attr('disabled', 'disabled');
        $.post(
            '/sendMessageData',
            {
                userPassword: $('#user-password').text(),
                content: $('#message-send-content').val()
            },
            function(data) {
                $('#message-send-content').val('');
                $('#message-submit').removeAttr('disabled')
            }
        )
    });

    /*// set scroll event
    window.connectMutex = 0;
    $('.message-window').scroll(function(event) {
        var scrollPos = $('.message-window').scrollTop();
        //console.log('scroll to', scrollPos);
        if (scrollPos == 0 && connectMutex == 0) {
            connectMutex += 1;
            // scroll top to load more
            var msgNum = $('.message-panel').length;
            setTimeout('downloadMessage({0}, {1} + 10, {2});'.format(msgNum, msgNum, connectMutex), 100);
        }
    });*/

    $('.message-load-btn').click(function () {
        var
            len = $('.message-panel').length,
            lastId;
        if (len)
            lastId = $('.message-panel').last()[0].children[0].innerHTML;
        downloadMessage(-len - 5, null, lastId, false, false);
    });


    // load the latest 20 message
    downloadMessage(-5, -1, null, true, true);

}

function getNew() {
    if ($('.message-panel').length)
        downloadMessage(null, -1, $('.message-panel')[0].children[0].innerHTML, true, true);
}