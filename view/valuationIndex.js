$(document).ready(function() {
    //刷新按钮
    $("#refresh").click(function(){
        window.location.reload();
    });
});

function showAddGoods(){
	layer.open({
        type: 2,
        title: '添加商品',
        area: ['80%', '80%'],
        content: path + '/goods/addGoodsIndex', //iframe 的 URL
        btn: ['保存继续','保存退出', '取消'],
        yes:function(index, layero){
            //按钮【按钮一】的回调
            var iWindow = layero.find("iframe")[0].contentWindow;
            var ir = iWindow.document;
            // 调用iframe中的方法，获取数据
            var details = iWindow.getDetail();
            var html = '';
            $.each(details,function(i,obj){
            	html += '<tr><td>'+obj.goodsName+'</td>';
            	html += '<td name="goodsPrice">'+obj.price+'</td>';
            	html += '<td name="goodsNum">'+obj.num+'</td></tr>';
            });
            $('#headTr').append(html);
            iWindow.$("input[name='count']").val("");
            //iWindow.window.location.reload();
        },
        btn2:function(index, layero){
            //按钮【按钮一】的回调
            var iWindow = layero.find("iframe")[0].contentWindow;
            var ir = iWindow.document;
            // 调用iframe中的方法，获取数据
            var details = iWindow.getDetail();
            var html = '';
            $.each(details,function(i,obj){
            	html += '<tr><td>'+obj.goodsName+'</td>';
            	html += '<td name="goodsPrice">'+obj.price+'</td>';
            	html += '<td name="goodsNum">'+obj.num+'</td></tr>';
            });
            $('#headTr').append(html);
            layer.close(index);
        }
    });
}

function valuation(){
	var isAudit = $('#isAudit').val();
	var prices = $("td[name='goodsPrice']");
	var nums = $("td[name='goodsNum']");
	if($('#isAudit') && isAudit.length <= 0){
		myLayer.msgErrorDef("请选择车主!");
		return;
	}
	if(prices.length <= 0){
		myLayer.msgErrorDef("请选择商品!");
		return;
	}
	var countMoney =  0;
	for(var i = 0; i< prices.length; i++){
		countMoney += parseFloat($(prices[i]).text())*parseInt($(nums[i]).text());
	}
	if(isAudit === "2"){
		countMoney = countMoney * 0.8;
		$('#countMoney').text("会员价:"+countMoney+"元");
	}else{
		$('#countMoney').text("非会员价:"+countMoney+"元");
	}
	
}

function selectUser(){
	layer.open({
        type: 2,
        title: '选择车主',
        area: ['80%', '80%'],
        content: path + '/user/selectUser', //iframe 的 URL
        btn: ['确定','取消'],
        yes:function(index, layero){
            //按钮【按钮一】的回调
            var iWindow = layero.find("iframe")[0].contentWindow;
            var ir = iWindow.document;
            // 调用iframe中的方法，获取数据
            var user = iWindow.getSelect();
            $('#userId').val(user[0].id);
            $('#userName').text(user[0].userName);
            $('#carNum').text(user[0].carNum);
            $('#isAudit').val(user[0].isAudit);
            $('#user').show();
            layer.close(index);
        }
    });
}