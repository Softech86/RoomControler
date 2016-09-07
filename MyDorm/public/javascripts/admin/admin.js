var dat;

function init() {
    $('td div input').css('display', 'none');
    $('button[name="user-cancel"]').css('display', 'none');
    $('button[name="user-save"]').css('display', 'none');
}

$('body').ready(function () {

    init();

    $('button[name="user-change"]').click(function (event) {
        var
            btn = event.toElement,
            tr = btn.parentElement.parentElement.parentElement,
            tds = tr.children,
            btns = btn.parentElement.children;
        for (var i = 0; i < tds.length - 1; ++i) {
            tds[i].children[0].children[1].style.display = 'block';
            tds[i].children[0].children[0].style.display = 'none';
        }
        btns[0].style.display = 'none';
        btns[1].style.display = 'block';
        btns[2].style.display = 'block';
    });

    $('button[name="user-cancel"]').click(function (event) {
        var
            btn = event.toElement,
            tr = btn.parentElement.parentElement.parentElement,
            tds = tr.children,
            btns = btn.parentElement.children;
        for (var i = 0; i < tds.length - 1; ++i) {
            tds[i].children[0].children[1].style.display = 'none';
            tds[i].children[0].children[1].value = tds[i].children[0].children[0].innerHTML;

            tds[i].children[0].children[0].style.display = 'block';
        }
        btns[0].style.display = 'block';
        btns[1].style.display = 'none';
        btns[2].style.display = 'none';
    });

    $('button[name="user-save"]').click(function () {
        var
            btn = event.toElement,
            tr = btn.parentElement.parentElement.parentElement,
            tds = tr.children,
            data = [];
        //check empty
        for (var i = 0; i < tds.length - 1; ++i) {
            if (!tds[i].children[0].children[1].value) {
                return;
                // TODO: render an Error alert
            }
            data.push(tds[i].children[0].children[1].value);
        }
        $.ajax({
            url: '/admin/data',
            type: 'POST',
            data: {
                data: data
            },
            success: function (data) {
                console.log('post success');
                document.write(data);
                document.close();
            }
            //dataType: dataType
        });
    });

    $('button[name="user-delete"]').click(function () {
        var
            btn = event.toElement,
            tr = btn.parentElement.parentElement.parentElement,
            tds = tr.children;
        $.ajax({
            url: '/admin/data',
            type: 'DELETE',
            data: {
                objectId: tds[4].children[0].children[0].innerHTML
            },
            success: function (data) {
                console.log('delete success');
                document.write(data);
                document.close();
            }
        });
    });

    $('button#user-add').click(function () {
        $.ajax({
            url: '/admin/data',
            type: 'GET',
            success: function (data) {
                console.log('add success');
                document.write(data);
                document.close();
            }
        });
    });



});


