var navi = {
    _status:'closed',
    current_obj:'',
    _show:function(){
        var top = $('.nav').offset().top+$('.nav').height();
        //生成一个蒙版1
        var newMask = document.createElement("div");
        newMask.id = 'naviwrap';
        newMask.style.position = "absolute";
        newMask.style.zIndex = "0";
        newMask.style.width = document.body.scrollWidth + "px";
        newMask.style.height = document.body.scrollHeight + "px";
        newMask.style.top = top+"px";
        newMask.style.left = "0px";
        newMask.style.background = "#000";
        newMask.style.filter = "alpha(opacity=1)";
        newMask.style.opacity = "0.2";
        if($('#naviwrap').length ===0){
            document.body.appendChild(newMask);
        }

    },
    _close:function(){
        if($('#naviwrap').length >0){
            $('#naviwrap').remove();
            //$('.mbprice_wrap').hide();
        }
    },
    open:function(){
        if($(this).find("div").length > 0){

            $(".menu .hodh").hide();
            $(this).addClass("type_5luxli").children("a").removeClass("menu_a").addClass("type_5lux");
//            $(this).siblings().children("a").removeClass("cur");
            $(this).find(".hodh").show();
            navi._show();

        }
    },
    hide:function(){
        navi._status = 'closed';
        navi._close();
        $(".menu .hodh").hide();
        if(!$(this).hasClass('home')){
            $(this).removeClass("type_5luxli").children("a").addClass("menu_a").removeClass("type_5lux");
        }
//        $(this).children("a").removeClass("cur");
        navi.current_obj = ''; 
    }
};
var v30_navi = {
    ini:function(){
        // 动画
        v30_navi.animation();
        v30_navi.leftacher();
    },
    //动画
    animation:function(){
        $('#icon_wrap').find('li').each(function(){
            $(this).mouseenter(function(){
                var obj = this;
                $(obj).siblings().stop().animate({width:'30px'},500);
                $(obj).stop().animate({width:'140px'},500);
            });
            $(this).mouseleave(function(){
                var _this = this;
                 $(_this).stop().animate({width:'30px'},500);
            });
        });
    },
    // 鼠标hover左侧
    leftacher:function(){
        $('.group').each(function(){
            $(this).hover(function(){
                //左侧下拉条箭头
                $('.group').find('i').hide();
                $(this).find('i').show();
                //透明度
                $(this).css('filter','alpha(opacity=100)');
                $(this).css('-moz-opacity','1');
                $(this).css('-khtml-opacity','1');
                $(this).css('opacity','1');
            });
            $(this).mouseleave(function(){
                //透明度
                $(this).css('filter','alpha(opacity=85)');
                $(this).css('-moz-opacity','0.85');
                $(this).css('-khtml-opacity','0.85');
                $(this).css('opacity','0.85');
            });
        });
    }
};
var config = {    
     over: navi.open, // function = onMouseOver callback (REQUIRED)    
     timeout: 1, // number = milliseconds delay before onMouseOut    
     interval: 1, // number = milliseconds delay before trying to call over    
     out: navi.hide // function = onMouseOut callback (REQUIRED)    
};

$(document).ready(function(){
    
    $(".menu .hodh").hide();
    $('.cata_list').hoverIntent(config);
    v30_navi.ini();


});



