var menu={
    expaned:0,//购物车是否显示
    current_show:'',//当前显示的是哪个区域
    menuclick:function(type){
        var serverurl=  $('#base_url').val()+"menu/ajax"+type;            
        $.ajax(  
                {  
                    type: "POST", 
                    url: serverurl,
                    data:{'ajxtype':'1'},
                    asynic:false,
                    beforeSend:function(){
                    },
                    success: function(originalRequest)
                        {
                            try{
                                var f=eval('('+originalRequest+')');                                    
                                if(f['result_code']==='ok'){
                                    $('.'+type).html(f['data']);

                                }else if(f['result_code']==='nologin'){
                                    $(".menu_login").hide();
                                    $('#'+type+'>.menu_login').html(f['data']);
                                    menu.login();
                                    menu.folded();
                                }else{
                                    gf.alert(f['s']['mess']);
                                }
                            }
                            catch(e){}
                        },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {$('.get_gift').html('稍后再尝试.');}   
            });   
      },
      login:function(){
        var serverurl=  $('#base_url').val()+"user/poplogin";   
        art.dialog.open(                       
            serverurl,
            {
                title:'',
                lock:true,
                width:'auto',
                height:'auto',
                fixed:false,
                id:'dels',
                head:'none'
            });
      },
      // 展开右侧
      expand:function(){
          menu.expaned = 1;
          $('.right_menu').animate({right:'296px'},300);
      },
      folded:function(){
          menu.expaned = 0;
          $('.right_menu').animate({right:'0'},300,'',function(){
              $('.menuinfo>div').hide();
          });
      },
      show_:function(obj){
          var menu_type = $(obj).attr('id');
                    
            $('.right_menu').find('a').removeClass('current');
            if(menu.expaned === 1 && menu_type === menu.current_show){
                menu.folded();
            }else{
                if(menu_type === 'get_collect' ||menu_type === 'assets' ||menu_type === 'menu_cart'){
                    menu.menuclick(menu_type);
                }               
                $('#'+menu_type+'>a').addClass("current");
                $('.menuinfo>div').hide();
                $('.'+menu_type).show();
                menu.current_show = menu_type;
                menu.expand();
            }
      },
      // 收起右侧
      //开始
      ini:function(){
            // 显示提示控制
            $(".right_menu ul li").hover(
                function(){
                    $(this).find('.tab-tip').show();
                }
                ,function(){
                    $(this).find('.tab-tip').hide();
                }
            );
            
            // 购物车列表控制
            $('#menu_cart').click(function(){
                menu.show_(this);
            });
            $('#assets').click(function(){
                menu.show_(this);
            });
            $('#get_collect').click(function(){
                menu.show_(this);
            });
            $('.close_bg').live('click',function(){
                menu.folded();
            });
            $('.menu_login').mouseleave(function(){
                $('.menu_login').hide();
                $(this).parent('li').find("a").removeClass("current");     
            });
            
            $(".right_menu-tab").hover(function(){
                $(".right_menu-tab-tip").show();	
            }
            ,function(){
                $(".right_menu-tab-tip").hide();	
            });
            $("#caigou_hover").hover(function(){
                  $(".caigou").show();	
            }
            ,function(){
                $(".caigou").hide();	
            });
            $("#fankui_hover").hover(function(){
                  $(".fankui").show();	
            }
            ,function(){
                $(".fankui").hide();	
            });
            $("#returntop").hover(function(){
                  $(".fantop").show();	
            }
            ,function(){
                $(".fantop").hide();	
            });
            $("#btn_bigShow").click(function(){ 
                 $(".cedh_main_big").show();
                 $(".cedh_main_small").hide();
            });
            //用户反馈
            $("#fankui_hover").click(function(){ 
                 feedback._open();
            });
            //由大变小
            $(".gonggao_close").click(function(){
                    $(".gonggao").hide();
            });
            $(".fanhui_small").click(function(){
                    $(".gonggao").show();
            });
            // 关闭 cart
            $("#menu_cancel").click(function(){
                    $('.themenu_carts').hide();
            });
        }
  };
//**用户反馈
var feedback = {
    userfk_email: '',
    userfk_phone :'',
    userfk_textarea: '',
    pid:'',
    _page_url:$('#base_url').val(),
    _open:function(pid){
        art.dialog.open(                       
        $('#base_url').val()+'feedback',
        {
            title:'用户反馈 FEEDBACK',
            lock:true,
            width:'auto',
            height:'auto',
            fixed:false,
            head:'none',
        // top:y,
            id:'dels',
//            button:[
//                {
//                   name:'none',
//                    callback:function () {  //开始确定
//
//                        if(feedback.userfk_email === ''|| feedback.userfk_phone === '' || feedback.userfk_textarea === ''){
//                            gf.alert('必填项不能为空，请完善！');
//                            return false;
//                        }
//                         var serverurl = $('#base_url').val()+'feedback/addfk';// "<?php echo URL::site('feedback/addfk')?>";
//                         $.ajax(  
//                          {  
//                              type: "POST", 
//                              url: serverurl,
//                              data:{'userfk_textarea':feedback.userfk_textarea,'userfk_email':feedback.userfk_email,'userfk_phone':feedback.userfk_phone},
//                              asynic:false,
//                              success: function(originalRequest)
//                                     {
//                                        try{
//                                                   var f=eval('('+originalRequest+')');
//
//                                                   if(f['result_code']==='ok'){
//                                                       gf.alert(f['result_msg']);
//                                                   }else{
//                                                       gf.alert(f['result_msg']);return false;
//                                                   }
//                                          }
//                                          catch(e){
//                                                   gf.alert('请稍后重试');return false;    
//                                          }
//                                     },
//                              error: function(XMLHttpRequest, textStatus, errorThrown) { gf.alert('请稍后重试');return false; }   
//                           });
//
//                    },
//                    focus: true
//                }
//            ]										   
        });
    }
};
$(document).ready(function(){
    menu.ini();
});