
/*显示隐藏*/
$(document).ready(function() {
    $(".brand_img").hover(function(){
       $(this).children(".brand_bg").show();
    },function(){
        $(this).children(".brand_bg").hide();
    });
    
     $(".bw_cur").hover(function(){
        $(this).children(".bw_bg").hide();
    },function(){
        $(this).children(".bw_bg").show();
    });
  
    /*
    $(".sublist_wall ul li").hover(function(){
        $(this).children(".bw_bg").stop(true,true).hide();
    },function(){
        $(this).children(".bw_bg").stop(true,true).show();
    });
    */
    
    /*阴影*/
    $(".clbrandg_box").hover(function(){
       $(this).addClass("hyinying");
       $(this).children(".clbrandg_textbg").addClass("hbg");
      /*购物车 $(this).children(".clbrandg_img").find(".goods_add_cars").css("display","block");
       $(this).children(".sale_img_box").find(".goods_add_cars").css("display","block");*/
                 
    },function (){
       $(this).removeClass("hyinying");
       $(this).children(".clbrandg_textbg").removeClass("hbg");
       /*购物车 $(this).children(".clbrandg_img").find(".goods_add_cars").css("display","none");
       $(this).children(".sale_img_box").find(".goods_add_cars").css("display","none");*/
    });
   /*页头*/
     $(function(){
       $(".menu_my_more li ").hover(function(){
          $(this).find(".menu_dd").show();
          $(this).addClass("my_5lux_more");
        },function(){
            $(this).find(".menu_dd").hide();
            $(this).removeClass("my_5lux_more");
        });
        //首页左侧公告
	$(".gonggao_box span").click(function(){
			$(".gonggao_box").hide();             
	});        
   });
  });
 
/*首页购物中心 - 分类点击定位*/
$(".quicktab").live("click", function() {
    var b = $(this).attr("anchor");
    $("html,body").scrollTop($("#" + b).offset().top);
    return false;
});
  
  var mainin = {
        init : function(){
            mainin.bannerpic();
            mainin.brandlogo();
            mainin.hotflag();
            mainin.hotflagslider();
            mainin.storesame();
            mainin.storesameli();
            mainin.shopcenter();
            mainin.goodslider();
            mainin.goods2slider();
            mainin.bankopen();
            mainin.bankborder();
            // 明星同款
            mainin.starstyle();
        },
        bannerpic : function(){
            $('.bannerx').bxSlider({'pager':false,'auto':true});
            $('.mainin_bannerbox').mouseover(function(){
                $('.mainin_banner .bx-wrapper .bx-prev').stop().animate({'opacity':'1','left':'340px'});
                $('.mainin_banner .bx-wrapper .bx-next').stop().animate({'opacity':'1','right':'340px'});
            });
            $('.mainin_bannerbox').mouseout(function(){
                $('.mainin_banner .bx-wrapper .bx-prev').stop().animate({'opacity':'0','left':'320px'});
                $('.mainin_banner .bx-wrapper .bx-next').stop().animate({'opacity':'0','right':'320px'});
            });
        },
        brandlogo : function(){
            $('.brandship_list li').mouseover(function(){
                $(this).find('.brand_hide').stop().animate({'top':'0'});
            });
            $('.brandship_list li').mouseout(function(){
                $(this).find('.brand_hide').stop().animate({'top':'100px'});
            });
        },
        hotflag : function(){
            $('.hotflagbox .hotflagson').mouseover(function(){
                $(this).find('.hotmiddle').stop().animate({'opacity':'1'});
                $(this).find('.topline').stop().animate({'width':'166px'},300);
                $(this).find('.rightline').stop().animate({'height':'85px'},300);
                $(this).find('.bottomline').stop().animate({'width':'166px'},300);
                $(this).find('.leftline').stop().animate({'height':'85px'},300);
            });
            $('.hotflagbox .hotflagson').mouseout(function(){
                $(this).find('.hotmiddle').stop().animate({'opacity':'0'});
                $(this).find('.topline').stop().animate({'width':'0'},300);
                $(this).find('.rightline').stop().animate({'height':'0'},300);
                $(this).find('.bottomline').stop().animate({'width':'0'},300);
                $(this).find('.leftline').stop().animate({'height':'0'},300);
            });
        },
        hotflagslider : function(){
            var liLength = parseInt($('.hotflagbox li').css('width'));
            var onOff = true;
            $('.hotflagbox').css('width',$('.hotflagbox li').length*liLength+'px');
            $('.hotarrowbtn .hot_pre').click(function(){
                if(parseInt($('.hotflagbox').css('left'))>=0){
                    return false;
                }

                if(onOff){
                    onOff = false;
                    $('.hotflagbox').animate({'left':parseInt($('.hotflagbox').css('left'))+liLength+'px'},function(){
                        onOff = true;
                    });  
                }
                
            });
            
            $('.hotarrowbtn .hot_next').click(function(){
                if(parseInt($('.hotflagbox').css('left'))<=($('.hotflagbox li').length-1)*-liLength){
                    return false;
                }
                if(onOff){
                    onOff = false;
                    $('.hotflagbox').animate({'left':parseInt($('.hotflagbox').css('left'))-liLength+'px'},function(){
                        onOff = true;
                    });
                }
                
            });
        },
        storesame : function(){
            //$('.storesame_box').css('width',($('.storesame_box li').length)*parseInt($('.storesame_box li').css('width')));
            $('.storesame_link li:first').css('background-color','#000');
            $('.storesame_link li').mouseover(function(){
                $('.storesame_link li').each(function(){
                    $(this).css('background-color','#999');
                });
                $(this).css('background-color','#000');
                $('.storesame_box').stop().animate({'left':$(this).index()*parseInt($('.storesame_box li').css('width'))*-1});
            });
        },
        storesameli : function(){
            $('.storesameb_top .storesame_top1').mouseover(function(){
                $(this).find('.storesametoptxt').stop().animate({'left':'-20px'});
                $(this).find('.storesametoppic').stop().animate({'left':'20px'});
            });
            $('.storesameb_top .storesame_top1').mouseout(function(){
                $(this).find('.storesametoptxt').stop().animate({'left':'0'});
                $(this).find('.storesametoppic').stop().animate({'left':'0'});
            });
            $('.storesameb_top .storesame_top2').mouseover(function(){
                $(this).find('.storesametoptxt').stop().animate({'left':'-20px'});
                $(this).find('.storesametoppic').stop().animate({'left':'20px'});
            });
            $('.storesameb_top .storesame_top2').mouseout(function(){
                $(this).find('.storesametoptxt').stop().animate({'left':'0'});
                $(this).find('.storesametoppic').stop().animate({'left':'0'});
            });
            $('.storesameb_bottom .storesamebottom1').mouseover(function(){
                $(this).find('.storesametoptxt').stop().animate({'left':'-20px'});
                $(this).find('.storesametoppic').stop().animate({'left':'20px'});
            });
            $('.storesameb_bottom .storesamebottom1').mouseout(function(){
                $(this).find('.storesametoptxt').stop().animate({'left':'0'});
                $(this).find('.storesametoppic').stop().animate({'left':'0'});
            });
        },
        shopcenter : function(){
            $('.shopcenter li').mouseover(function(){
                $(this).find('.shopcenterbox').stop().animate({'top':'-50px'});
            });
            $('.shopcenter li').mouseout(function(){
                $(this).find('.shopcenterbox').stop().animate({'top':'0'});
            });
        },
        goodslider : function(){
            $('.slider .sliderbox').bxSlider();
        },
        goods2slider : function(){
            $('.goods2 .goods2slider').bxSlider({
                pager:false
            });
            $('.goods2').mouseover(function(){
                $(this).find('.bx-prev').stop().animate({'left':'0'});
            });
            $('.goods2').mouseout(function(){
                $(this).find('.bx-prev').stop().animate({'left':'-30px'});
            });
            $('.goods2').mouseover(function(){
                $(this).find('.bx-next').stop().animate({'right':'0'});
            });
            $('.goods2').mouseout(function(){
                $(this).find('.bx-next').stop().animate({'right':'-30px'});
            });
            $('.goods2 .bx-prev').mouseover(function(){
                $(this).css('background-position','-385px -370px');
            });
            $('.goods2 .bx-prev').mouseout(function(){
                $(this).css('background-position','-299px -370px');
            });
            $('.goods2 .bx-next').mouseover(function(){
                $(this).css('background-position','-422px -370px');
            });
            $('.goods2 .bx-next').mouseout(function(){
                $(this).css('background-position','-338px -370px');
            });
        },
        bankchange : function(){
            var srcs="";
            var str="";
            srcs=$(this).find("a img").attr("src");
            str=srcs.replace('promotionpic.jpg','bank.jpg');
            $('.proright').find('a').attr('href',$(this).find('a').attr('href'));
            $('.proright').find('img').attr('src',str);
        },
        bankopen : function(){
            var ad_board_config = {
                 over: mainin.bankchange, // function = onMouseOver callback (REQUIRED)
                 timeout: 1, // number = milliseconds delay before onMouseOut
                 interval: 100, // number = milliseconds delay before trying to call over
                 out: function(){} // function = onMouseOut callback (REQUIRED)
            };
            $('.promotion3 .proleft .proleftpic').hoverIntent(ad_board_config);
        },
        bankborder : function(){
            $('.proleftpic').mouseover(function(){
                $(this).find('.topline').stop().animate({'width':'194px'},300);
                $(this).find('.rightline').stop().animate({'height':'65px'},300);
                $(this).find('.bottomline').stop().animate({'width':'194px'},300);
                $(this).find('.leftline').stop().animate({'height':'65px'},300);
            });
            $('.proleftpic').mouseout(function(){
                $(this).find('.topline').stop().animate({'width':'0'},300);
                $(this).find('.rightline').stop().animate({'height':'0'},300);
                $(this).find('.bottomline').stop().animate({'width':'0'},300);
                $(this).find('.leftline').stop().animate({'height':'0'},300);
            });
        },
        starstyle : function(){
            $('.darwin_3colum_one').mouseover(function(){
                $(this).find('dt').show();
            });
            $('.darwin_3colum_one').mouseout(function(){
                $(this).find('dt').hide();
            });
            $('.darwin_3colum_two').mouseover(function(){
                $(this).find('dt').show();
            });
            $('.darwin_3colum_two').mouseout(function(){
                $(this).find('dt').hide();
            });
        }
    };
    