/* 
 * author xuehuawuhen@gmail.com
 * date:2013-07-25
 */
var good={
    Baseurl:$("#base_url").val(),
            
    //加入收藏
    collect:function(id,x,y){
        //alert(this.Baseurl);exit();
        $.post(this.Baseurl+'good/addcollect',{id:id},function(result){
            a=eval('('+result+')');
            if(a['s']['code'] == 0){
                Lhint.init("id0245",a['s']['mess'],1,'',x ,y);
//                gf.alert();
            }
            if(a['s']['code'] == 2){
                //gf.alert(a['s']['mess']);
//                window.location.href='/user/login';
                global.poplogin();
            }
            if(a['s']['code'] == 1){
//                gf.alert(a['s']['mess']);
                Lhint.init("id0245",a['s']['mess'],1,'',x ,y);
            }

        })
    },
    
    //删除收藏
    delcollect:function(ids){
         var serverurl = this.Baseurl+"ugood/delcollect";
        $.ajax({
            type: "POST",
            url: serverurl,
            data: {'ids': ids},
            async: false,
            success: function(originalRequest)
            {
                try {
                    var f = eval('(' + originalRequest + ')');
                    if (f['s']['code'] === '0') {
		var dialog = art.dialog({
		title: '提示信息',
                lock:true,
		content: f['s']['mess'],
                background: '#333333', // 背景色
                opacity: 0.6,	// 透明度
		okVal: '确定',
                ok: function () {
                        window.location.reload();
                }
	});                        
                    }else {
                    var f = eval('(' + originalRequest + ')');
                    if (f['s']['code'] === '0') {
		var dialog = art.dialog({
		title: '提示信息',
                lock:true,
		content: f['s']['mess'],
                background: '#333333', // 背景色
                opacity: 0.6,	// 透明度
		okVal: '确定'
	});                  
                    }
                }
                }
                catch (e) {
//                                     alert(e)    
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                gf.alert('请稍后重试');
            }
        });
     },    
        //商品赞
    supers:function(id,x,y){
        //var product_id = $(this).attr('id');
        //alert(product_id);
        //alert("#supper_"+id);
        $.post(this.Baseurl+"good/super",{product_id:id},function(result){
            a=eval('('+result+')');
            //gf.alert('赞成功');
            Lhint.init("id0245","添加喜欢成功！",1,'',x ,y);
            //$("#"+id).next('strong').text(a['s']['data'][0]);
            //$("#"+id).attr('onclick','');
            //$("#"+product_id).parent().text('已赞');
            //$("#"+id).html('<img src="/vendor/images/love_grey.jpg">已赞');
            //console.log("#supper_"+id);
            $("#super_"+id).html('<span>'+a['s']['data'][0]+'</span><a href="javascript:void(0)" class=al_supper></a>');
        })
    },
    //加入收藏
    guanzhu:function(id){
        //alert(this.Baseurl);exit();
        $.post(this.Baseurl+'brand/guanzhu',{id:id},function(result){
            a=eval('('+result+')');
            if(a['s']['code'] == 0){
                $("#guanzhu").html('已经关注');
                gf.alert(a['s']['mess']);
            }
            if(a['s']['code'] == 2){
                //gf.alert(a['s']['mess']);
//                window.location.href='/user/login';
                global.poplogin();
            }
            if(a['s']['code'] == 1){
                gf.alert(a['s']['mess']);
            }

        })
    },
    //当用户登录 写入赞信息到数据库
    write_super:function(){
        //$.get(this.Baseurl+'Api/wirte_super');
		return null;
    },
    //记录 专题链接来的统计信息
    record_special:function(referer, product_id){
        if(referer != ''){
            $.post(this.Baseurl+'Api/special_stat',{referer:referer,product_id:product_id});
        }
        
    }
}
//good.write_super();
$(function(){
    // 给喜欢添加事件
    $('.add_favor_bt').click(function(ev){
        good.supers($(this).attr('pid'),ev.pageX,ev.pageY);
    });
//    $('.al_supper').click(function(ev){
//        Lhint.init("id0246","您已经喜欢过了！",1,'',ev.pageX,ev.pageY);
//    });
    $('.al_supper').live('click',function(ev){
        Lhint.init("id0246","您已经喜欢过了！",1,'',ev.pageX,ev.pageY);
    });
    // 给添加购物车添加事件
    $('.add_cart_bt').click(function(ev){
        var serverurl= $('#base_url').val()+"cart/ajxaddcart";
        $.ajax(  
                {  
                    type: "POST", 
                    url: serverurl,
                    data:{'ajxtype':'1','id':$(this).attr('pid'),'num':1},
                    asynic:false,
                    beforeSend:function(){
                    },
                    success: function(originalRequest)
                           {
                                try{
                                     var f=eval('('+originalRequest+')');
                                         if(f['result_code']==='ok'){
                                             Lhint.init("id0246","已经添加到购物车！",1,'',ev.pageX,ev.pageY);
                                         }else{
                                             Lhint.init("id0247",f['result_msg'],1,'',ev.pageX,ev.pageY);
                                         }
                                }
                                catch(e){
                                      Lhint.init("id0248",'添加失败，请重试',1,'',ev.pageX,ev.pageY);  
                                }
                           },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { Lhint.init("id0247",'添加失败，请重试',1,'',ev.pageX,ev.pageY);}   
                 });
    });
});

