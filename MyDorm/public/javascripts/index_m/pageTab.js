/**
 * Created by leobai on 16/9/12.
 */

;(function () {
    'use strict';

    String.prototype.format=function()
    {
        if(arguments.length==0) return this;
        for(var s=this, i=0; i<arguments.length; i++)
            s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
        return s;
    };

    function PageTabber(callFunc, leaveFunc, delayTimeAfterCall, callbackFunc) {
        this.pages = $('.section');
        this.pageColor = ['#334', '#222', '#054', '#024', '#a33', '#000'];
        this.pageLen = this.pages.length;
        this.pageBar = $('.bottom-page-bar .bottom-page-bar-item');
        this.pageLast = null;
        this.pageNow = this.pages.first();
        this.pageNowIndex = 0;
        this.fadeTime = 200;
        this.callFunc = callFunc;
        this.leaveFunc = leaveFunc;
        this.callbackFunc = callbackFunc;
        this.delayTimeAfterCall = delayTimeAfterCall;

        this.init();
    }

    /**
     * 初始化
     */
    PageTabber.prototype.init = function() {
        //this.pages.css('opacity', '0');
        //this.pages.css('display', 'none');
        /*$(this.pageNow).addClass('section-now');
         $(this.pageBar[0]).addClass('bottom-page-bar-item-select');
         $('body').css('background-color', this.pageColor[0]);

         if (this.callbackFunc[0])
         this.callbackFunc[0]();*/
        $('body').css('background-color', this.pageColor[0]);
        this.tabToFunc(0);
        if (this.callFunc[0]) {
            setTimeout('pageTabber.callFunc[0]()', 0 * this.delayTimeAfterCall[0]);
        }
    };

    /**
     * 为后面准备的 Tabto 函数
     * @param index
     */
    PageTabber.prototype.tabToFunc = function(index) {
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

        if (this.leaveFunc[this.pageNowIndex]) {
            this.leaveFunc[this.pageNowIndex]();
            setTimeout('pageTabber.tabToFunc({0})'.format(index), this.delayTimeAfterCall[index] / 2);
        }
        else {
            this.tabToFunc(index);
        }
        if (this.callFunc[index]) {
            setTimeout('pageTabber.callFunc[{0}]()'.format(index), this.delayTimeAfterCall[index]);
        }
    };

    window.PageTabber = PageTabber;
})();