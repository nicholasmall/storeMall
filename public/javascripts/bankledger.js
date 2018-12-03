/**
 * @author 林延涛 <linyt@bankledger.com>
 * version: 1.0
 */
$(function() {
    'use strict';

    var Bankledger = function(el,options){

    	this.$el = $(el);
    	this.options = options;

    	this.initLocale();
    	this.initData();
    };

    var calculateObjectValue = function(self, name, args){
 	   var func = name;
 	   if (typeof func === 'function') {
            return func.apply(self, args);
        }
    };

    Bankledger.DEFAULTS = {
    	currentPage: 1, /** 当前页数 */
        pageSize: 10, /** 当前显示条数 */
        queryParams : undefined, /** 请求参数 */
        type : "POST", /** Ajax请求类型 */
        cache : false
    };

    Bankledger.LOCALES = {};

    Bankledger.LOCALES['zh_CN'] = {
        nextPage : function(){
        	return '下一页';
        },
        prevPage : function(){
        	return '上一页';
        },
        pageHome : function(){
        	return '首页';
        },
        endPage : function(){
        	return '尾页';
        }
    };

    $.extend(Bankledger.DEFAULTS, Bankledger.LOCALES['zh_CN']);

    Bankledger.prototype = {
    	initLocale : function () {
            if (this.options.locale) {
                var parts = this.options.locale.split(/-|_/);
                parts[0].toLowerCase();
                if (parts[1]) parts[1].toUpperCase();
                if ($.fn.bankledger.locales[this.options.locale]) {
                    // locale as requested
                    $.extend(this.options, $.fn.bankledger.locales[this.options.locale]);
                } else if ($.fn.bankledger.locales[parts.join('-')]) {
                    // locale with sep set to - (in case original was specified with _)
                    $.extend(this.options, $.fn.bankledger.locales[parts.join('-')]);
                } else if ($.fn.bankledger.locales[parts[0]]) {
                    // short locale language code (i.e. 'en')
                    $.extend(this.options, $.fn.bankledger.locales[parts[0]]);
                }
            }
        },
	    initData : function(){

	    	var that = this;
    		var params = {
    				currentPage : this.options.currentPage,
    				pageSize : this.options.pageSize
    		};
    		params = $.extend(params, this.options.queryParams);
    		if (this._xhr && this._xhr.readyState !== 4) {
    			this._xhr.abort();
            }
    		this._xhr = $.utils.ajax({
    			url : this.options.url,
    			type : this.options.type,
    			data : params,
    			success : function(res){

    				calculateObjectValue(that.options, that.options.responseHandler, [res]);
    				that.pagination(res);
    			},
    			fail : function(data){
    				if(that.options.responseFail && typeof that.options.responseFail === 'function'){
    					res = calculateObjectValue(data.errorMessage, that.options.responseFail, [res]);
					}
    			},
    			error : function(jqXHR, textStatus, errorThrown){

    				if(that.options.responseError && typeof that.options.responseError === 'function'){
    					res = calculateObjectValue(that.options.requestError(), that.options.responseError, [res]);
					}
    			}
    		});
	    },
	    changePage : function(currentPage,pageSize){

	    	this.options.queryParams = $.extend(this.options.queryParams, {
	    		pageSize :  pageSize,
	    		currentPage :  currentPage
	    	});

	    	this.initData();
	    },
	    pagination : function(data){
	    	var that = this;

	    	var totalPages = data.totalPage;
	    	var currentPage = data.currentPage;
	    	var pageSize = data.pageSize;

	    	var queryParamsCurrentPage = that.options.currentPage;
	    	if(that.options.queryParams){

	    		queryParamsCurrentPage = that.options.queryParams.currentPage;
	    	}
	    	if(totalPages > 0 && totalPages < queryParamsCurrentPage){
	    		currentPage = 1;
	    		$.extend(this.options.queryParams, {
		    		currentPage :  1
		    	});
	    		that.options.currentPage = 1;
	    		this.initData();
	    		return ;
	    	}
	    	if(totalPages > 1){
	    		var pageRecord = [];
	    		var from = 1;
	    		var to  = totalPages;
	    		if(totalPages >= 5){
	    			from = currentPage - 2;
	    			to = from + 4;
	    			if(from < 1){
	    				from = 1;
	    				to = 5;
	    			}
	    			if(to > totalPages){
    					to = totalPages;
    					from = to -4;
    				}
	    		}
	    		if(1 != from) pageRecord.push('<li class="item disabled"><a>...</a></li>');
	    		for(var i = from;i <= to; i++ ){
	    			pageRecord.push('<li class="page-num item '+ (currentPage == i ? 'active' : '')  +'" value="'+ i +'"><a>'+ i +'</a></li>');
	    		}
	    		if(totalPages != to) pageRecord.push('<li class="item disabled"><a>...</a></li>');
	    		var pageHtml = [];
	    		pageHtml.push('<ul class="pagination">');
	    		pageHtml.push('		<li class="item '+ (currentPage == 1 ? 'disabled' : '') +' page-first"><a>'+ that.options.pageHome() +'</a>');
	    		pageHtml.push('		<li class="item '+ (currentPage == 1 ? 'disabled' : '') +' page-pre"><a>'+ that.options.prevPage() +'</a>');
	    		pageHtml.push(			pageRecord.join(''));
	    		pageHtml.push('		<li class="item '+ (currentPage == totalPages ? 'disabled' : '') +' page-next"><a>'+ that.options.nextPage() +'</a>');
	    		pageHtml.push('		<li class="item '+ (currentPage == totalPages ? 'disabled' : '') +' page-last"><a>'+ that.options.endPage() +'</a>');
	    		pageHtml.push('</ul>');
	    		that.$el.html(pageHtml.join(''));

	    		that.$el.find(".page-first").click(function(){
	    			var prePage = (currentPage - 1);
	    			if(prePage <= 0){ return ; }

	    			that.changePage(1,pageSize);
	    		});
	    		that.$el.find(".page-pre").click(function(){
	    			var prePage = (currentPage - 1);
	    			if(prePage <= 0){ return ; }

	    			that.changePage(prePage,pageSize);
	    		});
	    		that.$el.find(".page-next").click(function(){
	    			var nextPage = (currentPage + 1);
	    			if(nextPage > totalPages){ return ; }

	    			that.changePage(nextPage,pageSize);
	    		});
	    		that.$el.find(".page-last").click(function(){

	    			var nextPage = (currentPage + 1);
	    			if(nextPage > totalPages){ return ; }
	    			that.changePage(totalPages,pageSize);
	    		});
	    		that.$el.find(".page-num").click(function(){

	    			var value = $(this).attr("value");
	    			that.changePage(value,pageSize);
	    		});
	    	}else{

	    		that.$el.html("");
	    	}
	    }
    };
    
    $.fn.bankledger = function(option){
    	var value,
    		$this = $(this),
    		data = $this.data('bankledger.table'),
    		args = Array.prototype.slice.call(arguments, 1),
    		options = $.extend({}, Bankledger.DEFAULTS, $this.data(),typeof option === 'object' && option);
    	if (typeof option === 'string') {
    		if($.inArray(option,allowedMethods) < 0){
    			throw new Error('Unknown method: ' + option);
    		}
    		
    		if (!data) {
    			throw new Error('Please init object');
            }
    		
    		value = data[option].apply(data, args);
    		
    		if (option === 'destroy') {
                $this.removeData('bankledger.table');
            }
    	}
    	if(options.cache){

        	if (!data) {
                $this.data('bankledger.table', (data = new Bankledger(this, options)));
            }
    	}else{
    		$this.data('bankledger.table', (data = new Bankledger(this, options)));
    	}
    	return typeof value === 'undefined' ? this : value;
    };
    
    $.fn.bankledger.Constructor = Bankledger;
    $.fn.bankledger.locales = Bankledger.LOCALES;
});
