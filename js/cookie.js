	//存储cookie
	function setCookie(name,value,end_day){
		var date = new Date();
		date.setDate(date.getDate() + end_day);
		document.cookie = name + '=' + escape(value) + (end_day?';expires='+date.toString():'');
	}
	//获取cookie
	function getCookie(name){
		if(document.cookie){
			var coo = document.cookie;
			var arr1 = coo.split('; ')
			var arr2 = [];
			for(var i = 0;i < arr1.length;i++){
				arr2.push(arr1[i].split('='));
			}
			if(name){
				for(var j = 0;j < arr2.length;j++){
					if(arr2[j][0]==name){
						return unescape(arr2[j][1]);
					}
				}
			}else{
				var obj = {};
				for(var j = 0;j < arr2.length;j++){
					obj[arr2[j][0]] = unescape(arr2[j][1]);
				}
				return obj;
			}
			
		}else{
			return false;
		}
	}

	//删除cookie
	function clearCookie(name){
		setCookie(name,'',-1);
	}