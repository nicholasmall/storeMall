$(function(){
	
	
	$("#saveOrder").on("click",function(){
		
		var pGoods = [],
			addressId = $.chooseAddress.variable.chooseId === null ? "" : $.chooseAddress.variable.chooseId;
		
		if(!addressId){
			alert(server_consts.chooseAdress)
			return
		}
		
		
		$("#allGoods>tr").each(function(){
			var goodsId = $(this).attr("goodsId"),
			preferentialId = $(this).find(".preferentialType:eq(0)>div>p>input:checked").val();
			
			if(goodsId){
				pGoods.push({
					"goodsId": goodsId,
					"preferentialId": preferentialId
				})
			}
			
		});
		
		var param = {
			"addressId": addressId,
			"prepareOrderId": $("#allGoods").attr("prepareOrderId"),
			"pGoods": pGoods
		}
		
		$.utils.ajax({
			url : "/order/saveOrder",
			data: JSON.stringify(param),
			contentType: "application/json;charset=UTF-8",
			success : function(data) {
				window.location = server_consts.root + "/order/payOrder?orderNo=" + data
			},
			error : function(xhr, status, error) {
				console.log(error);
			}
		});
		
	});
	
	
	// 优惠
	$('.preferentialType .discountsBtn').on("click",function(even){
		
		$(document).trigger("click");
		$(this).toggleClass('discountsBtnactive');
		$(this).siblings().toggle();
		event.stopPropagation();
	})
	
	$(document).on("click",function(){
		var $btn = $(".preferentialType .discountsBox");
		$btn.hide();
		$btn.prev().removeClass('discountsBtnactive');
	});
	
	$(".preferentialType .discountsBox").on("click",function(even){
		event.stopPropagation();
	});
	
	$(".preferentialType").on("change",function(){
		
		if(server_consts.language == "zh_CN"){
			// 优惠价格
			var $this = $(this)
			var price = $this.next().next().next().html();
			$this.parents(".theGoods").find(".preferentialPrice").html(price);
			
			// 所有价格
			var totalPrice = parseFloat(0);
			$(".theGoods").each(function(){
				totalPrice += parseFloat($(this).find(".preferentialPrice").html());
			});
			$("#realPay").html(totalPrice.toFixed(2));
			
			$this.parents(".theGoods").find(".preferentialPrice").html(parseFloat($this.parents(".theGoods").find(".preferentialPrice").attr("data")).toFixed(2));
		}else{
			// 优惠价格
			var $this = $(this)
			var price = $this.next().next().next().html();
			$this.parents(".theGoods").find(".preferentialPrice").html(price);
			
			$this.next().next().next().parents("td").prev().find('.preferentialPrice').attr("data2",$this.next().next().next().attr("data"))
			var totalzh= parseFloat(0);
			
			// 所有价格
			var totalPrice = parseFloat(0);
			$(".theGoods").each(function(){
				totalPrice += parseFloat($(this).find(".preferentialPrice").html());
				totalzh += parseFloat($(this).find(".preferentialPrice").attr("data2"));
			});
			
			$("#realPay").html(totalPrice.toFixed(4));
			$("#realPay2").html(totalzh.toFixed(2));
			
			$this.parents(".theGoods").find(".preferentialPrice").html(parseFloat($this.parents(".theGoods").find(".preferentialPrice").attr("data")).toFixed(4));
		}
		
		return false;
		
	});
	
});