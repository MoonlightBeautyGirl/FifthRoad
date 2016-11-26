//顶部点击弹出广告
$('.click-popup').on('click',function(){
	$('.bg-popup').show();
});
$('.bg-popup a').click(function(){
	$(this).parent().hide();
})
//手机版下载二维码划入效果
$('.h30-app').hover(function(){
	$(this).css({
		border:'1px solid #eee',
		background:'#fff'
	});
	$('.h30-app-qr').show();
},function(){
	$(this).css({
		border:0,
		background:''
	});
	$('.h30-app-qr').hide();
})
//我的第五大道划入出现下拉菜单;
$('.h30-my').hover(function(){
	$(this).find('dd').show();
},function(){
	$(this).find('dd').hide();
});
//商品详情出现下拉效果;
$('li.cata-list').hover(function(){
	$('.leftmenu').show();
	$('.mask').show();
},function(){
	$('.leftmenu').hide();
	$('.mask').hide();
})
//购物袋的划入下拉
$('.title-cartbox').hover(function(){
	$('.shopping-bag').show();
},function(){
	$('.shopping-bag').hide();
})
//导航栏的图标移动效果；
$('.icon-wrap li').hover(function(){
	$(this).stop().animate({width:140}).siblings().stop().animate({width:30});
},function(){
	$(this).stop().animate({width:30});
})
//导航栏的商品分类；
$(function($){
	var $listBox = $('#listBox');
	var $right = $('#right');
	$.getJSON('json/list.json',function(result){
		$.each(result,function(index,items){
			$listBox.append('<li><div class="'+items.class+'"><a href="'+items.url+'">'+items.title+'</a><i></i></div></li>');
			var $block = $('<div class="rightBox"></div>');
			$.each(items.list,function(ix,it){
				var $col = $('<div class="groupe"></div>').append('<h3><a href="'+it.url+'">'+it.name+'</a></h3><div class="list"></div>');
				$.each(it.ppList,function(i,cell){
					if(cell.name){
						$col.children('div').append('<a href="'+cell.url+'">'+cell.name+'</a>')
					}else{
						var $lt = $('<dl><dt><a href="'+cell.url+'">'+cell.title+'</a></dt></dl>');
						$.each(cell.gList,function(ie,im){
							$lt.append('<dd><a href="'+im.url+'">'+im.name+'</a></dd>')
						})
						$col.children('div').append($lt);
					}
				})
				$block.append($col)
			})
			var $footer = $('<footer></footer>');
			$.each(items.quick_entry,function(index,items){
				$footer.append('<a href="'+items.url+'">'+items.name+'</a>')
				})
			$block.append($footer);
			$right.append($block);
				
		})
	})
})



//划入出现横向部分；

$('#leftmenu').on('mouseenter','li',function(){
		$('#right').css('top',36*$(this).index()).show();
		$(this).find('i').show();
		$(this).siblings().find('i').hide();
	 	$('#right').children().hide();
		$('#right').children().eq($(this).index()).show();
      });

$('#leftmenu').on('mouseleave','#leftmenu',function(){
        $('#right').hide();
      });



//侧边框的划入效果；
 $('.right-menu a').mouseover(function(){
 	$(this).children().eq(1).css('display','block');
 	$(this).css('background','#C69C6D');
 })
 $('.right-menu a').mouseout(function(){
 	$(this).children().eq(1).css('display','none');
 	$(this).css('background','#333');
 })
 //一键置顶；
 $('.tab-logo-rttop').click(function(){
 	clock();
 	var timer = setInterval(clock,1);
 	function clock(){
 		var obj = document.body.scrollTop?document.body:document.documentElement;
 		if(obj.scrollTop == 0){
 			clearInterval(timer);
 		}else{
 			obj.scrollTop-=50;
 		}
 	}
 })
 //广告栏的删除；
 $('.remain-center a').click(function(){
 	$(this).closest($('.remain-bottom')).hide();
 })