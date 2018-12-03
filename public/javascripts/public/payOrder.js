$(function(){
	
	$("#toPay").on("click", function(){
		
		window.open( server_consts.root + "/alipay/pay?orderNo=" + $(this).attr("orderNo") + "&platform=" + $.utils.platform())
		
		$("#payBox").show();
		$(".pay-close").on("click", function(){
			$(this).parent().parent().parent().hide();
		})
		
		$("#payfinish").on("click",function(){
			
			var orderNo = $(this).attr("orderNo");
			$.utils.ajax({
				url : "/alipay/query",
				data: {"orderNo": orderNo},
				success : function(data) {
					$("#payBox").hide();
					if(data){
						window.location = server_consts.root + "/order/paySuccess?orderNo=" + orderNo
					}else{
						$("#tipsBox").show();
						$("#tipsBox .pay-close, #popupTitle").on("click", function(){
							$("#tipsBox").hide();
						})
					}
					
				},
				error : function(xhr, status, error) {
					$("#payBox").hide();
					$("#tipsBox").show();
				}
			});
		});
		
		$("#otherpay").on("click",function(){
			$("#payBox").hide();
		});
		
	});
	
	
	
	
	
});