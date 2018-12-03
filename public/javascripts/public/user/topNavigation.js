"use strict";

$(function () {
    let popupUtils = new PopupUtils();

    $.utils.ajax({
        url: "/language/getCurrentLang",
        type: "GET",
        success: function (data) {
            let language = $("#switchLanguage");
            if (data === 'en') {
                language.html("简体中文");
            } else {
                language.html("English");
            }
        }, error: function (error) {
            popupUtils.layerTips(error.message, server_consts.tips);
        }
    });
    
    new QRCode(document.getElementById("qrcode"), {
		text: "https://www.bankledger.com/blhw/static/downloadApp.html",
		width: 130,
		height: 130,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
    
    $("#switchLanguage").click(function () {
        let lang = $(this).html();
        let data = {lang: "zh_CN"};
        if (lang === "English") {
            data = {lang: "en"};
        } else if (lang === "简体中文") {
            data = {lang: "zh_CN"};
        }
        $.utils.ajax({
            url: "/language/swich",
            data: data,
            type: "GET",
            success: function (data) {
                if (data === true) {
                    location.reload();
                }
            }, error: function (error) {
                alert("系统异常");
                console.log(error);
                popupUtils.layerTips(error.message, server_consts.tips);
            }
        })
    });

    // $('.close-icon').click(function () {
    //     $(".logBox,.dialog").css('display', 'none');
    // });

    /*ESC按键事件*/
    $(document).keydown(function (event) {
        if (event.keyCode === 27) {
            $(".logBox,.dialog").css('display', 'none');
        }
    });
    
    $('#showApp').hover(function(){
    	$('#downloadLink').addClass('downloadLinkShow');
    },function(){
    	$('#downloadLink').removeClass('downloadLinkShow');
    })
    
});

