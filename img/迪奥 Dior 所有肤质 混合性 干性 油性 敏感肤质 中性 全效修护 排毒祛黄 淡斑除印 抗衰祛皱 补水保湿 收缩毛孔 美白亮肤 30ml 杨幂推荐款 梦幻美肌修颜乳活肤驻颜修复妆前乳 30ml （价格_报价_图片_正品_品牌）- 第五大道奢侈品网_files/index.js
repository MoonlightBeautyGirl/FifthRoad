/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var v30_good = {
    ini:function(){
//        $('.gd30tbmi_qrcode').click(function(){
//            v30_good.qrcode_toggle();
//        });
        $(".gd30tbmi_qrcode").hover(function(){
                v30_good.qrcode_toggle();
            },function(){
                v30_good.qrcode_toggle();
            });
        $('.gd30tmb_head').click(function(){
            v30_good.board_toggle();
        });
        $('.gd30p_show').click(function(){
            v30_good.promote_toggle();
        });
        $(window).bind('scroll',v30_good.hscrool);
        $('.gd30btmi_swith>li').each(function(index){
            $(this).click(function(){
                v30_good.switchtab(index);
            });
        });
        $('.bookingtostore').click(function(){
            v30_good.testpopbox();
        });
        $('.gd30_share').click(function(){
            v30_good.sharebox();
        });
    },
    //显示详情二维码
    qrcode_toggle:function(){
        $('.gd30tbmiq').toggle();
    },
    //显示左侧board
    board_toggle:function(){
        $('.gd30tmb_show').toggle();
    },
    //显示活动
    promote_toggle:function(){
        if($('.gd30p_show').attr('title') === '1'){
            $('#gd30_promotebox').css('height','35px');
            $('.gd30p_show').attr('title','');
        }else{
            $('#gd30_promotebox').css('height','auto');
            $('.gd30p_show').attr('title','1');
        }
    },
    //浮动
    hscrool:function(){
            
            var p=$(document).scrollTop();
            if(p>800){
                $('#gd30_taball').css('position','fixed').css('top','0px').css('left','0px').css('z-index','3');
				$(".gd30tmb_show").css({"position":"fixed","top":"35px","display":"none"});
                $('#gd30_taball').addClass('gd_tabfixed');
                $('.gd30tbm_i').addClass('gd30tbm_ifixed');
                $('.gd30tbm_b').addClass('gd30tbm_bfixed');
            }
            else{
                $('#gd30_taball').css('position','relative');
				$(".gd30tmb_show").css({"position":"relative","top":"0","display":"block"});

                $('#gd30_taball').removeClass('gd_tabfixed');
                $('.gd30tbm_i').removeClass('gd30tbm_ifixed');
                $('.gd30tbm_b').removeClass('gd30tbm_bfixed');
            }
			
        },
    //切换 评论、详情和尺码
    switchtab:function(index){
        $('.gd30btmi_swith>li').removeClass('_ed');
        $('.gd30btmi_swith>li').eq(index).addClass('_ed');
        var o = $('.goodsContent_right>ul>li').eq(index);
        o.show();
        o.siblings().hide();
        var p = $("[name=taball]").offset().top;
        $('html,body').animate({scrollTop:p-20}, 500);//定位到该位置
    },
    // 测试弹框
    testpopbox:function(){
        var product_id = $('[name=product_id]').val();
//        console.log(product_id);
        var user_id = $('input[name=user_id]').val();
//        console.log(user_id);
        if(user_id == '' || user_id == '0') {
            global.poplogin();
            return false;
        }
        art.dialog.open(
                "/abooking/addbooking?step=1&product_id="+product_id,
                {
                    title:'',
                    lock:true,
                    width:'auto',
                    height:'auto',
                    fixed:false,
                    head:'none',
                   // top:y,
                    id:'dels'
//                    button:[
//                        {
//                            name:'提交',
//                            callback:function () {  //开始确定
//                                
//                            },
//                            focus: true
//                       }
////                        {name:'关闭'}
//                    ]										   
       });
    },
    // 分享弹框
    sharebox:function(){
        var good_id = $('[name=good_id]').val();
//        console.log(good_id);
        art.dialog.open(
                "/widget/sharebox/"+good_id+"?type=0",
                {
                    title:'',
                    lock:true,
                    width:'auto',
                    height:'auto',
                    fixed:false,
                    head:'none',
                   // top:y,
                    id:'dels'
//                    button:[
//                        {
//                            name:'提交',
//                            callback:function () {  //开始确定
//                                
//                            },
//                            focus: true
//                       }
////                        {name:'关闭'}
//                    ]										   
       });
    }
    
    
};
$(document).ready(function(){
    v30_good.ini();
});

