"use strict";
const conf = ['18', '19', '21'];
let loadCount = {
    "detailIframe": 0,
    "coreIframe": 0,
    "specificationIframe": 0
};

$(function () {
    let popupUtils = new PopupUtils();
    let producTotal = 0;

    let replace = new ReplaceString();
    $("#quantityOfGoodsInp").keyup(function () {
        let number = parseInt(replace.removeLetter(replace.strReplace($(this).val())) || 1);
        if (number > producTotal) {
            $(this).val(producTotal)
        } else if (number < 1) {
            $(this).val(1);
        } else {
            $(this).val(number);
        }
    });

    function initJquery() {

        // 	小图查看大图
        $('.thumbnails').simpleGal({
            mainImage: '.custom'
        });

        //  计数器
        let t = $("#quantityOfGoodsInp");
        $("#add").click(function () {
            if (parseInt(t.val()) < producTotal) {
                t.val(parseInt(t.val()) + 1)
            }
        });
        $("#min").click(function () {
            if (t.val() > 1) {
                t.val(parseInt(t.val()) - 1)
            }
        });

        $('.productJump').click(function () {
            window.location.href = server_consts.root + "/buyProduction?productId=" + $(this).attr("id");
        });

        // 选项卡切换
        $(".box ul li").click(function () {
            $(this).addClass("cur").siblings().removeClass("cur");

            $(".cont").eq($(this).index()).show().siblings(".cont").hide()
        });
    }

    // 添加购物车
    $("#addShoppingCarBtn").click(function () {
        let number = parseInt($("#quantityOfGoodsInp").val());
        let addSCTips = "";
        let Crossing = "";
        if (server_consts.language === "zh_CN") {
            addSCTips = "添加购物车成功。";
            Crossing = "超出库存总量";
        } else if (server_consts.language === "en") {
            addSCTips = "Add shopping cart success.";
            Crossing = "Exceeded total inventory";
        }
        if (number > producTotal) {
            popupUtils.layerTips(Crossing, server_consts.tips);
            return;
        }

        $.utils.ajax({
            url: "/shoppingCart/save",
            data: {
                productQuantity: number,
                productId: $.utils.getUrlParams("productId")
            }, success: function (data) {
                if (data === true) {
                    popupUtils.layerTips(addSCTips, server_consts.tips);
                    getShoppingCartNumber();
                }
            }, fail: function (error) {
                popupUtils.layerTips(error.message);
            }
        });

    });

    $.utils.ajax({
        url: "/product/findProductById",
        data: {productId: String($.utils.getUrlParams("productId"))},
        success: function (data) {
            producTotal = data.product.productTotal > data.limited ? data.limited : data.product.productTotal;

            $("#limited").html(data.limited);

            let json = {
                productImage: data.productImage,
                stoppingCartNumber: data.stoppingCartNumber,
                product: {
                    total: data.product.productTotal,
                    productId: data.product.productId
                }
            };

            let smallId = "";
            if (conf.indexOf(data.product.categoriesSmallId) >= 0) {
                smallId = "_" + data.product.categoriesSmallId;
            }
            if (server_consts.language === "zh_CN") {
                json.product.name = data.product.categoriesZhCn;
                json.product.features = data.product.productFeaturesZhCn;
                json.product.price = "￥" + data.product.productPrice;
                json.smallClassImage = data.smallClassImage.map(function (s) {
                    return {
                        pictureUrl: s.pictureUrl,
                        name: s.productNameZhCn,
                        productId: s.productId,
                        productTotal: s.productTotal
                    }
                });

                if (data.product.productTotal === 0 || data.product.salesState === "3") {
                    let asc = $("#addShoppingCarBtn");
                    asc.html("已售馨");
                    asc.unbind();
                    asc.css("background", "#ccc");
                } else if (data.product.salesState === "2") {
                    let asc = $("#addShoppingCarBtn");
                    asc.html("已下架");
                    asc.unbind();
                }

                startInit("detailIframe", server_consts.root + "/pages/include/product/detail/product_zh_CH" + smallId + ".jsp");
                startInit("coreIframe", server_consts.root + "/pages/include/product/core/product_zh_CH.jsp");
                startInit("specificationIframe", server_consts.root + "/pages/include/product/specification/product_zh_CH.jsp");

            } else if (server_consts.language === "en") {
                json.product.name = data.product.categoriesEn;
                json.product.price = `￥${data.product.productPrice}(≈$${data.product.productPriceUSD})`;
                json.product.features = data.product.productFeaturesEn;
                json.smallClassImage = data.smallClassImage.map(function (s) {
                    return {
                        pictureUrl: s.pictureUrl,
                        name: s.productNameEn,
                        productId: s.productId,
                        productTotal: s.productTotal
                    }
                });

                if (data.product.productTotal === 0 || data.product.salesState === "3") {
                    let asc = $("#addShoppingCarBtn");
                    asc.html("Sold out");
                    asc.unbind();
                    asc.css("background", "#ccc");
                } else if (data.product.salesState === "2") {
                    let asc = $("#addShoppingCarBtn");
                    asc.html("out off stock");
                    asc.unbind();
                }
                startInit("detailIframe", server_consts.root + "/pages/include/product/detail/product_zh_CH" + smallId + ".jsp");
                startInit("coreIframe", server_consts.root + "/pages/include/product/core/product_zh_CH.jsp");
                startInit("specificationIframe", server_consts.root + "/pages/include/product/specification/product_zh_CH.jsp");
            }
            RenderingElement(json, initJquery);
        }, fail: function (err) {
            popupUtils.layerTips(err.message, server_consts.tips);
        }
    });

    $(".tabIframe").click(function () {
        let id = $(this).attr("id") + "Iframe";
        if (loadCount[id] < 2) {
            timer(document.getElementById(id), 0);
        }
    })

});
let getShoppingCartNumberFlag = false;

function getShoppingCartNumber() {
    if (getShoppingCartNumberFlag) {
        return;
    }
    getShoppingCartNumberFlag = true;
    $.utils.ajax({
        url: "/product/getShoppingCarNumber",
        type: "GET",
        success: function (data) {
            RenderingShoppingCartNumberElement(data);
        }
    })
}

function RenderingShoppingCartNumberElement(number) {
    $("#shoppingCartNumber").html(number);
}

function RenderingElement(json, cb) {
    $("#productName").html(json.product.name);
    let list = json.product.features.split("_");
    list.forEach(function (l) {
        $("#features").append("<li>" + l + "</li>");
    });
    $("#productPrice").html(json.product.price);
    $("#productTotal").html(json.product.total);

    json.productImage.forEach(function (v, i) {
        if (!v) {
            return;
        }
        if (i === 0) {
            $("#detailImage").attr("src", imgUrl + v.pictureUrl);
        }
        $("#productImage").append(`<li ${i === json.productImage.length - 1 || (i + 1) % 4 === 0 ? "style='margin:0'" : ""}>
            <a href="${ imgUrl + v.pictureUrl}">
            <img src="${imgUrl + v.pictureUrl}" alt=""></a>
            </li>`);
    });

    // 相同子类图片
    json.smallClassImage.forEach(function (v) {
        if (!v) {
            return;
        }

        if (v.productTotal === "0") {
            if (v.productId === json.product.productId) {
                $("#smallImage").append(`<span class="colorbox" style="border-color: red;background-color: #ccc">
                    <img src="${imgUrl + v.pictureUrl}">&nbsp;${v.name}</span>`);
            } else {
                $("#smallImage").append(`<span class="colorbox" style="background-color: #ccc">
                <img src="${imgUrl + v.pictureUrl}">&nbsp;${v.name}</span>`);
            }
        } else {
            if (v.productId === json.product.productId) {
                $("#smallImage").append(`<span class="colorbox" style="border-color: red">
                    <img src="${imgUrl + v.pictureUrl}">&nbsp;${v.name}</span>`);
            } else {
                $("#smallImage").append(`<span class="colorbox productJump" id="${ v.productId}">
                <img src="${imgUrl + v.pictureUrl}">&nbsp;${v.name}</span>`);
            }
        }


    });
    RenderingShoppingCartNumberElement(json.stoppingCartNumber);
    cb();
}

let browserVersion = window.navigator.userAgent.toUpperCase();
let isOpera = browserVersion.indexOf("OPERA") > -1;
let isFireFox = browserVersion.indexOf("FIREFOX") > -1;
let isChrome = browserVersion.indexOf("CHROME") > -1;
let isSafari = browserVersion.indexOf("SAFARI") > -1;
let isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
let isIE9More = (!-[1,] === false);
let minHeight = 650;

function reInitIframe(iframe) {
    try {
        let bHeight = 0;
        if (isChrome === false && isSafari === false) {
            try {
                bHeight = iframe.contentWindow.document.body.scrollHeight;
            } catch (ex) {
            }
        }
        let dHeight = 0;
        if (isFireFox === true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;//如果火狐浏览器高度不断增加删除+2
        else if (isIE === false && isOpera === false && iframe.contentWindow) {
            try {
                dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
            } catch (ex) {
            }
        }
        else if (isIE === true && isIE9More) {//ie9+
            let heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
            if (heightDeviation === 0) {
                bHeight += 3;
            } else if (heightDeviation !== 3) {
                eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
                bHeight += 3;
            }
        }
        else//ie[6-8]、OPERA
            bHeight += 3;

        let height = Math.max(bHeight, dHeight);
        if (height < minHeight) {
            height = minHeight;
        }
        iframe.style.height = height + "px";
    } catch (ex) {
    }
}

function startInit(iframeId, src) {
    eval("window.IE9MoreRealHeight" + iframeId + "=0");
    let iframe = document.getElementById(iframeId);
    iframe.src = src;
    timer(iframe, 0);
}

function timer(iframe, count) {
    let time = setInterval(function () {
        let images = $(iframe).contents().find("img");
        let imageLength = images.length;
        for (let i = 0; i < imageLength; i++) {
            if (images[i].complete) {
                count++;
            }
        }
        reInitIframe(iframe);
        if (count >= imageLength) {
            clearInterval(time);
        }
    }, 500);
}