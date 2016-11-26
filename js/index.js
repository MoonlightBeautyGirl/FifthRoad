//center
$.ajax({
	type:"get",
	async:true,
	url:"json/center.json",
	success:function(data){
		for(var i = 0;i<data.length;i++){
			//品牌旗舰部分创建元素；
			if(data[i].name == '品牌旗舰'){
				for(var j = 0;j<data[i].info.length;j++){
					$('.cent-cont-list').append('<li><a href="#"><img class="bgpic" src="img/'+data[i].info[j].url1+'"></a><div class="brand-ship"><div class="brand-hide"><img class="bdlogopic" src="img/'+data[i].info[j].url2+'"><p class="udline"><span class="blackbar"></span></p><p class="enbrand">'+data[i].info[j].title1+'</p><p class="chnbrand">'+data[i].info[j].title2+'</p></div></div></li>');
				}			
			}
			//热门旗舰店部分创建元素；
			if(data[i].name == "热门旗舰店"){
				$.each(data[i].list,function(index,items){
					var $li1 = $('<li></li>');
					$.each(items.pList,function(ix,it){
						var $col = $('<div class="hotflagson"></div>').append('<img src="img/'+it.url1+'"><div class="hotmiddle"><a href="'+it.url2+'"><p class="brandchnname">'+it.title3+'</p><div class="blacksline"><span></span></div></a></div><div class="topline"></div><div class="rightline"></div><div class="bottomline"></div><div class="leftline"></div>');
						$li1.append($col);
					})
					$('.cent-cont-hot').append($li1);
				})
			}
			//商场同款部分；
			if(data[i].name == "商场同款"){
				$.each(data[i].list,function(index,items){
					var $li = $('<li></li>');
					$.each(items.pList,function(ix,it){
						var $col = $('<div class="'+it.class+'"></div>');
						if(it.class == "same-left"){
							var $cen = $('<a href="'+it.url+'"><img src="img/'+it.src+'"></a>');
							$col.append($cen);
						}
						if(it.class == "same-right"){
							$.each(it.ppList,function(ie,im){
								var $cen = $('<div class="'+im.class+'"></div>');
								$.each(im.zList,function(ia,ib){
									if(ib.chname){
										var $zList = $('<div class="'+ib.class+'"><div class="same-topic"><p class="enbrand">'+ib.enname+'</p><p>'+ib.chname+'</p><p>￥ '+ib.price +'</p></div><div class="same-pic"><a href="'+ib.url+'"><img src="img/'+ib.src+'"></div>')
										$cen.append($zList);
									}else{
										var $zList = $('<div class="'+ib.class+'"><div class="same-topic"><p class="enbrand">'+ib.enname+'</p><p>￥ '+ib.price +'</p></div><div class="same-pic"><a href="'+ib.url+'"><img src="img/'+ib.src+'"></div>')
									$cen.append($zList);
									}	
								})
								$col.append($cen);
							})	
						}
						if(it.class == "darwin-col"){
							$.each(it.ppList,function(ic,ig){
								var $cen = $('<div class="'+ig.class+'"><dl><dd><a href="'+ig.url+'"><img src="img/'+ig.src+'"></a></dd><dt><a href="'+ig.url2+'"><ul><li>'+ig.english+'</li><li>'+ig.chname+'</li><li><b></b></li><li><span class="fsize14">'+ig.inf+'</span></li></ul></a></dt></dl></div>');
								$col.append($cen);
							})
							
						}
						$li.append($col);
					})
					$('.same-box').append($li);
				})
			}
			//购物中心部分；
			if(data[i].name == "购物中心"){
				// $.each(data[i].list,function(index,items){
				// 	var $list = $('<div class="goodstitle"><img class="txt" src="img/'+items.src+'"><div class="rightbtn"><a href="'+items.url+'"><span class="icon"></span><span class="morenext">SHOW MORE</span></a></div></div>');
				// 	$('.centers').prepend($list);
				// 	var $main = $('<div class="goods"></div>')
				// })
			}
			//主题活动部分;
			if(data[i].name == "主题活动"){
				$.each(data[i].list,function(index,items){
					var $col = $('<div class="'+items.title+'"></div>');
					 if(items.title == "promotion1"||items.title == "promotion2"){
							 $.each(items.ppList,function(ix,it){
							 var $cen = $('<div class="'+it.class+'"><a href="'+it.url+'"><img src="img/'+it.src+'"></a></div>')
							 $col.append($cen);
					 	})	
					 }else{
					 	var $cen = $('<div class="proleft"></div>');					 		
					 	$.each(items.ppList,function(ix,it){
					 		var $small = $('<div class="proleftpic"><div class="proleftbox"><a href="'+it.url+'"><img src="img/'+it.src+'"></a><div class="topline"></div><div class="rightline"></div><div class="leftline"></div><div class="bottomline"></div></div></div>')
					 		$cen.append($small);
					 		})
					 	$col.append($cen);
					 	var $rightbox = $('<div class="proright"></div>')
					 	$.each(items.prList,function(ie,im){
							var $right = $('<a class="'+im.class+'" href="'+im.url+'"><img src="img/'+im.src+'"></a>');
					 		$rightbox.append($right);
					 	})
					 	$col.append($rightbox);
					 }
					
					$('.promotion').append($col);
				})
			}
		}
	}
})

//品牌旗舰部分划上弹出效果；
$('.cent-cont-list').on('mouseenter','.brand-hide',function(){
	$(this).stop().animate({top:0},200,'swing');
})
$('.cent-cont-list').on('mouseleave','.brand-hide',function(){
	$(this).stop().animate({top:100},200,'swing');
})


//轮播图
$(function($){
		var $box = $('#box');
		var $ball = $('#ball');
		var $btns = $('#btns');
		var $cell = $btns.children();
		var $prev = $('#prev');
		var $next = $('#next');
		//添加计时器
		var $timer = setTimeout(move,2000);
		var $flag = true;
		var $i = 0;
		var $f = 1;
		//自动轮播函数
		function move(){
			$i+=$f;
			//判断临界点
			if($i == 5){
				$i = 1;
				$ball.css('left',0);
			}else if($i==-1){
				$i = 4;
				$ball.css('left',-5040);
			}
			//添加动画效果
			$ball.stop().animate({
				left:-$i*1260
			},300,function(){
				clearTimeout($timer);
				if($flag){
					$timer = setTimeout(move,2000);
				}
			})
			//焦点跟随
			$cell.eq($i%5).addClass('bingo').siblings().removeClass('bingo');
		}
		//鼠标滑入/滑出  
		$box.hover(function(){
			clearTimeout($timer);
			$flag = false;
			$('#prev,#next').show();
		},function(){
			$timer = setTimeout(move,2000);
			$flag = true;
			$('#prev,#next').hide();
		})
	
		//焦点点击
		$btns.on('click','li',function(){
			var $index = $(this).index();
			if($index<=2&&$i==5){
				$ball.css('left',0);
			}
			$i = $index;
			$ball.stop().animate({
				left:-$i*1260
			})
			$(this).addClass('bingo').siblings().removeClass('bingo');
		})
		//左右切换
		$prev.click(function(){
			$f = -1;
			move();
		})
		$next.click(function(){
			$f = 1;
			move();
		})
	})

//热门旗舰店部分淡入淡出效果以及对角边框效果;
$('.cent-cont-hot').on('mouseenter','.hotflagson',function(){
	$(this).children('img').stop().animate({opacity:0},200);
	$(this).children('.hotmiddle').stop().animate({opacity:1},200);
	$(this).children('.topline').stop().animate({width:'166px'},200);
	$(this).children('.bottomline').stop().animate({width:'166px'},200);
	$(this).children('.leftline').stop().animate({height:'84px'},200);
	$(this).children('.rightline').stop().animate({height:'84px'},200);
})
$('.cent-cont-hot').on('mouseleave','.hotflagson',function(){
	$(this).children('img').stop().animate({opacity:1},200);
	$(this).children('.hotmiddle').stop().animate({opacity:0},200);
	$(this).children('.topline').stop().animate({width:'0'},200);
	$(this).children('.bottomline').stop().animate({width:'0'},200);
	$(this).children('.leftline').stop().animate({height:'0'},200);
	$(this).children('.rightline').stop().animate({height:'0'},200);
})
//热门旗舰店部分左右切换以及边界判断；
var i = 0;
$('.hot-prev').on('click',function(){
	i--;
	if(i < 0){
		i =0;
		return false;
	}else{
		$('.cent-cont-hot').stop().animate({left:-i*1220+"px"}, 200);
	}
})
$('.hot-next').on('click',function(){
	i++;
	if(i > 2){
		i =2;
		return false;
	}else{
		$('.cent-cont-hot').stop().animate({left:-i*1220+"px"}, 200);
	}
})
//商场同款tab切换效果；
$('.same-link li').on('mouseenter',function(){
	$(this).css({
		backgroundColor:'#000'
	});
	$(this).siblings().css({
		backgroundColor:'#999'
	});
	$('.same-box').stop().animate({
		left:$(this).index()*(-1220)+'px'
	},200);
})
//商场同款的图片标题动态效果；
$('.same-box').on('mouseenter','.same',function(){
	$(this).children('.same-topic').stop().animate({
		left:'-10px'
	},200);
	$(this).find('img').stop().animate({
		right:'-10px'
	},200);
});
$('.same-box').on('mouseleave','.same',function(){
	$(this).children('.same-topic').stop().animate({
		left:'0'
	},200);
	$(this).find('img').stop().animate({
		right:'0'
	},200);
})
//商场同款第三部分的蒙版效果;
$('.same-box').on('mouseenter','.darwin-col1,.darwin-col2',function(){
	$(this).find('dt').show();
});
$('.same-box').on('mouseleave','.darwin-col1,.darwin-col2',function(){
	$(this).find('dt').hide();
})
//购物中心导航的翻转效果;
$('.spcenterbox').hover(function(){
	$(this).stop().animate({top:'-50px'},200);
},function(){
	$(this).stop().animate({top:'0'},200);
})
//主题活动左侧的对角渐变；
$('.promotion').on('mouseenter','.proleftbox',function(){
	$(this).children('.topline').stop().animate({width:'194px'},200);
	$(this).children('.bottomline').stop().animate({width:'194px'},200);
	$(this).children('.leftline').stop().animate({height:'65px'},200);
	$(this).children('.rightline').stop().animate({height:'65px'},200);
	$('.promotion').find('.proright a').eq($(this).parent().index()).show().siblings().hide();
});
$('.promotion').on('mouseleave','.proleftbox',function(){
	$(this).children('.topline').stop().animate({width:'0'},200);
	$(this).children('.bottomline').stop().animate({width:'0'},200);
	$(this).children('.leftline').stop().animate({height:'0'},200);
	$(this).children('.rightline').stop().animate({height:'0'},200);
});
