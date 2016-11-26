function scroll(opt){
	this.box = document.getElementById(opt.box);
	this.urlList = opt.urlList;
	this.times = opt.times || 3;

	this.init();
	this.create();
}

scroll.prototype = {
	//初始化相关参数
	init:function(){
		this.boxWid = this.box.offsetWidth;
		this.boxHei = this.box.offsetHeight;
		this.index = 0;
	},
	//创建元素
	create:function(){
		var box = this.box;
		var w = this.boxWid;
		var h = this.boxHei;
		//创建图片容器
		this.oUl = document.createElement('ul');
		box.appendChild(this.oUl);
		var list = this.urlList;
		for(var i = 0;i < list.length;i++){
			//创建图片，跳转链接
			var oLi = document.createElement('li');
			oLi.style.cssText = 'width:'+w+'px;height:'+h+'px;list-style:none;opacity:1;filter:alpha(opacity=100);';
			var oA = document.createElement('a');
			oA.style.cssText = 'display:block;width:100%;height:100%;border:0;';
			oA.href = list[i].href;
			var img = document.createElement('img');
			img.style.cssText = 'display:block;width:100%;height:100%;border:0;'
			img.src = list[i].url;
			oA.appendChild(img);
			oLi.appendChild(oA);
			this.oUl.appendChild(oLi);
			//创建小圆点;
			var small = document.createElement('span');
			small.index = i;
			small.className = 'small';
			small.style.cssText = 'display:inline-block;width:5px;height:5px;border:1px solid #7b8496; background:#000000;opacity:0.3;filter:alpha(opacity=30);border-radius:50%;position:absolute;';
			small.style.bottom = "25px";
			small.style.right = (35+(4-i)*20) + 'px';
			box.appendChild(small);
		}
		//创建左右按钮
		this.prev = document.createElement('a');
		this.prev.flag = 'prev';
		this.prev.style.cssText = 'display:block;color:#B4B5BD;position:absolute;width:41px;height:70px;top:'+(h-42)/2+'px;z-index:5;text-decoration:none;background:url(images/icon-slides.png) no-repeat;';
		this.prev.style.backgroundPosition = '-84px 0';
		this.next = document.createElement('a');
		this.next.flag = 'next';	
		this.next.href = this.prev.href = 'javascript:void(0);';
		this.next.style.cssText = this.prev.style.cssText;
		this.next.style.backgroundPosition = '-125px 0';
		this.next.style.right = 0;
		this.prev.style.left = '230px';
		box.appendChild(this.prev);	
		box.appendChild(this.next);	
		
	},
		//淡入淡出版
	fade:function(){
		var box = this.box;
		var w = this.boxWid;
		var h = this.boxHei;
		var list = this.urlList;
		var ctnBox = this.oUl;
		var cells = ctnBox.children;
		var small = document.getElementsByClassName('small');
		//容器样式
		box.style.cssText = 'position:relative;overflow:hidden;';
		box.style.height = h +'px';
		//图片容器布局
		ctnBox.style.cssText = 'width:'+w+'px;height:'+h+'px;position:relative;';

		for(var i = 0;i < cells.length;i++){
			cells[i].style.position = 'absolute';
			cells[i].style.left = 0;
			cells[i].style.top = 0;
			cells[i].style.opacity = 0;
			cells[i].style.filter = 'alpha(opacity=0)';
		}
		cells[0].style.opacity = 1;
		cells[0].style.filter = 'alpha(opacity=100)';
		//开始轮播
		var flag = true;
		var self = this;
		//设置自动轮播
		small[0].style.background = '#ffffff';
		this.timer = setTimeout(fade,this.times*1000);
		function fade(){			
			self.index++;
			if(self.index==cells.length){
				self.index = 0;
			}
			for(var i = 0;i < cells.length;i++){
				animation(cells[i],'opacity',0)
			}
			for(var j = 0; j <cells.length ;j++){
				small[j].style.background = "#000000";
			}
			small[self.index].style.background = '#ffffff';
			animation(cells[self.index],'opacity',1,function(){
					
				clearTimeout(self.timer)
				if(flag){
					self.timer = setTimeout(fade,self.times*1000);
				}
			})
		}
		//点击切换
		//切换事件
		box.onmouseover = function(){
			flag = false;
			clearTimeout(self.timer);
			//self.next.style.display = self.prev.style.display = 'block';
		}
		this.next.onmouseenter = function(){
			this.style.backgroundPosition = '-42px 0' ;
		}
		this.next.onmouseleave = function(){
			this.style.backgroundPosition = '-125px 0';
		}
		this.prev.onmouseenter = function(){
			this.style.backgroundPosition = '0 0';
		}
		this.prev.onmouseleave = function(){
			this.style.backgroundPosition = '-84px 0';
		}
		box.onmouseout = function(){
			flag = true;
			self.timer = setTimeout(fade,self.times*1000);
		}
		box.onclick = function(event){
			var e = event||window.event;
			var btn = e.target?e.target:e.srcElement;
			//缩略图切换
			if(btn.nodeName.toLowerCase()=='span'){
				self.index = btn.index;
				for(var i = 0;i < cells.length;i++){
					animation(cells[i],'opacity',0);
					small[i].style.background = '#000000';
				}
				animation(cells[self.index],'opacity',1);
				small[self.index].style.background = '#ffffff';
			}
			//左右切换
			if(btn.flag=='prev'){
				self.index--;
				if(self.index==-1){
					self.index = cells.length-1;
				}
				for(var i = 0;i < cells.length;i++){
					animation(cells[i],'opacity',0)
				}
				animation(cells[self.index],'opacity',1)
			}
			if(btn.flag == 'next'){
				self.index++;
				if(self.index==cells.length){
					self.index = 0;
				}
				for(var i = 0;i < cells.length;i++){
					animation(cells[i],'opacity',0)
				}
				animation(cells[self.index],'opacity',1)
			}
		}
	}
}