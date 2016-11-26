function carousel(opt){
	this.box = document.getElementById(opt.box);
	this.urlList = opt.urlList;
	this.times = opt.times||3;
	this.init();
	this.create();
}
carousel.prototype = {
	//数据初始化
	init:function(){
		this.boxwid = this.box.offsetWidth;
		this.boxHei = this.box.offsetHeight;
		this.index = 0;
	},
	//创建元素
	create:function(){
		var box = this.box;
		var w = this.boxWid;
		var h = this.boxHei;
		//创建图片容器；
		this.oUl = document.createElement('ul');
		box.appendChild(this.oUl);
		var list = this.urlList;
		for(var i = 0; i < list.length;i++){
			//创建图片，跳转链接；
			var oLi = document.createElement('li');
			var oA = document.createElement('a');
			var img = document.createElement('img');
			oLi.style.cssText = 'width:'+w+'px;height:'+h+'px;list-style:none;';
			oA.style.cssText = 'display:block;width:100%;height:100%;border:0;';
			img.style.cssText = 'display:block;width:100%;height:100%;border:0;';
			img.src = list[i].url;
			oA.appendChild(img);
			oLi.appendChild(oA);
			this.oUl.appendChild(oLi);
		}
			//创建小圆点;
		var smallBox = document.createElement('div');
		smallBox.style.cssText = 'width:'+(16*list.length+24)+'px;height:20px;position:absolute;bottom:0;left:50%;z-index:50;background:#aaa;padding:5px 12px 0;';
		for (var i = 0; i < list.length; i ++){
			var small = document.createElement('span');
			small.style.cssText = 'width:11px;height:11px;border:1px solid #fff;border-radius:50%;display:inline-block;margin-left:10px;';
			small.index = i;
			small.style.backgroundColor = "#eee";
			smallBox.appendChild(small);
		}
		box.appendChild(smallBox);
			
			
			

		
		// move:function(){
		// 	var box = this.box;
		// 	var w = this.boxWid;
		// 	var h = this.boxHei;
		// 	var list = this.urlList;
		// 	var ball = this.oUl;
		// 	var cell = ball.children;
		// 	//设置容器样式；
		// 	box.style.cssText = 'position:relative;overflow:hidden;';
		// 	box.style.height = (h + (w/list.length))+'px';
		// }
	}
}