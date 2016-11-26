/* 
 * 公共函数
 * and open the template in the editor.
 */

var global={
    //get cart info.
    getcartinfo:function(pid){
        var base_url = $('#base_url').val();
        if(base_url == undefined){
              return false;
        }
        var serverurl= base_url +"cart/getcart";
        $.ajax(  
                {  
                    type: "POST", 
                    url: serverurl,
                    data:{'ajxtype':'1'},
                    asynic:false,
                    beforeSend:function(){
                        $('.shopping_bag_cont').html('数据获取中...');
                    },
                    success: function(originalRequest)
                           {
                                try{
                                    var f=eval('('+originalRequest+')');
                                    var c='';
                                    if(f['result_code']==='ok'){
//                                             console.log(f['data']);
                                        if(f['data']['numbers']!=='undefined'  && f['data']['total']!=='undefined'){
                                            c = '<i></i><div class="mcar_txtx">';
                                            c += '<p class="mcar_line1"><b>商品成功放入购物袋，我的购物袋有<span>'+f['data']['numbers']+'</span>件商品</b></p>';
                                            c += '<p class="mcar_line2">共计<span>￥'+f['data']['total']+'</span>元，可以<a href="'+$('#base_url').val()+'cart/">去购物袋结算</a></p>';
                                            c += '<div>';
//                                                c='我的购物袋内有'+f['data']['numbers']+'件商品<br />共计￥'+f['data']['total']+'元';
//                                                c='共<span class="cod00000">'+f['data']['numbers']+'</span>件商品<br>共计<span class="cod00000 w500">¥'+f['data']['total']+'</span><a href="'+$('#base_url').val()+'cart/"><span class="v30_btred v30hmcf_gc">去购物袋结算</span></a>';
                                           $('#cart_box_good_info').html(c);
                                           var goodlist = f['data']['goodlist'];
                                           var glen = $(goodlist).size();
                                           var htmlc = '<div class="v30hmc_head">购物袋中的商品</div>';
                                           if(glen > 0){
                                               htmlc += '<ul>';
                                               for(var i=0;i<glen;i++){
                                                   htmlc += '<li><div class="v30hmc_box">';
                                                   htmlc += '<div class="v30hmcb_i"><img src="'+goodlist[i]['thumb']+'"></div>';
                                                   htmlc += '<ul class="v30hmcb_l">';
                                                   htmlc += '<li>'+goodlist[i]['good_name']+'</li>';
                                                   htmlc += '<li>'+goodlist[i]['attr_values_str']+'</li>';
                                                   htmlc += '<li><span>¥'+goodlist[i]['price']+'</span>×'+goodlist[i]['number']+'件</li>';
                                                   htmlc += '</ul>';
                                                   htmlc += '<div class="clearboth"></div></div></li>';
                                               }
                                               htmlc += '</ul>';
                                               htmlc += '<div class="v30hmc_foot">';
                                               htmlc += '共<span class="cod00000">'+f['data']['numbers']+'</span>件商品<br>共计<span class="cod00000 w500">¥'+f['data']['total']+'</span>';
                                               htmlc += '<a href="'+$('#base_url').val()+'cart/"><span class="v30_btred v30hmcf_gc">去购物袋结算</span></a>';
                                               htmlc += '</div>';
                                               $('.v30hm_cartbox>dt').find('span').html(f['data']['numbers']);
                                           }else{
                                               htmlc = '<ul><li><p>购物袋暂时没有商品，<br>赶紧选择心爱的商品吧！</p></li></ul>';
                                           }

                                       }
                                    }
                                    $('.shopping_bag_cont').html(htmlc);
                                    try{
                                        if(pid!=undefined){
                                            c = $('#goods_add_popup').html();
                                            $('#themenu_carts').html(c).show();
                                        }
                                    }catch(err){}
                                }
                                catch(e){
                                        $('.shopping_bag_cont').html('数据获取中...');    
                                }
                           },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {$('.shopping_bag_cont').html('稍后再尝试.');}   
                 });
    },
    /* 添加到购物车*/
    addtocart:function(pid,num,sid){
        var base_url = $('#base_url').val();
        if(base_url == undefined){
              return false;
        }
        var serverurl= base_url +"cart/ajxaddcart";
        $.ajax(  
                {  
                    type: "POST", 
                    url: serverurl,
                    data:{'ajxtype':'1','id':pid,'num':num,'store_off_id':sid},
                    asynic:false,
                    beforeSend:function(){
                    },
                    success: function(originalRequest)
                           {
                                try{
                                     var f=eval('('+originalRequest+')');
                                         if(f['result_code']==='ok'){
                                             global.getcartinfo(pid);
//                                             $('.goods_add_popup').show();
                                         }else{
                                             gf.alert(f['result_msg']);
                                         }
                                }
                                catch(e){
                                        $('#cart_box_good_info').html('数据获取中...');    
                                }
                           },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {$('.cart_box_good_info').html('稍后再尝试.');}   
                 });
    },
    
    //get login info.

    getlogininfo:function(){
          var base_url = $('#base_url').val();
          if(base_url == undefined){
                return false;
          }
          var serverurl= base_url +"api/is_login";
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
                                     var login=eval('('+originalRequest+')');
                                     var l='';
                                     var fsl = '';
                                    if(login['result_code']==='ok'){
                                        l += '<dl class="_nandlog"><dt style="text-align: right;"><a href="'+base_url+'uuser/index"><span>'+login['data']['username']+'</span></a><i></i></dt></dl>';
                                        l += '<dl class="_randout"><dt><a href="'+base_url+'user/logout">退出</a><i></i></dt></dl>';
                                        fsl += '<a href="'+base_url+'uuser/index">'+login['data']['username']+'</a>'
                                        fsl += '<span>/</span>';
                                        fsl += '<a href="'+base_url+'user/logout">退出</a>';
                                    }else{
                                        l += '<dl class="_nandlog"><dt style="text-align: right;"><a href="'+base_url+'user/login"><span>登录</span></a><i></i></dt></dl>';
                                        l += '<dl class="_randout"><dt><span class="_randout_s"></span><a href="'+base_url+'user/register">注册</a><i></i></dt></dl>';
                                        fsl += '<a href="'+base_url+'user/login">登录</a>'
                                        fsl += '<span>/</span>';
                                        fsl += '<a href="'+base_url+'user/register">注册</a>';
                                   }
                                   $('.v30h_logbox').html(l);
                                   $('.fsh_fifth>dd').html(fsl);
                                }
                                catch(e){
                                        $('.v30h_logbox').html('数据获取中...');   
                                        $('.fsh_fifth>dd').html('数据获取中...'); 
                                }
                           },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {$('.v30h_logbox').html('稍后再尝试.');}   
                 });
        },
        userbutton:function(){
            $("li.menu_loginli a").hover(function(){
                $(this).addClass('lreg_cur').siblings('a').removeClass('lreg_cur');
            })
        },
        record_keywords:function(keyword_value, is_type){
            var cid = $("input[name=cid]").val();
            if(is_type == undefined){
                is_type = $("input[name=is_type]").val();
            }
            
           // var brand_id = $("input[name=brand_id]").val();
            //var is_brand = $("input[name=is_brand]").val();
            //alert(keyword_value);
            if(keyword_value == undefined){
                keyword_value=$('#tags').val();
            }else{
                $('#tags').val(keyword_value);
            }
            //if(keyword_value != ''){
            
            //$.post('/search/record_keywords',{"cid":cid,"keyword":keyword_value});
            if(is_type == 1){
                window.location.href="/good/list/"+cid;
                //window.location.href=/store/list?keywords=
            }else if(is_type == 2){
                window.location.href="/brand/detail/"+cid;
            }else if(is_type == 3){
                window.location.href="/store/storelist?region_id="+cid;
            }else if(10 == is_type){
                window.location.href="/store/list?keywords="+keyword_value;
            }else{
              $('#search form').submit();
            }
            //}
            
        },
        //提交按钮变为加载状态
        buttonloading:function(obj){
            $(obj).addClass('loading');
        },
        //判断是否显示登录弹框
        poplogin:function(){
            var serverurl=  $('#base_url').val()+"user/poplogin";   
            art.dialog.open(                       
                serverurl,
                {
                    title:'',
                    lock:true,
                    width:'auto',
                    height:'auto',
                    fixed:false,
                    head:'none',
                    id:'dels'								   
                });
          }
};
$(document).ready(function(){
    global.getlogininfo();
    global.userbutton();
});