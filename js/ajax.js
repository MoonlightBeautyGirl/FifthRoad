function ajax(opt){
	//兼容请求对象
	var xhr = XMLHttpRequest ? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP');
	//设置默认值
	var type = opt.type||'get';
	var isA = opt.isA >=0 ? opt.isA : true;
	//get请求                                                    
	if(type.toLowerCase()=='get'){
		xhr.open(type,opt.url+(opt.data?'?'+opt.data+'&r='+new Date():''),isA);
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					//判断数据结构是否为json
					var result = (typeof eval("("+xhr.responseText+")"))=="object"?eval("("+xhr.responseText+")"):xhr.responseText;
					//执行回调函数
					opt.success(result);
				}else{  //报错回调函数
					if(opt.error){
						opt.error();
					}	
				}
			}
		}
		xhr.send(null);
	}else{//post请求
		xhr.open(type,opt.url,isA);
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					//判断数据是否为json
					var result = (typeof eval("("+xhr.responseText+")"))=="object"?eval("("+xhr.responseText+")"):xhr.responseText;
					//执行回调函数
					opt.success(result);
				}else{
					if(opt.error){
						opt.error();
					}	
				}
			}
		}
		//判断是否发送数据
		if(opt.data){
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			xhr.send(opt.data);
		}else{
			xhr.send(null);
		}	
	}	
}