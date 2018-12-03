"use strict";
let problemData = [];
let displayLength = 7;
$(function () {
    $.getJSON(server_consts.root + "/static/data/help.json", function (data) {
        data = data[server_consts.language];
        renderProblemData(data.problem);
        // renderVideo(data.video);
        renderInstructions(data.file);
        load();
    });

    /**
     * 操作说明
     * @param data
     */
    function renderInstructions(data) {
        let instructionsDiv = $("#instructionsDiv");
        // instructionsDiv.append(`<div class="content3" style="padding-top: 50px;"></div>`);
        let lang = {};
        if (server_consts.language === "zh_CN") {
            lang = {size: "大小", download: "下载文档", fileType: "文件"};
        } else if (server_consts.language === "en") {
            lang = {size: "size", download: "download", fileType: "fileType"};
        }
        data.forEach(function (v) {
            instructionsDiv.append(`<div class="col-sm-6"><div class="col-sm-6"><img src="${server_consts.root}/static/images/img/chanjian.png" style="width: 100%"/></div>
                <div class="col-sm-6"><p>${v.name}</p><p>${lang.fileType + ":" + v.type}</p><p>${lang.size + ":" + v.size}</p>
                <p><img src="${server_consts.root}/static/images/img/xiazai.png" style="width: 19px;">
                <a href="${server_consts.root}/static/data/Instruction_to_SAFEGEM_Wallet.pdf" target="_blank">${lang.download}</a></p></div>
            </div>`);
        })
    }

    /**
     * 视频说明
     * @param data
     */
    function renderVideo(data) {
        let videoDiv = $("#videoDiv");
        data.forEach(function (v) {
            videoDiv.append(`<div class="col-sm-4">
                <img src="${server_consts.root}/static/images/img/caozuo.png"/>
                <p class="video_p" style="padding-top: 10px;">${v.title}</p>
                <p class="video_p" style="color:#D2D2D2;">${server_consts.language === "en" ? "duration" : "时长"}：${v.duration}</p>
            </div>`);
        })
    }

    /**
     * 常见问题
     * @param data
     */
    function renderProblemData(data) {
        let title = $("#titleUl");
        data.title.forEach(function (v, i) {
            title.append(`<li ${i === 0 ? "class='li_active'" : ""}><a href="#">${data.title[i]}</a></li>`);
        });
        let explain = $("#explainDiv");
        data.explain.forEach(function (v, i) {
            if (i > 1) {
                explain.append(`<div class="content_${i}" style="display: none"><div class="panel-group"></div></div>`);
            } else {
                explain.append(`<div class="content_${i}" ><div class="panel-group"></div></div>`);
            }
            problemData.push(v);
        });
        setProblemPages(0);
    }

});

/*导航*/
function load() {

    $(document).on("click", '.liNum li', function () {
        let liIndex = $(this).index();
        setProblemPages(liIndex, 1);
        $(this).addClass('li_active').siblings().removeClass('li_active');
        $('.content_' + liIndex).css('display', 'block').siblings().css('display', 'none');
    });

    /*内容显示隐藏*/
    $(document).on("click", '.panel-heading', function () {
        $(this).siblings().toggle(300);
    });

}

/**
 * 设置分页数据
 * @param index
 * @param page
 */
function setProblemPages(index, page) {
    index = index || 0;
    page = page || 1;
    let problemPages = $("#problemPages");
    problemPages.empty();
    let pageLanguage = {};
    if (server_consts.language === "zh_CN") {
        pageLanguage = {
            home: "首页",
            previous: "上一页",
            next: "下一页",
            last: "末页"
        }
    } else if (server_consts.language === "en") {
        pageLanguage = {
            home: "home",
            previous: "previous",
            next: "next",
            last: "last"
        }
    }
    let endPage = parseInt((problemData[index].length / 10) + 1);
    setPageButs(page, endPage, function (start, end) {
        if (page === 1) {
            problemPages.append(`<li><span disabled="disabled">${pageLanguage.home}</span></li>`);
            problemPages.append(`<li><span disabled="disabled">${pageLanguage.previous}</span></li>`);
        } else {
            problemPages.append(`<li><span onclick="setProblemPages(${index},1)">${pageLanguage.home}</span></li>`);
            problemPages.append(`<li><span onclick="setProblemPages(${index},${page > 1 ? page - 1 : index})">${pageLanguage.previous}</span></li>`);
        }
        for (let i = start; i <= end; i++) {
            if (i === page) {
                problemPages.append(`<li><span disabled="disabled">${i}</span></li>`);
            } else {
                problemPages.append(`<li><span onclick="setProblemPages(${index},${i})">${i}</span></li>`);
            }
        }
        if (page === end) {
            problemPages.append(`<li><span disabled="disabled">${pageLanguage.next}</span></li>`);
            problemPages.append(`<li><span disabled="disabled">${pageLanguage.last}</span></li>`);
        } else {
            problemPages.append(`<li><span onclick="setProblemPages(${index},${page + 1 > endPage ? endPage : page + 1 })">${pageLanguage.next}</span></li>`);
            problemPages.append(`<li><span onclick="setProblemPages(${index},${ endPage})">${pageLanguage.last}</span></li>`);
        }

        renderingProblem(index, problemData[index].slice((page - 1) * 10, page * 10), (page - 1) * 10);
    });

}

/**
 * 从新加载数据
 * @param index
 * @param data
 * @param page
 */
function renderingProblem(index, data, page) {
    let theSon = $(`.content_${index}`).children(".panel-group");
    theSon.empty();
    data.forEach(function (v, i) {
        theSon.append(`<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">
            ${(page + i + 1) + "." + v.title} <img src="${server_consts.root}/static/images/img/jiantouxia.png" style="width: 10px;float: right;margin-top: 5px;"/>
            </h4></div><div class="panel-collapse ${i === 0 ? "" : "in"}"><div class="panel-body">${v.context}</div></div></div>`)
    });
}

/**
 * 获取分页的边界值
 * @param page
 * @param maxPage
 * @param cb
 */
function setPageButs(page, maxPage, cb) {
    let startPage = Math.round(page - displayLength / 2 + 1);
    let endPage = Math.round(page + displayLength / 2);
    if (startPage <= 1) {
        startPage = 1;
        endPage = startPage + displayLength - 1;
        if (endPage >= maxPage - 1) {
            endPage = maxPage - 1;
        }
    }
    if (endPage >= maxPage - 1) {
        endPage = maxPage;
        startPage = maxPage - displayLength + 1;
        if (startPage <= 1) {
            startPage = 1;
        }
    }
    cb(startPage, endPage);
}