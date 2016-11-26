$.ajax({
	type:"get",
	async:true,
	url:"../json/huodong.json",
	success:function(data){
		console.log(data);
		for(var i = 0; i< data.length;i++){
			if(data[i].floor =='1'){
				for(var j = 0 ;j < data[i].info.length;j++){
					$('.products0').append('<li class="proli"><div><a href="#"><img src="../img/'+data[i].info[j].url+'"><span class="btn">立即购买</span></a></div><a href="#"><p style="margin-top:5px;" title="'+data[i].info[j].name+'">'+data[i].info[j].name+'</p><p>'+data[i].info[j].disc+'</p><p>买赠价￥<span class="price">'+data[i].info[j].price+'</span></p></a></li>');
				}
			}
			if(data[i].floor == '2'){
				for(var j = 0 ;j < data[i].info.length;j++){
					$('.products1').append('<li class="proli"><div><a href="#"><img src="../img/'+data[i].info[j].url+'"><span class="btn">立即购买</span></a></div><a href="#"><p style="margin-top:5px;" title="'+data[i].info[j].name+'">'+data[i].info[j].name+'</p><p>'+data[i].info[j].disc+'</p><p>买赠价￥<span class="price">'+data[i].info[j].price+'</span></p></a></li>');
				}
			}
			if(data[i].floor == '3'){
				for(var j = 0 ;j < data[i].info.length;j++){
					$('.products2').append('<li class="proli"><div><a href="#"><img src="../img/'+data[i].info[j].url+'"><span class="btn">立即购买</span></a></div><a href="#"><p style="margin-top:5px;" title="'+data[i].info[j].name+'">'+data[i].info[j].name+'</p><p>'+data[i].info[j].disc+'</p><p>买赠价￥<span class="price">'+data[i].info[j].price+'</span></p></a></li>');
				}
			}
			if(data[i].floor == '4'){
				for(var j = 0 ;j < data[i].info.length;j++){
					$('.products3').append('<li class="proli"><div><a href="#"><img src="../img/'+data[i].info[j].url+'"><span class="btn">立即购买</span></a></div><a href="#"><p style="margin-top:5px;" title="'+data[i].info[j].name+'">'+data[i].info[j].name+'</p><p>'+data[i].info[j].disc+'</p><p>买赠价￥<span class="price">'+data[i].info[j].price+'</span></p></a></li>');
				}
			}
			if(data[i].floor == '5'){
				for(var j = 0 ;j < data[i].info.length;j++){
					$('.products4').append('<li class="proli"><div><a href="#"><img src="../img/'+data[i].info[j].url+'"><span class="btn">立即购买</span></a></div><a href="#"><p style="margin-top:5px;" title="'+data[i].info[j].name+'">'+data[i].info[j].name+'</p><p>'+data[i].info[j].disc+'</p><p>买赠价￥<span class="price">'+data[i].info[j].price+'</span></p></a></li>');
				}
			}
			if(data[i].floor == '6'){
				for(var j = 0 ;j < data[i].info.length;j++){
					$('.products5').append('<li class="proli"><div><a href="#"><img src="../img/'+data[i].info[j].url+'"><span class="btn">立即购买</span></a></div><a href="#"><p style="margin-top:5px;" title="'+data[i].info[j].name+'">'+data[i].info[j].name+'</p><p>'+data[i].info[j].disc+'</p><p>买赠价￥<span class="price">'+data[i].info[j].price+'</span></p></a></li>');
				}
			}
		}
	}
});
