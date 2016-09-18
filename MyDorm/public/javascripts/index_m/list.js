/**
 * Created by leobai on 16/8/18.
 */

function listCallFunc() {
    console.log('lcf');


    for (var i in $('#list ul li')) {
        $('#list ul li').eq(i).delay(i * 50).animate({left: '0'}, 500);
    }
}

function listLeaveFunc() {
    console.log('llf');


    for (var i in $('#list ul li')) {
        $('#list ul li').eq(i).delay(i * 50).animate({left: -innerWidth / 2 + 'px'}, 500);
    }
}