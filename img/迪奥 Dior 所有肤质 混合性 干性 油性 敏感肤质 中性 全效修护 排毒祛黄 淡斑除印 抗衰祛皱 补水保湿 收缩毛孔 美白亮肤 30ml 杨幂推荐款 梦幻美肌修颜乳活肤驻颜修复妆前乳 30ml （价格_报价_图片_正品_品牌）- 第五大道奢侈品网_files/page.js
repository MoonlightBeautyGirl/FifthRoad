/**
 * 实现前段分页功能
 * author:wangwanbo
 * version:2012-09-29
 */
//分页
var Pageact={
Tpage:20,
page:5,
Perpage:15,
fc:function(){},
url:"",//请求的服务器路径
data:'',//每次传的参数
divid:"",//显示数据的div id
pageboxid:"",//显示分页的div id
f:"no page",
init:function(_url,_data,_divid,_pageboxid){
	this.url=_url;
	this.data=_data;
	this.divid=_divid;
	this.pageboxid=_pageboxid;
	this.getdata(1);
	//return this.f;
},
showpage:function(){
	var divlist=[];
	for(var i=1;i<=this.Tpage;i++)
		{
			//divlist[i]="<li>"+i+"</li>";
			divlist[i]="<li onclick=Pageact.getdata("+i+")>"+i+"</li>";
		}
	 //divlist[this.page]="<li class='pageselected'>"+this.page+"</li>";
	 divlist[this.page]="<li class='pageselected'>"+this.page+"</li>";
	 var divcontent_start=divlist[1];
	 var divcontent_end=divlist[this.Tpage];
	 var cbefore3="";
	 var cafter3="";
	 	if(this.page-3>1)
			{
				cbefore3="<li>...</li>"+divlist[(this.page)*1-2]+divlist[(this.page)*1-1];
			}
		else
			{
				for(var k=1;k<this.page;k++)
					{
						cbefore3+=divlist[k];
					}
				divcontent_start="";
				
			}
		if((this.page)*1+3<this.Tpage)
			{
				cafter3=divlist[(this.page)*1+1]+divlist[(this.page)*1+2]+"<li>...</li>";
			}
		else
			{
				for(var k=(this.page)*1+1;k<=this.Tpage;k++)
					{
						cafter3+=divlist[k];
					}
				divcontent_end="";
			}
                if(this.Tpage==0){
                    this.f='没有相关结果';
                }else{
                    this.f="<ul class='pagebox'>"+divcontent_start+cbefore3+divlist[this.page]+cafter3+divcontent_end+"</ul>";
                }
	},
	getdata:function(_current){
		var serverurl=Pageact.url;
		Pageact.page=_current;
                //alert(Pageact.data);
//		$('#'+Pageact.pageboxid).html(Pageact.showpage());
		$.ajax(  
				{  
					 type: "POST", 
					 url: serverurl,
					 data:{'Data':Pageact.data,'page':_current,'Perpage':Pageact.Perpage},
					 asynic:false,
					 success: function(originalRequest)
						{
							try{
								//var f=eval('('+originalRequest+')');
                                                                //alert(originalRequest);
                                                                var f=eval('('+originalRequest+')');
                                                                //alert(f);
								$('#'+Pageact.divid).html(f['s']['Data']);
								Pageact.page=f['s']['page'];
								if(f['s']['page']=='1'){
									Pageact.Tpage=f['s']['Tpage'];
								}
								Pageact.showpage();
								$('#'+Pageact.pageboxid).html(Pageact.f);
							}
							catch(e){
								$('#'+Pageact.pageboxid).html('数据格式不对');    
								$('#'+Pageact.pageboxid).html('');
							}
						},
					 error: function(XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }   
				 })
	}
};
/**
 * 获取选择的数据
 */
var source={
    str:'',//最终的返回获取到的json数据，使用 eval('('+xxxx+')')生成数组
    _trstr:'',//临时值
    /**
     * 全选或者取消全选
     * @param {type} obj：checkbox 对象
     * @returns {undefined}
     */
    checkall:function(obj){
        if(obj.checked){
            $(".sourcetable input[name='source_input']").attr("checked",'true');
        }else{
            $(".sourcetable input[name='source_input']").removeAttr("checked");
        }
    },
    /**
     * 获取选择的数据
     * @returns {@exp;source@pro;str}
     */
    getvars:function(){
        source.str='';
        source.str +="[";
        $(".sourcetable input[name='source_input']").each(function(){
            if(!$(this).attr('checked')){
                return;
            }
            $parentsib=$(this).parent().siblings();
            
            source._trstr="";
            source._trstr +='{';
            $parentsib.each(function(){
                source._trstr+='"'+$(this).attr('name')+'":"'+$(this).html()+'"';
                source._trstr+=',';
                
            });
            source._trstr =source._trstr.substr(0, source._trstr.length-1);
            source._trstr +='}';
            source.str +=source._trstr+',';
            $(this).removeAttr("checked");
        });
        source.str =source.str.substr(0, source.str.length-1);
         source.str +=']';
         return source.str;
    },
    getsrc:function(){
        source.str='';
        source.str +="[";
        $(".sourcetable input[name='source_input']").each(function(){
            if(!$(this).attr('checked')){
                return;
            }
            $parentsib=$(this).siblings('a');
            
            source._trstr="";
            source._trstr +="{";
            $parentsib.each(function(){
                source._trstr+="src:'"+$(this).children().attr('src')+"'";
                source._trstr+=",aid:'"+$(this).children().attr('aid')+"'";
                source._trstr+=",";
            });
            source._trstr +="}";
            source.str +=source._trstr+',';
            $(this).removeAttr("checked");
        });
       //source.str +=source.str.substr(0, source.str.length-1);
         source.str +="]";
         return source.str;
    }
};
