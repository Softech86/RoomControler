/**
 * Created by leobai on 16/9/12.
 */

;(function () {
    'use strict';

    function PageTabber(callbackFunc) {
        this.pages = $('.section');
        this.pageColor = ['#334', '#222', '#054', '#024', '#a33', '#000'];
        this.pageLen = this.pages.length;
        this.pageBar = $('.bottom-page-bar .bottom-page-bar-item');
        this.pageLast = null;
        this.pageNow = this.pages.first();
        this.pageNowIndex = 0;
        this.fadeTime = 200;
        this.callbackFunc = callbackFunc;

        this.init();
    }

    /**
     * 初始化
     */
    PageTabber.prototype.init = function() {
        this.pages.css('opacity', '0');
        this.pages.css('display', 'none');
        /*$(this.pageNow).addClass('section-now');
        $(this.pageBar[0]).addClass('bottom-page-bar-item-select');
        $('body').css('background-color', this.pageColor[0]);

        if (this.callbackFunc[0])
            this.callbackFunc[0]();*/
        this.tabTo(0);
    };

    /**
     * 切换至该 section
     * @param index
     */
    PageTabber.prototype.tabTo = function(index) {
        while (index < 0) {
            index += this.pageLen;
        }
        index = index % this.pageLen;

        console.log('Tab to Page', index);

        $('body').css('background-color', this.pageColor[index]);

        $(this.pageNow).removeClass('section-now');
        $(this.pageBar[this.pageNowIndex]).removeClass('bottom-page-bar-item-select');

        this.pageLast = this.pageNow;
        this.pageNow = this.pages.get(index);
        this.pageNowIndex = index;
        $(this.pageNow).addClass('section-now');
        $(this.pageBar[index]).addClass('bottom-page-bar-item-select');

        if (this.callbackFunc[index])
            this.callbackFunc[index]();
    };

    window.PageTabber = PageTabber;
})();