/**
 * author:wangwanbo
 * version:2012-09-29
 */
// JavaScript Document
//判断浏览器宽度
var common={};//公共使用类

var Browse={};
common.layer={
		m:'mask',
		_id:'',
		Fsrc:'',
		stdbuttid:'shutdown',
		relatpo_x:"",
		relatpo_y:"",
		init: function(id,src,std){
			this._id=id;
			this.Fsrc=src;
			this.stdbuttid=std;
			this.openNewlayer();
			this.setshutdown();
			},
		docEle: function(id){
			
				return document.getElementById(arguments[0]) || false;
			},
		setshutdown:function(){
			
			$("#"+common.layer.stdbuttid).click(function(){
				
				common.layer.dellayer();
				});
			},
			
		openNewlayer: function(){

				 var sourcediv=document.getElementById(this._id);
				 sourcediv.style.position = "absolute";
	 			 sourcediv.style.zIndex = "999";
				 sourcediv.style.top = "100px";
				 sourcediv.style.display="block";
				 var bwidth=Browse.getTotalWidth();
			     sourcediv.style.left = (parseInt(bwidth) - sourcediv.offsetWidth) / 2 + "px"; // 屏幕居中
				 
	  			// mask图层
				  var newMask = document.createElement("div");
				  newMask.id = this.m;
	 			 newMask.style.position = "absolute";
	 			 newMask.style.zIndex = "1";
	 			 newMask.style.width = document.body.scrollWidth + "px";
	 			 newMask.style.height = document.body.scrollHeight + "px";
	 			 newMask.style.top = "0px";
	 			 newMask.style.left = "0px";
	 			 newMask.style.background = "#000";
	 			 newMask.style.filter = "alpha(opacity=40)";
	 			 newMask.style.opacity = "0.40";
				
	 			 document.body.appendChild(newMask);
			},
			dellayer: function(){
				
					var sourcediv=document.getElementById(common.layer._id);
					sourcediv.style.display="none";
					document.body.removeChild(document.getElementById(common.layer.m));
				},
			
			getElementPos: function(elementId){
				var ua = navigator.userAgent.toLowerCase();
				var isOpera = (ua.indexOf('opera') != -1);
				var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
				var el = document.getElementById(elementId);
				if (el.parentNode === null || el.style.display == 'none') {
					return false;
				}
				var parent = null;
				var pos = [];
				var box;
				if (el.getBoundingClientRect) //IE
				{
					box = el.getBoundingClientRect();
					//alert(box.left);
					var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
					var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
					return {
						x: box.left + scrollLeft,
						y: box.top + scrollTop
					};
				}
				else 
					if (document.getBoxObjectFor) // gecko    
					{
						box = document.getBoxObjectFor(el);
						var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
						var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
						pos = [box.x - borderLeft, box.y - borderTop];
					}
					else // safari & opera    
					{
						pos = [el.offsetLeft, el.offsetTop];
						parent = el.offsetParent;
						if (parent != el) {
							while (parent) {
								pos[0] += parent.offsetLeft;
								pos[1] += parent.offsetTop;
								parent = parent.offsetParent;
							}
						}
						if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
							pos[0] -= document.body.offsetLeft;
							pos[1] -= document.body.offsetTop;
						}
					}
				if (el.parentNode) {
					parent = el.parentNode;
				}
				else {
					parent = null;
				}
				while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
					pos[0] -= parent.scrollLeft;
					pos[1] -= parent.scrollTop;
					if (parent.parentNode) {
						parent = parent.parentNode;
					}
					else {
						parent = null;
					}
				}
				return {
					x: pos[0],
					y: pos[1]
				};
	        },
		inithv:function(id,x,y,std){
			
			common.layer._id=id;
			common.layer.stdbuttid=std;
			
			common.layer.relatpo_x=x;
			common.layer.relatpo_y=y;	
			common.layer.openhvdiv();
			common.layer.setshutdown();

			},
		//打开固定高度的div
		openhvdiv:function(){
			 var sourcediv=document.getElementById(this._id);
				 sourcediv.style.position = "absolute";
	 			 sourcediv.style.zIndex = "10000005";
				 sourcediv.style.display="block";
			     sourcediv.style.left = common.layer.relatpo_x; // 
				 sourcediv.style.top =common.layer.relatpo_y+"px"; // 
				
	  			// mask图层
				  var newMask = document.createElement("div");
				  newMask.id = this.m;
	 			 newMask.style.position = "absolute";
	 			 newMask.style.zIndex = "1000000";
	 			 newMask.style.width = document.body.scrollWidth + "px";
	 			 newMask.style.height =sourcediv.scrollHeight + "px";
	 			 newMask.style.top = common.layer.relatpo_x;
	 			 newMask.style.left = common.layer.relatpo_y; // 
	 			 newMask.style.background = "#000";
	 			 newMask.style.filter = "alpha(opacity=40)";
	 			 newMask.style.opacity = "0.40";
				
	 			 document.body.appendChild(newMask);
			
			}
		
		
		};
common.diabox={
		diaid:'mydia',
		maskid:'mymask',
		w:200,
		h:150,
		mtop:100,
		stdbuttid:'',
		iner:'<div>diabox,helo</div>',
		autoclose:true,
		ini:function(_w,_h,_iner,_stdbuttid,maskclose,_mtop){
			this.w=_w;
			this.h=_h;
			this.mtop=_mtop;
			this.iner=_iner;
			this.diaid="mydia";
			this.maskid="mymask";
			this.stdbuttid=_stdbuttid;
			this.autoclose=maskclose==false?false:true;

			this.opendia();	
			
			},
		opendia:function(){
			this.closedia();
			//alert(this.getdom(this.iner))
			// 新激活图层
	 		 if(this.getdom(this.iner)!=false)
				{
					var dia=this.getdom(this.iner);
					this.diaid=this.iner;//如果传的是一个div的id 则把它赋值给 diaid
					dia.style.display="block";
					this.w=dia.offsetWidth;
					this.h=dia.offsetHeight;
					dia.id=this.diaid;
				}
			else
				{
					var dia = document.createElement("div");
					dia.innerHTML=this.iner;
					this.diaid="mydia";
				}
				
	 		dia.id=this.diaid;
	 		dia.style.position = "absolute";
	 		dia.style.zIndex = "10000001";
	 		dia.style.width = this.w+"px";
			dia.style.height = this.h+"px";
			var top=0;
			//dia.style.top =this.mtop+"px";
			if(document.body && document.body.scrollTop)
				{
	    		top=document.body.scrollTop;
	   			//left=document.body.scrollleft;    
	   			
				}
			if (document.documentElement && document.documentElement.scrollTop)
				{
	    		top=document.documentElement.scrollTop;
	   		  //left=document.documentElement.scrollLeft;
				}
			//alert(document.documentElement.scrollTop);
			//dia.style.top =(screen.height-this.h-200)/2+top+"px";
			dia.style.top =this.mtop+top+"px";
			
			//dia.style.border="solid 1px #F7F7F7";
			//dia.style.background = "#F0F0F0";
			
			var bwidth=Browse.getTotalWidth();
			dia.style.left=(parseInt(bwidth) - this.w) / 2 + "px"; // 屏幕居中
			
			document.body.appendChild(dia);

			//mask层
			var newMask = document.createElement("div");
			newMask.id = this.maskid;
	 		newMask.style.position = "absolute";
	 		newMask.style.zIndex = "1";
	 	    newMask.style.width = document.body.scrollWidth + "px";
	 		//newMask.style.height = document.body.scrollHeight + "px";
			newMask.style.height = "5000px";
	 		newMask.style.top = "0px";
	 		newMask.style.left = "0px";
	 	    newMask.style.background = "#000";
	 		newMask.style.filter = "alpha(opacity=60)";
	 		newMask.style.opacity = "0.60";
	 		if(this.autoclose==true)
	 		{
	 			newMask.onclick=function(){common.diabox.closedia();};
	 		}
	 	    document.body.appendChild(newMask);
	 	  
			
			if(this.getdom(this.stdbuttid))
				{
					var closebt=document.getElementById(this.stdbuttid);
					closebt.onclick=function(){common.diabox.closedia();};
				}
			//控制背景高度
			
			if(this.getdom("twmask")&&this.getdom("twcontent"))
				{ 
					var twmask=this.getdom("twmask");
					var twcontent=this.getdom("twcontent");
					twmask.height=twcontent.offsetHeight+30+"px";
					
				}
			},
		getdom: function(id)
			{
				return document.getElementById(arguments[0]) || false;
			},
		closedia: function()
				{
				
				 if(this.getdom(this.iner)&&this.diaid!='mydia')
				 {
				 	var sourcediv=	this.getdom(this.iner);
				 	sourcediv.style.display="none";
				 }
				 else
				 	{
				 		 if(this.getdom(this.diaid))
				 			{
				 				document.body.removeChild(document.getElementById(this.diaid));
				 	            
							}
				 	}
				 if(this.getdom(this.maskid))
				 {
					 
				 	document.body.removeChild(document.getElementById(this.maskid));
				 	//this.getdom(this.diaid).style.display="none";
				 }
				 
				 
				},
		infoshow:function(info)
		{
			var objdiv=common.layer.docEle('myhelpdivinfoshow');
			if(objdiv){document.body.removeChild(objdiv);}
	 		
			var helpdiv=document.createElement("div");
			helpdiv.id="myhelpdivinfoshow";
			document.body.appendChild(helpdiv);
			helpdiv.style.zIndex='1000000000';
			var helptext = document.createTextNode(info);
			helpdiv.appendChild(helptext);
			var opcity=1;
			
			setTimeout(function(){
				var i=0;
				var t=setInterval(function(){
				   opcity=opcity-0.1;
				   if ("\v"=="v") 
						{
							helpdiv.filters.alpha.opacity=opcity;
						}
					 else   helpdiv.style.opacity=opcity;
					 i++;
					},100);
					if(i==10)
						{
							document.body.removeChild(helpdiv);
						}
			
			},1500);
		},
		doingshow:function(info)
		{
			var objdiv=common.layer.docEle('myhelpdivdoingshow');
			if(objdiv){document.body.removeChild(objdiv);}
	 		
			var infodiv=document.createElement("div");
			infodiv.id="myhelpdivdoingshow";
			document.body.appendChild(infodiv);
			infodiv.style.zIndex='1000000000';
			var infotext = document.createTextNode(info);
			infodiv.appendChild(infotext);		
		},
		closedoing:function(){
			var infodiv=document.getElementById("myhelpdivdoingshow");
			document.body.removeChild(infodiv);
		},
		//boxshow 指定位置弹出
		boxshow:function(myid,left,top){
                    
                        //mask层
			var div ='<div id="mask_bg" style="position:absolute;top:0;left:0; z-index:9999;width:100%;height:100%;background:#000"></div>';
			$(document.body).append(div);
//                        var h = $(window).height() + $(window).scrollTop();
                        var h = $(document.body).height();
                        $('#mask_bg').css('height',h);
                        $('#mask_bg').fadeTo(1000,0.8);
                        var dbox=this.getdom(myid);
			dbox.id=myid;
	 		dbox.style.position = "fixed";
	 		dbox.style.zIndex = "10000";
			dbox.style.left=left+"px";
			dbox.style.top=top+"px";
//	 		dbox.style.position = "absolute";
//	 		dbox.style.zIndex = "1000";
//			dbox.style.left=left+"px";
//			dbox.style.top=top+"px";
			dbox.style.display="block";

		},
		//closeboxshow
		closeboxshow:function(id){
			
                        var dbox=this.getdom(id);
			dbox.style.display="none";
                        
		}
		};


Browse={
Mposition:{x:0,y:0},
getTotalWidth:function(){
	if($.browser.msie){
	return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth :
	document.body.clientWidth;
	}else{
	return self.innerWidth;
	}
},
getMousePoint:function(ev){
	 ev = ev || window.event;
		var point = {
		x:0,
		y:0
	};

	if(typeof window.pageYOffset != 'undefined') {
		point.x = window.pageXOffset;
		point.y = window.pageYOffset;
	}
	else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
		point.x = document.documentElement.scrollLeft;
		point.y = document.documentElement.scrollTop;
	}
	else if(typeof document.body != 'undefined') {
		point.x = document.body.scrollLeft;
		point.y = document.body.scrollTop;
	}

	point.x += ev.clientX;
	point.y += ev.clientY;
	this.Mposition.x=point.x;
	this.Mposition.y=point.y;
	},
//判断浏览器
browsekind:function(){
	var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    var f="chrome";
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    //以下进行测试
    if (Sys.ie) {
    	var ieno=Sys.ie;
    	f="ie"+ieno.substring(0,1);
    }
    if (Sys.firefox) f="firefox"+Sys.firefox;
    if (Sys.chrome) f="chrome"+Sys.firefox;
    if (Sys.opera) f="opera"+Sys.firefox;
    if (Sys.safari) f="safari"+Sys.firefox;
	return f;
	},
    //判断浏览器是否是在移动端，2015.10.30
    ismobile:function(){
        var u = navigator.userAgent;
        return !!u.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
	}
};
//小提示，不弹出mask层
var Lhint={
text:"",
id:"Lhdiv",
timeout:1,
x:0,
y:0,
init:function(_id,_text,_time,_img,_x,_y){
	this.id=_id;
	this.text=_text;
	this.timeout=_time*1000;
	this.img=_img!=''?_img:this.img;
	if(_x!=undefined)
		{
			this.x=_x;
		}
	if(_y!=undefined)
		{
			this.y=_y;
		}
	this.hintout();
	},
hintout:function(){
	if(document.getElementById(this.id))
		{
			
			document.body.removeChild(document.getElementById(this.id));
			
		} 
	
	var hintdiv=document.createElement("span");
	var inner0 = '<span class="altermess">'+this.text+'</span>';
	
	hintdiv.id=this.id;
	hintdiv.style.position="absolute";
	hintdiv.style.zIndex="100005";
	//alert(Browse.Mposition.x+this.x+this.offsetx+30+"px");
	//alert(Browse.Mposition.y+this.y+this.offsety-100+"px");
//        alert(this.x+'|'+this.y);
	hintdiv.style.left=20+this.x+"px";
	hintdiv.style.top=this.y-40+"px";
	hintdiv.innerHTML=inner0;
	document.body.appendChild(hintdiv);
	
	
	this.settimeclose();
	},
getdom: function(id)
		{
			return document.getElementById(arguments[0]) || false;
		},
closedia: function()
		{
			var opcity=1;
			var objdiv=document.getElementById(Lhint.id);
			
			if(objdiv)
				{
					
					var t=setInterval(function(){
			           opcity=opcity-0.05;
				       if ("\v"=="v") 
					   		{
								objdiv.filters.alpha.opacity=opcity;
							}
    					 else   objdiv.style.opacity=opcity;
						 
						},50);

					 setTimeout(function(){
							clearInterval(t);
							try{
									document.body.removeChild(objdiv);
							   }
							catch(exception){}
							
							
							},1000);
					
				}
		},
settimeclose:function(){
	 setTimeout(this.closedia,this.timeout);
	}

};
//javascript cookie
var Cookie={
GetCookieVal:function(offset){
	var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
	},
GetCookie:function(name){
	 var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]);return null;
	},
SetCookie:function(name, value){
	var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},
DeleteCookie:function(name){
	var exp = new Date();
    exp.setTime (exp.getTime() - 1);
    var cval = GetCookie (name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
	}
};
//过滤特殊字符
var Charfilter={
filterA:function(str){
	return encodeURIComponent(str);
	},
getstrlen:function(str){
	var chineseRegex = /[^\x00-\xff]/g; 
	var strLength = str.replace(chineseRegex,"**").length; 
	return strLength;
	},
//得到前x个字符的string
lesschar:function(str,len,dot){
	var f='';
	if(str==null||str=='')
		{f='';}
	else
		{
			var newLength = 0; 
			var newStr = ""; 
			var chineseRegex = /[^\x00-\xff]/g; 
			var singleChar = ""; 
			var strLength = str.replace(chineseRegex,"**").length; 
			if(strLength>len)
			  {
				for(var i = 0;i < strLength;i++) 
				{ 
					singleChar = str.charAt(i).toString(); 
					if(singleChar.match(chineseRegex) != null) 
					{ 
						newLength += 2; 
					}     
					else 
					{ 
						newLength++; 
					} 
					if(newLength > len) 
					{ 
						break; 
					} 
					newStr += singleChar; 
				} 
				 
				if(dot&&strLength > len) 
				{ 
					newStr += "..."; 
				} 
				 f=newStr; 
			 }
			 else
			 	{
					f=str;
				}
			
		}
	  return f;	
	}
};
//验证格式
var ckformat={
		email:function(em){
			var emailRegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			if (!emailRegExp.test(em)||em.indexOf('.')==-1){
			return true;
			}else{
			return false;
			}
		},
		isRepeat:function(arr){
		    return /(\x0f[^\x0f]+\x0f)[\s\S]*\1/.test("\x0f"+ arr.join("\x0f\x0f") +"\x0f");
		}
};
var formatdate={
		parseDate:function(input) {
			  var parts = input.match(/(\d+)/g);
			  if(input!=null&&input!=""){
				  return new Date(parts[0], parts[1]-1, parts[2]);
			  }else{
				  return "";
			  }
			 
			}
};
Date.prototype.format=function(format){
                     var o = 
                    { 
                        "M+" : this.getMonth()+1, //month 
                        "d+" : this.getDate(), //day 
                        "h+" : this.getHours(), //hour 
                        "m+" : this.getMinutes(), //minute 
                        "s+" : this.getSeconds(), //second 
                        "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
                        "S" : this.getMilliseconds() //millisecond 
                    }
                    if(/(y+)/.test(format)) 
                    { 
                        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
                    }
                    for(var k in o) 
                        { 
                            if(new RegExp("("+ k +")").test(format)) 
                        { 
                            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
                        } 
                    } 
                    return format; 
                 };
// 层控制
var divcontrol={
		newdiv:function(id,w,h,t,l,content){
			 var thenewdiv = document.createElement("div");
			 thenewdiv.id = id;
			 thenewdiv.style.position = "absolute";
			 thenewdiv.style.zIndex = "1000000";
			 thenewdiv.style.width = w+"px";
			 thenewdiv.style.height =h + "px";
			 thenewdiv.style.top =t+"px";
			 thenewdiv.style.left =l+"px";
			 thenewdiv.style.background = "#fff";
			 thenewdiv.innerHTML=content;
			
			 document.body.appendChild(thenewdiv);
		},
		singlediv:function(id,t,l){
			var obj=document.getElementById(arguments[0]);
			obj.style.position = "absolute";
			obj.style.display="block";
			obj.style.zIndex = "1000000";
			obj.style.top =t+"px";
			obj.style.left =l+"px";
		},
		closesing:function(id){
			var obj=document.getElementById(arguments[0]);
			obj.style.display="none";
		}
};
var J={
		json_encode_js:function(aaa){
		        function je(str){
		            var a=[],i=0;
		            var pcs="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		            for (;i<str.length;i++){
		                if(pcs.indexOf(str[i]) == -1)
		                    a[i]="\\u"+("0000"+str.charCodeAt(i).toString(16)).slice(-4);
		                else
		                    a[i]=str[i];
		            }
		            return a.join("");
		        }
		        var i,s,a,aa=[];
		        if(typeof(aaa)!="object") {alert("ERROR json");return;}
		        for(i in aaa){
		            s=aaa[i];
		            a='"'+je(i)+'":';
		            if(typeof(s)=='object'){
		                a+=J.json_encode_js(s);
		            }else{
		                if(typeof(s)=='string')
		                    a+='"'+je(s)+'"';
		                else if(typeof(s)=='number')
		                    a+=s;
		            }
		            aa[aa.length]=a;
		        }
		        return "{"+aa.join(",")+"}";
		    },
		    //is array
		    isArray: function(v){
		 		 return Object.prototype.toString.apply(v) === '[object Array]';
			},
			//gen array: len,and <=max
			genArray:function(len,maxnum,notone){
				var a=[];
				for(var i=0;i<len;i++)
				{
					a[i]=i;
					if(i>maxnum){
						a[i]=Math.floor(Math.random()*maxnum);
					}
					while(a[i]==notone){
						a[i]=Math.floor(Math.random()*maxnum);
					}
				}
				return a;
			}

		    

		};
//server
var Time={
Getservertime:function(){
var xmlHttp = false;
//获取服务器时间
try {
xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
try {
xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
} catch (e2) {
xmlHttp = false;
}
}
if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
xmlHttp = new XMLHttpRequest();
}
xmlHttp.open("GET", "null.txt", false);
xmlHttp.setRequestHeader("Range", "bytes=-1");
xmlHttp.send(null);
var severtime=new Date(xmlHttp.getResponseHeader("Date"));
return severtime;

},
Getclienttime:function(){
var localtime=new Date();
return localtime.getTime();
},
//date and time  2011-08-24 16:37:00
GetNowtime:function(){
var now= new Date();
var year=now.getFullYear();
var month=now.getMonth()+1;
var day=now.getDate();
var hour=now.getHours();
var minute=now.getMinutes();
var second=now.getSeconds();
    var nowstr=year+"-"+month+"-"+day+" "+hour+":"+":"+minute+":"+second;
    return nowstr;
},
timepicker:function(domid,left,top){
var ht="";
var y="";
var m="";
var d="";
var t="";
var i=1;
var j=0;
alert(domid);
for(i=2011;i<=2015;i++){
y+="<option>"+i+"</optin>";
}
for(i0=1;i0<=12;i0++){
if(i0<10)
{m+="<option>0"+i0+"</option>";}
else{m+="<option>"+i0+"</option>";}

}
for(i1=1;i1<=30;i1++){
if(i1<10)
{d+="<option>0"+i1+"</option>";}
else{d+="<option>"+i1+"</option>";}
}
for(i2=0;i2<=23;i2++){
for(j=0;j<=50;j=j+10){
var hstr="";
var minstr="";
if(i2<10)
{
hstr="<option>0"+i2;
}
else
{
hstr="<option>"+i2;
}
if(j<10)
{
minstr=":0"+j+"</option>";
}
else
{
minstr=":"+j+"</option>";
}
t+=hstr+minstr;
}
}
ht="<div class='timepicker' style='height=30px;'><select id='dmonthpick'>"+m+"</select>月<select  id='ddaypick'>"+d+"</select>日<select  id='dtimepick'>"+t+"</select></div>";
    var objdiv=common.layer.docEle('mydom');
if(objdiv)
    {
     document.body.removeChild(objdiv);
    }
var domdiv=document.createElement("div");
domdiv.id="mydom";

domdiv.style.zIndex='1000000000';
domdiv.innerHTML=ht;

domdiv.style.position="absolute";
domdiv.style.left=left+"px";
domdiv.style.top=top+"px";
document.body.appendChild(domdiv);
var domshow=document.getElementById(domid);
var sm=document.getElementById('dmonthpick');
var sd=document.getElementById('ddaypick');
var st=document.getElementById('dtimepick');

sm.onchange=function(){
var setime="2011-"+sm.options[sm.options.selectedIndex].text+"-"+sd.options[sd.options.selectedIndex].text+" "+st.options[st.options.selectedIndex].text+":00";
domshow.value=setime;

};
sd.onchange=function(){
var setime="2011-"+sm.options[sm.options.selectedIndex].text+"-"+sd.options[sd.options.selectedIndex].text+" "+st.options[st.options.selectedIndex].text+":00";
domshow.value=setime;
};
st.onchange=function(){
var setime="2011-"+sm.options[sm.options.selectedIndex].text+"-"+sd.options[sd.options.selectedIndex].text+" "+st.options[st.options.selectedIndex].text+":00";
domshow.value=setime;
};

}

}; 
//tab切换
var thetab={
		change:function(obj){
			var tab=$(obj).parent().children();
			tab.each(function(){
				$(this).removeClass('standard_select');
			});
			$(obj).addClass('standard_select');
		}
};

//提示函数
var gf={
    alert:function(mess){
        //alert(mess);
  
		var dialog = art.dialog({
		title: '提示信息',
                lock:true,
		content: mess,
                background: '#333333', // 背景色
//                opacity: 0.6,	// 透明度
		ok: '确定'
	});

    },
    go:function(){
        window.history.go(-1);
    },
    confirm:function(){
        return confirm('确实要操作此项吗？');
//          art.dialog({
//		title: '提示信息',
//		content: '确实要操作此项吗？',
//                lock: true,
//                background: '#333333', // 背景色
//                opacity: 0.6,	// 透明度
//		ok: function(){return true},
//                cancel:true,
//                });
    },
    retunture:function(){
        return true;
    },
    leave4:function(url){
        if(url==undefined||url==''){
            return false;
        }
        window.location.href=url;
    },
    reload:function(){
        if(confirm('确实要这样操作吗？')){
            window.location.reload();
        }
    },
    noiframe:function(){
        if(window.top.location != window.self.location){
            window.top.location = window.self.location;    
        }
    }
};
//check函数
var ck={
//    查找当前容器里是否存在相同内容的子项
//    pid:容器id，content，要测试的子项内容
//      ctype:子类表示
    hassamechild:function(pid,content,ctype){
        var ishas=false;
        var obj=document.getElementById(pid);
        
        for(var i=0;i<obj.getElementsByTagName(ctype).length;i++){
           if(obj.getElementsByTagName(ctype)[i].outerHTML==content){
                ishas= true;
            } 
        }
        
        return ishas;
    }
};
//数组相关
//判断一个数组中是否存在某个字符串
Array.prototype.S = String.fromCharCode(2);
Array.prototype.in_array = function(e) {  
    var r = new RegExp(this.S+e+this.S);  
    return (r.test(this.S+this.join(this.S)+this.S));  
};
