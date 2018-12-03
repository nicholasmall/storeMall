"use strict";

$(function() {
	
	//查询购物车列表
	shoppingQuery();
	function shoppingQuery() {
		$.utils
				.ajax({
					url : "/shoppingCart/queryshoppingCartList",
					success : function(data) {
						var div;
						if (data.length == 0) {
							div = '<div class="col-sm-12 orderList">'
								+ '<p class="title"><strong>'+server_consts.noAdd+'</strong></p>'
								+ '</div>'
						} else {
							div = '<div class="col-sm-12 orderList">'
									+ '<p class="title"><strong>'+server_consts.tableTitle+'</strong></p>'
									+ '<table class="table table-condensed">'
									+ '<colgroup>'
									+ '<col width="1%">'
									+ '<col width>'
									+ '<col width="5%">'
									+ '<col width="20%">'
									+ '<col width="7%">'
									+ '</colgroup>'
									+ '<thead>'
									+ '<tr>'
									+ '<th><button type="button" class="btn btn-default btn-xs selectAll">'+server_consts.selectAll+'</button></th>'
										+ '<th><div class="col-sm-3"></div><div class="col-sm-9">'+server_consts.productName+'</div></th>'
										+ '<th>'+server_consts.price+'</th>' + '<th>'+server_consts.count+'</th>'
										+ '<th>'+server_consts.total+'</th>' + '<th>'+server_consts.operation+'</th>' + '</tr>'
									+ '</thead>' + '<tbody class="condensedList">';
							for ( var i in data) {

								div += '<tr>'
										+ '<td style="vertical-align: middle;">'
										+ '<input type="checkbox" name="options" value="'+data[i].id+'">'
										+ '<input type="hidden" name="inventory" value="'+data[i].inventory+'"></td>'
										+ '<td><a href="'+server_consts.root+'/buyProduction?productId='+data[i].productId+'">'
										+ '<div class="col-sm-3">'
										+ '<img src='+imgUrl+''+data[i].pictureUrl+' width="70px">'
										+ '</div>'
										+ '<div class="col-sm-9">'
										if(server_consts.language == "zh_CN"){
											div += '<p>'+data[i].productNameZhCn+'</p>'
										}else{
											div += '<p>'+data[i].productNameEn+'</p>'
										}
										div += '</div>'
										+ '</a></td>'
										if(server_consts.language == "zh_CN"){
											div +=  '<td><p class="price">'+data[i].productPriceRMB+'</p></td>'
										}else{
											div +=  '<td><p class="price">'+data[i].productPriceUSD+'</p></td>'
										}
										div += '<td>'
										if(data[i].productQuantity <= 1){
											div += '<span class="glyphicon glyphicon-minus min" style="color:#ccc;pointer-events:none"></span>'
										}else{
											div += '<span class="glyphicon glyphicon-minus min"></span>'
										}
										div += '<input class="enteramount2" type="hidden" onkeyup=\'this.value=this.value.replace(/[^\\d]/g,"")\'  value='+data[i].productQuantity+'>'
										div += '<input class="enteramount" type="text" onkeyup=\'this.value=this.value.replace(/[^\\d]/g,"")\'  value='+data[i].productQuantity+'>'
										if(data[i].productLimitedPurchaseAmount < data[i].inventory){
											if(data[i].productQuantity >= data[i].productLimitedPurchaseAmount){
												div += '<span class="glyphicon glyphicon-plus add" style="color:#ccc;pointer-events:none"></span><br/>'
											}else{
												div += '<span class="glyphicon glyphicon-plus add"></span><br/>'
											}
										}else{
											if(data[i].productQuantity >= data[i].inventory){
												div += '<span class="glyphicon glyphicon-plus add" style="color:#ccc;pointer-events:none"></span><br/>'
											}else{
												div += '<span class="glyphicon glyphicon-plus add"></span><br/>'
											}
										}
										
										div += '<span style="margin-top:3px;display: block;">'+server_consts.inventory+':<span class="inventoryShow">'+data[i].inventory+'</span>'
										+ '<span style="margin-left:20px">'+server_consts.limitedPurchaseAmount+':<span class="productLimitedPurchaseAmountShow">'+data[i].productLimitedPurchaseAmount+'</span></span></span>'
										+ '</td>'
										if(server_consts.language == "zh_CN"){
											div +=  '<td><p class="totalPrices">'+accMul(data[i].productPriceRMB , data[i].productQuantity)+'</p></td>'
										}else{
											div +=  '<td><p class="totalPrices">'+accMul(data[i].productPriceUSD , data[i].productQuantity)+'</p></td>'
										}
										div += '<td><a class="del">'+server_consts.deleteData+'</a></td>'
										+ '</tr>';
							}
							div += '</tbody>'
									+ '</table>'
									+ '<div class="col-sm-12" style="padding: 0;">'
									+ '<div class="col-sm-12 clearbox">'
									+ '<a class="bulk" style="float:left;">'+server_consts.deleteSelectedProduct+'</a>'
									+ '<button type="button" class="btn submitOrder">'+server_consts.checkOut+'</button>'
									+ '</div>' + '</div>' + '</div>'
						}
						$("#shoppingCartList").append(div);
						submitFlag = true;
					}
				})
	}
	
	/*删除*/
	$("#shoppingCartList").on("click",".table-condensed .del",function(){
		if(submitFlag==false){
			return;
		}
		var even = this;
		var id = $(even).parent().parent().find("input[type='checkbox']").val();
		 $.utils.ajax({
	            url: "/shoppingCart/delete",
	            data: {ids: id},
	            success: function (data) {
	            	var condensedList = $(even).parent().parent().parent().children();
	            	var condensedIndex = condensedList.length;
	            	$(even).parent().parent().remove();
	            	if(condensedIndex <= 1){
	            		if(server_consts.language == "zh_CN"){
	            			$("#shoppingCartList").find('.orderList').html('<strong>暂未添加购物车</strong>');
						}else{
							$("#shoppingCartList").find('.orderList').html('<strong>No shopping cart added</strong>');
						}
	            	}
	            }
	        })
	})
	/*批量删除*/
	$("#shoppingCartList").on("click",".clearbox .bulk",function(){
		if(submitFlag==false){
			return;
		}
		var even = this;
		var data = $(this).parent().parent().parent().find("input[name='options']:checked");
		var ids = [];
		if(data.length<=0){
            alert(server_consts.selectData);
            return;
        }
		for ( var i=0;i<data.length;i++) {
			ids.push(data[i].value)
		}
		 $.utils.ajax({
	            url: "/shoppingCart/delete",
	            data: {ids: ids.join(",")},
	            success: function () {
	            	$(data).each(function(){ 
	            		var condensedList = $(even).parent().parent().parent().find('.condensedList').children();
		            	var condensedIndex = condensedList.length;
		            	$(this).parent().parent().remove();
		            	if(condensedIndex <= 1){
		            		if(server_consts.language == "zh_CN"){
		            			$("#shoppingCartList").find('.orderList').html('<strong>暂未添加购物车</strong>');
							}else{
								$("#shoppingCartList").find('.orderList').html('<strong>No shopping cart added</strong>');
							}
		            	}
	                });
	            }
	        })
	})
	
	/*全选*/
	var s = 1;
	$("#shoppingCartList").on("click",".selectAll",function(){
		var options = $(this).parent().parent().parent().parent().find("input[name='options']");
		if(s == 1){
			options.prop('checked', true);
			s = 2;
		}else{
			options.prop('checked', false);
			s = 1;
		}
		
	})
	
	
	/*批量结算*/
	$("#shoppingCartList").on("click",".submitOrder",function(){
		if(submitFlag==false){
			return;
		}
		var data = $(this).parent().parent().parent().parent().find("input[name='options']:checked");
		var ids = [];
		if(data.length<=0){
			alert(server_consts.selectData);
            return;
        }
		for ( var i=0;i<data.length;i++) {
			ids.push(data[i].value)
		}
		 $.utils.ajax({
	            url: "/shoppingCart/checkout",
	            data: {ids: ids.join(",")},
	            success: function (data) {
	            	window.location.href = server_consts.root + "/order/prepareOrder?prepareOrderId="+data
	            },
	            fail: function(data){
	            	alert(data.message);
	            	$("#shoppingCartList").empty();
            		shoppingQuery();
	            }
	        })
	})
	/*增加*/
	$("#shoppingCartList").on("click",".orderList .add",function(){
		if(submitFlag==false){
			return;
		}
		var even = this;
		var id = $(this).parent().parent().find("input[type='checkbox']").val();
		var inventory = $(even).siblings().find(".inventoryShow").text();
		var productLimitedPurchaseAmount = parseInt($(even).siblings().find(".productLimitedPurchaseAmountShow").text());
		var price = $(this).parent().parent().find('.price').text();
		var priceInput = $(this).parent().find('.enteramount');
		var priceInput2 = $(this).parent().find('.enteramount2');
		var priceInputInt = parseInt(priceInput.val());
		var totalPrices = $(this).parent().parent().find('.totalPrices');
		$.utils.ajax({
            url: "/shoppingCart/update",
            data: {id: id , productQuantityWeb: parseInt(priceInput.val()) + 1},
            success: function (data) {
            	data = parseInt(data);
            	if(productLimitedPurchaseAmount < data){
            		if(priceInputInt + 1 >= productLimitedPurchaseAmount){
            			$(even).css('color',"#ccc");
            			$(even).css('pointer-events',"none");
            		}
                	if(priceInputInt + 1 > 1){
            			$(even).parent().find('.min').css('color',"#8a8a8a");
            			$(even).parent().find('.min').css('pointer-events',"auto");
            		}
            	}else{
            		if(priceInputInt + 1 >= data){
            			$(even).css('color',"#ccc");
            			$(even).css('pointer-events',"none");
            		}
                	if(priceInputInt + 1 > 1){
            			$(even).parent().find('.min').css('color',"#8a8a8a");
            			$(even).parent().find('.min').css('pointer-events',"auto");
            		}
            	}
            	priceInput.val(parseInt(priceInput.val()) + 1);
    			priceInput2.val(parseInt(priceInput.val()));
            	$(even).siblings().find(".inventoryShow").text(data);
            	var all = accMul(price , parseInt(priceInput.val()))
        		totalPrices.text(all);
            },
            fail: function(data){
            	alert(data.message);
            	$("#shoppingCartList").empty();
        		shoppingQuery();
            }
        })
	})
	/*减少*/
	$("#shoppingCartList").on("click",".orderList .min",function(){
		if(submitFlag==false){
			return;
		}
		var even = this;
		var id = $(this).parent().parent().find("input[type='checkbox']").val();
		var price = $(this).parent().parent().find('.price').text();
		var priceInput = $(this).parent().find('.enteramount');
		var priceInput2 = $(this).parent().find('.enteramount2');
		var totalPrices = $(this).parent().parent().find('.totalPrices');
		var inventory = $(even).siblings().find(".inventoryShow").text();
		var productLimitedPurchaseAmount = $(even).siblings().find(".productLimitedPurchaseAmountShow").text();
		$.utils.ajax({
            url: "/shoppingCart/update",
            data: {id: id,productQuantityWeb: parseInt(priceInput.val()-1)},
            success: function (data) {
            	data = parseInt(data);
            	if (parseInt(priceInput.val()) <= 2) {
        			$(even).css('color',"#ccc");
        			$(even).css('pointer-events',"none");
        		}
            	if(productLimitedPurchaseAmount < data){
            		if (parseInt(priceInput.val())  >= 2 && parseInt(priceInput.val()) -1 < productLimitedPurchaseAmount) {
            			$(even).parent().find('.add').css('color',"#8a8a8a");
            			$(even).parent().find('.add').css('pointer-events',"auto");
            			priceInput.val(parseInt(priceInput.val()) - 1)
            			priceInput2.val(parseInt(priceInput.val()));
            		}
            	}else{
            		if (parseInt(priceInput.val())  >= 2 && parseInt(priceInput.val()) -1 < parseInt(data)) {
            			$(even).parent().find('.add').css('color',"#8a8a8a");
            			$(even).parent().find('.add').css('pointer-events',"auto");
            			priceInput.val(parseInt(priceInput.val()) - 1)
            			priceInput2.val(parseInt(priceInput.val()));
            		}
            	}
            	
            	$(even).siblings().find(".inventoryShow").text(data);
            	$(even).parent().parent().find("input[name='inventory']").val(data);
            	var all = accMul(price , parseInt(priceInput.val()))
        		totalPrices.text(all);
            },
            fail: function(data){
            	alert(data.message);
            	$("#shoppingCartList").empty();
        		shoppingQuery();
            }
        })
	})
	var submitFlag = true;
	/*监听输入框*/
	$("#shoppingCartList").on("change",".orderList .enteramount",function(){
		/*原始数据*/
		submitFlag = false;
		var even = this;
		var priceInputIntBefore = $(this).parent().find('.enteramount2').val();
		var priceInputInt = $(this).val();
		var price = $(this).parent().parent().find('.price').text();
		var totalPrices = $(this).parent().parent().find('.totalPrices');
		var productLimitedPurchaseAmount = parseInt($(even).siblings().find(".productLimitedPurchaseAmountShow").text());
		var add = $(this).parent().find('.add');
		var min = $(this).parent().find('.min');
		var id = $(this).parent().parent().find("input[type='checkbox']").val();
		var r = /^\+?[0-9][0-9]*$/;
		var patrn = /^([1-9]\d*|0)(\.\d*[1-9])?$/;
		if(r.test(priceInputInt)==false || !patrn.exec(priceInputInt)){
			$(this).val(priceInputIntBefore);
			alert(server_consts.positiveInteger);
			return;
		}
		if(parseInt(priceInputInt) < 1){
			$(this).val(parseInt(priceInputIntBefore));
			alert(server_consts.positiveInteger);
			return;
		}
			$.utils.ajax({
	            url: "/shoppingCart/update",
	            data: {id: id,productQuantityWeb: parseInt(priceInputInt)},
	            success: function (data) {
	            	submitFlag = true;
	            	if(productLimitedPurchaseAmount < data){
	            		if(parseInt(priceInputInt) == productLimitedPurchaseAmount){
		        			add.css('color',"#ccc");
		        			add.css('pointer-events',"none");
		        			min.css('color',"#8a8a8a");
		        			min.css('pointer-events',"auto");
		        		}
		        		if(parseInt(priceInputInt) > 1 && parseInt(priceInputInt) < productLimitedPurchaseAmount){
		        			min.css('color',"#8a8a8a");
		        			min.css('pointer-events',"auto");
		        			add.css('color',"#8a8a8a");
		        			add.css('pointer-events',"auto");
		        		}
		        		$(even).parent().find('.enteramount2').val(parseInt(productLimitedPurchaseAmount))
	            	}else{
	            		if(parseInt(priceInputInt) == parseInt(data)){
		        			add.css('color',"#ccc");
		        			add.css('pointer-events',"none");
		        			min.css('color',"#8a8a8a");
		        			min.css('pointer-events',"auto");
		        		}
		        		if(parseInt(priceInputInt) > 1 && parseInt(priceInputInt) < parseInt(data)){
		        			min.css('color',"#8a8a8a");
		        			min.css('pointer-events',"auto");
		        			add.css('color',"#8a8a8a");
		        			add.css('pointer-events',"auto");
		        		}
		        		$(even).parent().find('.enteramount2').val(parseInt(data))
	            	}
	        		if(parseInt(priceInputInt) == 1){
	        			min.css('color',"#ccc");
	        			min.css('pointer-events',"none");
	        			add.css('color',"#8a8a8a");
	        			add.css('pointer-events',"auto");
	        		}
	            	$(even).siblings().find(".inventoryShow").text(data);
	        		var all = accMul(price , parseInt(priceInputInt))
	        		totalPrices.text(all);
	            },
	            fail: function(data){
	            	alert(data.message);
	            	$("#shoppingCartList").empty();
            		shoppingQuery();
	            }
	        })
		
	})
	function accMul(arg1,arg2){
		var m=0,s1=arg1.toString(),s2=arg2.toString();
		try{m+=s1.split(".")[1].length}catch(e){}
		try{m+=s2.split(".")[1].length}catch(e){}
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
	}
	
});
