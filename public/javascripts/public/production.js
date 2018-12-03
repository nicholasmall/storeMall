"use strict";

$(function () {
    let popupUtils = new PopupUtils();
    $.utils.ajax({
        url: "/product/findList",
        success: function (data) {
            data.sort(compare);
            console.log("");
            data.forEach(function (product) {
                if (server_consts.language === "zh_CN") {
                    RenderingElement([product.categoriesZhCn, product.productDescribeZhCn, product.pictureUrl, product.productId, product.productTotal]);
                } else if (server_consts.language === "en") {
                    RenderingElement([product.categoriesEn, product.productDescribeEn, product.pictureUrl, product.productId, product.productTotal]);
                }
            })
        }, fail: function (error) {
            popupUtils.layerTips(error.message, server_consts.tips);
        }
    })
});

let compare = function (obj1, obj2) {
    let val1 = obj1.categoriesSmallId;
    let val2 = obj2.categoriesSmallId;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }
};

function RenderingElement(params) {
    let element = $("#productListDiv");
    let btnName = "";

    if (server_consts.language === "zh_CN") {
        if (params[4] > 0) {
            btnName = "立即购买";
        } else {
            btnName = "已售馨";
        }
    } else if (server_consts.language === "en") {
        if (params[4] > 0) {
            btnName = "Buy now";
        } else {
            btnName = "Sold out";
        }
    }

    element.append(`<div class="col-lg-4" onclick="location='${ server_consts.root + '/buyProduction?productId=' + params[3]}'">
        <div class="cardBody" >
            <div class="cardImg">
                <img src="${imgUrl + params[2]}">
            </div>
            <div class="cardDescription">
                <h4>${params[0]}</h4>
                <p>${params[1]}</p>
                  ${params[4] === 0 ? '<a class="btn btn-default" disabled="disabled" href="javascrpit:"return;" >' + btnName + '</a>'
        : '<a class="btn btn-default" >' + btnName + '</a>'}
            </div></div></div>`)
}