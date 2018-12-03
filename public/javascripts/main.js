$(function () {
    $('.pop').popover({
        animation: true,
        trigger: 'manual',
        title: '',
        html: true,
        content: function () {
            var target = $(event.target);
            if (target.hasClass('icon1')) {
                return $("#icon1-content").html();
            }
            if (target.hasClass('icon2')) {
                return $("#icon2-content").html();
            }
            if (target.hasClass('icon3')) {
                return $("#icon3-content").html();
            }
            if (target.hasClass('icon4')) {
                return $("#icon4-content").html();
            }
            if (target.hasClass('icon5')) {
                return $("#icon5-content").html();
            }
        }
    }).on('mouseenter', function () {
        var _this = this;
        $(this).popover('show');
        $(this).siblings('.popover').on('mouseleave', function () {
            $(_this).popover('hide');
        });
    }).on('mouseleave', function () {
        var _this = this;
        setTimeout(function () {
            if (!$('.popover:hover').length) {
                $(_this).popover('hide');
            }
        }, 200);
    });

    $("#myMenu a:not(':last')").click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 800);
                return false;
            }
        }
    });

});