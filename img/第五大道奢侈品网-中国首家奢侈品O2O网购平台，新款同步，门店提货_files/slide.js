var _imgArray = new Array();
$(document).ready(function(){

/*scroll*/
	if($("#maincontent").length > 0){
		var scrollDistance = 528;
	} else{
		var scrollDistance = 0;
	}
	$("#navcontainer").css("width", "100%");
	$("#navcontainer").append($("#siteHeader").clone());
	$("#navcontainer").append($("#siteNavigation").clone());
	
	var IE6browser = (navigator.userAgent.indexOf("MSIE 6")>=0) ? true : false;
	
	if(!IE6browser){
		var _visiflag;
		setInterval(function(){
			if(scrollDistance < ___getPageScroll()[1]){
				if(!_visiflag){
					_visiflag = true;
					$("#navcontainer").show();
				}
			}else{
				if(_visiflag){
					_visiflag = false;
					$("#navcontainer").hide();
				}
//                                console.log(scrollDistance+'|'+___getPageScroll()[1]);
			}
//                        console.log('a');
		},33);
		
		
		if(scrollDistance < ___getPageScroll()[1]){
			_visiflag = true;
			$("#navcontainer").show();
		}else{
			_visiflag = false;
			$("#navcontainer").hide();
		}
	}
	$(".left,.right").VogueRollOver();
	
	
	
	
	if($("#maincontent").length){
		funcmaincontent();
	};

});

//自动向左边滚动
var flowdirection = 'left';
function autoflow(){
    setInterval(function(){
        
        var isfocus=false;
        
        if($("#maincontent").find(".right").is(':hover') || $("#maincontent").find(".left").is(':hover')){
                isfocus=true;
        }
        if($(".maincontent_navi").is(':hover')){
                isfocus=true;
        }
        if(!isfocus){
            if(flowdirection === 'left'){
                nextPage();
            }else{
                prevPage();
            }
            
        }
    },5000);
}
function funcmaincontent(){
	
	$("#maincontent").find(".main").css({
		"position":"absolute"
	});
        var mainlength = $("#maincontent").find(".element").length;
        var navi = '<ul>';
	for(var i = 0 ; i <  mainlength;i++){
            if($("#maincontent").find(".element").eq(i).find("img").attr("src")){
                _imgArray.push($("#maincontent").find(".element").eq(i).find("img").attr("src"));
            }
	}
        var piclenth = $("#maincontent").find(".pict").length;
	for(var i = 0 ; i <  piclenth;i++){
            /*生成navi*/
            var k = i+1;
            navi += '<li class="maincontent_navi_li" onmouseover="nextPage('+k+')"></li>';
	}
        navi +='</ul>';
        $('.maincontent_navi').html(navi);
	if(/*@cc_on!@*/false){
		//IE
		setTimeout(startslide,400);
	}else{
		//Non IE
		if(_imgArray.length){
			loopImageLoader(0);
		}else{
			setTimeout(startslide,400);
		}
	}
	
	function loopImageLoader(i){
	  var image1 = new Image();
	  image1.src = _imgArray[i];
	  image1.onload = function(){
		i++;
		if(_imgArray.length !== i){
		  loopImageLoader(i);
		}else{
			startslide();
		}
	  };
	}
	
}	
	var _maxpage = 0;
	var _currentpage = 0;
	
	function startslide(){
		$("#maincontent").find(".element").css("display","inline-block");
		
		$("#maincontent").find(".right").hide();
		$("#maincontent").find(".left").hide();
		
		$("#maincontent").find(".right").fadeIn(600);
		$("#maincontent").find(".left").fadeIn(600);
		
		$("#maincontent").find(".left,.right").VogueRollOver();
		
/*
		if($("#maincontent").find(".pict").length == 1){
			$("#maincontent").prepend($("#maincontent").find(".pict").clone());
			$("#maincontent").prepend($("#maincontent").find(".pict").clone());
			$("#maincontent").prepend($("#maincontent").find(".pict").clone());
		}else if($("#maincontent").find(".pict").length < 4){
			$("#maincontent").prepend($("#maincontent").find(".pict").clone());
		}
*/

		_maxpage = $("#maincontent").find(".pict").length;
		
		for(var i = 0 ; i < _maxpage ; i++){
			var _pos = Math.round(1440*(i-_currentpage)+$(window).width()/2-720);
			var _opa = 0.5;
			if(i === _currentpage)_opa = 1;
			if(_pos > $(window).width()){
				_pos -= _maxpage*1440 ;
			}else if(_pos < -1440){
				_pos += _maxpage*1440 ;
			}
			$("#maincontent").find(".pict").eq(i).css({
				left:_pos,
				opacity:0
			})
			.animate({
				opacity:_opa
			},{
				duration:400 ,
				easing:'linear'
			})
		}
		$("#maincontent").stop().find(".main").removeClass("main");
		$("#maincontent").stop().find(".pict").eq(_currentpage).addClass("main").css({"position":"absolute"});
		
		
		window.onresize = function(){
			for(var i = 0 ; i < _maxpage ; i++){
				var _pos = Math.round(1440*(i-_currentpage)+$(window).width()/2-720);
				var _opa = 0.5;
				if(i === _currentpage)_opa = 1;
				if(_pos > $(window).width()){
					_pos -= _maxpage*1440 ;
				}
				$("#maincontent").stop().find(".pict").eq(i).css({
					left:_pos,
					opacity:_opa
				})
			}
		}
		$("#maincontent").find(".right").click(nextPage);
		$("#maincontent").find(".left").click(prevPage);
                
                //开发自动轮播
                nextPage(1);
                autoflow();
	}

	
	function nextPage(p){
                flowdirection = 'left';
                 _currentpage++;
                if(p>0){
                    _currentpage = p-1;
                    
                }
                $('.maincontent_navi>ul>li').each(function(){
                    $(this).removeClass('maincontent_navi_selected');
                });
                
		
		if(_currentpage >  _maxpage-1)_currentpage = 0;
                
                $('.maincontent_navi>ul>li').eq(_currentpage).addClass('maincontent_navi_selected');
                
		$("#maincontent").stop().find(".main").removeClass("main");
		$("#maincontent").stop().find(".pict").eq(_currentpage).addClass("main").css({"position":"absolute"});;
		_pict = $("#maincontent").find(".pict");
		for(var i = 0 ; i < _maxpage ; i++){
			var _pos = Math.round(1440*(i-_currentpage)+$(window).width()/2-720);
			var _opa = 0.5;
			if(i === _currentpage)_opa = 1;
			if(_pos > $(window).width()){
				_pos -= _maxpage*1440;
			}else if(_pos < -1440*2){
				_pos += _maxpage*1440;
			}
			_pict.eq(i)
			.stop()
			.css({
				left:_pos+1440
			})
			.animate({
				left:_pos,
				opacity:_opa
			},{
				duration:700 ,
				easing:'easeOutQuint'
			})
		}
	}
	
	function prevPage(p){
                flowdirection = 'right';
		_currentpage--;
                if(_currentpage< 0)_currentpage = _maxpage -1;
                $('.maincontent_navi>ul>li').each(function(){
                    $(this).removeClass('maincontent_navi_selected');
                });
                if(p>0){
                    $('.maincontent_navi>ul>li').eq(p).addClass('maincontent_navi_selected');
                }else{
                    $('.maincontent_navi>ul>li').eq(_currentpage).addClass('maincontent_navi_selected');
                }
                
		
		$("#maincontent").stop().find(".main").removeClass("main");
		$("#maincontent").stop().find(".pict").eq(_currentpage).addClass("main").css({"position":"absolute"});;
		for(var i = 0 ; i < _maxpage ; i++){
			var _pos = Math.round(1440*(i-_currentpage)+$(window).width()/2-720);
			var _opa = 0.5;
			if(i === _currentpage)_opa = 1;
			if(_pos < -1440){
				_pos += _maxpage*1440
			}else if(_pos > $(window).width()+1440){
				_pos -= _maxpage*1440
			}
			$("#maincontent").find(".pict").eq(i)
			.stop()
			.css({
				left:_pos-1440
			})
			.animate({
				left:_pos,
				opacity:_opa
			},{
				duration:700 ,
				easing:'easeOutQuint'
			})
		}
	}
//}


/*----------------
ROLLOVER PLUG-IN
----------------*/

(function($){
  $.fn.VogueRollOver = function() {
    var _imgArray = new Array();
    for(var i = 0 ; i < this.length ; i++){
      var _str= this.eq(i).find("img").attr("src");
	  _str = _str.replace("_nouse.gif",".gif");
	  _str = _str.replace("_nouse.jpg",".jpg");
      _str= _str.replace(".gif","_on.gif");
	  _str= _str.replace(".jpg","_on.jpg");
      _imgArray.push(_str);
    }
    loopImageLoader(0);
    function loopImageLoader(i){
if(_imgArray[i]){
      var image1 = new Image();
      image1.src = _imgArray[i];
      image1.onload = function(){
        i++;
        if(_imgArray.length != i){
          loopImageLoader(i);
        }
      }
}
    }
    return this.hover(function(){
      var str = $(this).find("img").attr("src");
      if(str.indexOf("_on")===-1 && str.indexOf("_nouse")==-1){
        str = str.replace(".gif","_on.gif");
		str = str.replace(".jpg","_on.jpg");
        $(this).find("img").attr("src",str);
      }
    },function(){
      var str = $(this).find("img").attr("src");
      str = str.replace("_on.gif",".gif");
	  str = str.replace("_on.jpg",".jpg");
      $(this).find("img").attr("src",str);
    });
  };
})($);
jQuery.easing['jswing'] = jQuery.easing['swing'];

/*-----
EASING
------*/

jQuery.extend( jQuery.easing,{
	def: 'easeOutQuint',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	}
});

document.write('<style type="text/css">div#maincontent div.main{display:none;}div#maincontent div.element{position:absolute !important;}</style>')


/**
 / THIRD FUNCTION
 * getPageSize() by quirksmode.com
 *
 * @return Array Return an array with page width, height and window width, height
 */
//function ___getPageSize() {
//	var xScroll, yScroll;
//	if (window.innerHeight && window.scrollMaxY) {	
//		xScroll = window.innerWidth + window.scrollMaxX;
//		yScroll = window.innerHeight + window.scrollMaxY;
//	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
//		xScroll = document.body.scrollWidth;
//		yScroll = document.body.scrollHeight;
//	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
//		xScroll = document.body.offsetWidth;
//		yScroll = document.body.offsetHeight;
//	}
//	var windowWidth, windowHeight;
//	if (self.innerHeight) {	// all except Explorer
//		if(document.documentElement.clientWidth){
//			windowWidth = document.documentElement.clientWidth; 
//		} else {
//			windowWidth = self.innerWidth;
//		}
//		windowHeight = self.innerHeight;
//	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
//		windowWidth = document.documentElement.clientWidth;
//		windowHeight = document.documentElement.clientHeight;
//	} else if (document.body) { // other Explorers
//		windowWidth = document.body.clientWidth;
//		windowHeight = document.body.clientHeight;
//	}	
//	// for small pages with total height less then height of the viewport
//	if(yScroll < windowHeight){
//		pageHeight = windowHeight;
//	} else { 
//		pageHeight = yScroll;
//	}
//	// for small pages with total width less then width of the viewport
//	if(xScroll < windowWidth){	
//		pageWidth = xScroll;		
//	} else {
//		pageWidth = windowWidth;
//	}
//	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
//	return arrayPageSize;
//};
/**
 / THIRD FUNCTION
 * getPageScroll() by quirksmode.com
 *
 * @return Array Return an array with x,y page scroll values.
 */
function ___getPageScroll() {
	var xScroll, yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;	
	}
	arrayPageScroll = new Array(xScroll,yScroll);
	return arrayPageScroll;
};
/*
 * 延时加载图片@onivor,2015-01-05
 * lazyimg.ini();
 */
var lazyimg = {
    cacheimg:new Array(),//图片对象
    big_url:new Array(),//大图地址
    //入口
    ini:function(){
        var img=$('img[name=swimg]');
        var len = img.length;
        for(var i=0;i<len;i++ ){
            lazyimg.cacheimg[i] = new Image();
        }
        lazyimg.big_url.length = 0;//先清空
        $('.s_title').each(function(){
            lazyimg.big_url.push($(this).attr('title'));
        });
        lazyimg.start();
    },
    cache4browser:function(id,obj){
            try{
                
                lazyimg.cacheimg[id].src=lazyimg.big_url[id];
                if(/*@cc_on!@*/false){
                    //IE
//                    lazyimg.cacheimg[id].readyState="loading";
                    lazyimg.cacheimg[id].onreadystatechange =function(){
                    if(lazyimg.cacheimg[id].readyState==="complete"||lazyimg.cacheimg[id].readyState==="loaded"){ 
                        $(obj).attr("src",lazyimg.cacheimg[id].src);
                        }
                    } ;
                }else{
                    lazyimg.cacheimg[id].complete=false;
                    if(lazyimg.cacheimg[id].complete)
                    {
                        $(obj).attr("src",lazyimg.cacheimg[id].src);
                    }
                    lazyimg.cacheimg[id].onload=function()
                    {
                        $(obj).attr("src",lazyimg.cacheimg[id].src);
                    };
                }
                    
            }
            catch(e){}
            
        },
    start:function(ie){
            var img=$('img[name=swimg]');
            var i=0;
            img.each(function(){
//                $(this).attr('src',lazyimg.cacheimg[i].url0);
                lazyimg.cache4browser(i,this);
                i++;
            });
        }
};
$(document).ready(function(){
    lazyimg.ini();
});
