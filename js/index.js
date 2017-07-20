window.onload = function(){
	// for rem  根文字大小调整
	(function (doc, win) {
	    var docEl     = doc.documentElement,
	        resizeEvt = "onorientationchange" in window ? "orientationchange" : "resize",
	        recalc    = function () {
	             // var clientWidth = docEl.clientWidth;
	            var clientWidth = document.body.offsetWidth;
	            if (!clientWidth) return;
	            docEl.style.fontSize = 100 * (clientWidth / 1080) + "px";
	        };
	    recalc();
	    if (!doc.addEventListener) return;
	    win.addEventListener(resizeEvt, recalc, false);
	})(document, window); 


// 顶部滑条部分 START
	var _oW = window.screen.width;
	var Slide = {
		ifClick:false
	};//Slide小滑条对象
	Slide.addAct = function(num){//更改激活nav
		$('.slide-nav').removeClass('active').eq(num).addClass('active');
	}
	$('#navCont').delegate('.slide-nav','click',function(){
		Slide.ifClick=true;
		var ind = $('.slide-nav').index($(this));
		$('.slide-nav').removeClass('active').eq(ind).addClass('active');
		mainSwiper.slideTo(ind);
	});
	var navSwiper = new Swiper('.nav-swiper-container',{
					setWrapperSize :true,
					slidesPerView : 'auto',
					observer:true
				});
	Slide.loadSlide = function(_url){//装载顶部导航
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			async:false,
			error:function(data){
				console.log('error'+arguments[1]);
			},
			success:function(data){
				// console.log(data);
				var content="";
				$.each(data,function(ind,obj){//遍历原始JSON对象
					content+="<div class=\"swiper-slide slide-nav\"><em></em>"+obj.SecondaryPageName+"</div>";
					$('#main-swiper-wrap').append("<div class=\"main-slide swiper-slide\"></div>");
						
				});
				$('#top-nav').append(content);
				navSwiper.update();

			}
		});	
	}

	Slide.loadSlide('./res/getTab.json');

// 顶部滑条部分  END


//首页对象 
	var CmbIndex={};
	CmbIndex.loadAdvertisement = function(_url){//装载首页固定模块
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			error:function(data){
				console.log('error!'+arguments[1]);
			},
			success:function(data){
				var content;
				$.each(data,function(ind,obj){//一级遍历原始JSON对象
					if(obj.ModelSysno==-1){//组装首页轮播
						content="<div class=\"banner-slide swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
						$('#banner-slider-wrap').append(content);
					}
					else if(obj.ModelSysno==-2){//专区图标
						content= "<li><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></li>";
						$('#nav-tab').append(content);
					}
					else if(obj.ModelSysno==-3){//跑马灯
						content= "<li class=\"swiper-slide\"><a href=\""+obj.Link+"\">"+obj.marqueeText+"</a></li>";
						$('#marquee-wrap').append(content);
					}
					else if(obj.ModelSysno==-5){//底部TAB
						content= "<li><a href=\""+obj.Link+"\"><img src=\""+obj.ResourceUrl+"\"></a></li>";
						$('#footer-wrap').append(content);
					}

				});
				//首页通栏轮播Swiper
				var bannerSwiper = new Swiper('.banner-swiper-container',{
					autoplay:3000,
					pagination : '.banner-pagination',
					loop:true,
					setWrapperSize :true,
					autoplayDisableOnInteraction:false,
					observer:true
				});
				
				lazyL();
			}
		});
	}
	CmbIndex.loadAdvertisement('./res/getAd.json');
	// Cmb.build = function(type,obj){
	// 	switch(type){
	// 		case -1:

	// 	}
	// }
	//img懒加载START

	 var imgObj=$(".show-slide img");
	 var imgMark=0;

	 window.onscroll=lazyL;
	 function lazyL(){//懒加载
	 	imgMark=0;
		imgObj=$(".show-slide img");
	   var seeHeight = document.documentElement.clientHeight;
	   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//兼容chrome
	   for(var i=imgMark;i<imgObj.length;i++){
	     if(imgObj[i].offsetTop <seeHeight + scrollTop){
	         if(imgObj[i].getAttribute("src")=="https://img01.mall.cmbchina.com/banner/default.jpg"){//二次验证
	           imgObj[i].src = imgObj[i].getAttribute("data-original");//获取data-src重载src
	         } 
	     }
	     else{
	       imgMark=i;
	       break;//记下当前加载图片序号  退出循环
	     }
	   }
	 }
	 lazyL();
	 //END

	
	

	//弹屏浮层阻止事件冒泡
	var _flWrap = document.getElementById('float_wrap');

	_flWrap.addEventListener('touchmove',function(event){
		event.preventDefault();
	　　event.stopPropagation();
	});

	$('#close_floatWrap').click(function(){
		_flWrap.style.display='none';
	});
	//顶部滑条跟随			  
	//Swiper部分
	//主页面整体Swiper
	var mainSwiper = new Swiper('.main-swiper-container',{
		autoHeight:true,
		resistanceRatio : 0,
		observer:true,
		onSlideChangeEnd:function(swiper){//主页面slide切换完成触发
			var _Id = swiper.activeIndex;
			navSwiper.slideTo(_Id-3);//导航slide滑动到相应位置
			
			Slide.addAct(_Id);

			// setTimeout('function(){Slide.Start();Slide.animateTo(300);}',1800);
			
			$('.show-slide').removeClass('show-slide');

			imgMark=0;
			$('.main-slide.swiper-slide-active').addClass('show-slide');
			imgObj=$(".show-slide img");
			lazyL();
			Slide.ifClick=false;

		}

	});



	
	//首页跑马灯Swiper
	var marqueeSwiper = new Swiper('.marquee-swiper-container',{
		direction:'vertical',
		autoplay:false,
		loop:true,
		autoplayDisableOnInteraction:false
	});

	//每日特惠推荐商品Swiper
	var dealSwiper = new Swiper('.dailyDeal-swiper-container',{
		direction:'horizontal',
		slidesPerView:3.8
	});

	//楼层商品列表Swiper
	var dealSwiper = new Swiper('.goods-swiper-container',{
		direction:'horizontal',
		slidesPerView:3.4,
		observer:true
	});
	//通用580高度通栏轮播
	var dealSwiper = new Swiper('.common-h580-banner',{
		autoplay:3000,
		pagination : '.common-pagination',
		loop:true,
		autoplayDisableOnInteraction:false
	});
	//通用360高度通栏轮播
	var h360Swiper = new Swiper('.common-h360-container',{
		autoplay:3000,
		pagination : '.common-pagination',
		loop:true,
		observer:true,
		autoplayDisableOnInteraction:false
	});
//模块化部分START   

	var Floor = new Object();
	Floor.SysnoCont = new Array();//保存模块ID指针
	Floor.TypeCont = new Array();//保存模块类型指针
	Floor.blockCont = new Array();//保存各楼层对象
	Floor.loadFloor = function(_url){//装载楼层
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			error:function(data){
				console.log('error'+arguments[1]);
			},
			success:function(data){
				var content="";
				$.each(data,function(ind,obj){//遍历原始JSON对象
					if(Floor.SysnoCont.indexOf(obj.ModelSysno)==-1){//新模块则新建一个数组存放模块内容
						Floor.SysnoCont.push(obj.ModelSysno);
						Floor.TypeCont.push(obj.ModelType);
						Floor.blockCont.push(new Array());
					}
					Floor.blockCont[Floor.blockCont.length-1].push(obj);	
				});
				$.each(Floor.blockCont,function(key,value){
					content += Floor.loadBlock(Floor.TypeCont[key],value);
				});
				// console.log(content);
				$('.index-page').append(content);
				h360Swiper = new Swiper('.common-h360-container',{
					autoplay:3000,
					pagination : '.common-pagination',
					loop:true,
					observer:true,
					autoplayDisableOnInteraction:false
				});
				dealSwiper = new Swiper('.goods-swiper-container',{
					direction:'horizontal',
					slidesPerView:3.4,
					observer:true
				});
				mainSwiper.update();
			}
		});		
	}
	Floor.loadBlock = function(style,obj){//页面组装	
		var _html = "<section class=\"container\">";
		var counter=0;//当前对象内部计数器
		var lastPosition=0;//上一个对象类型
		// console.log(obj);
		var tailHtml="";
		if(style==1148){//1X1X4X8模块 position:1-楼层标题  2-360高度通栏轮播  3-540X280高度一行两列广告位  4-270X360高度一行四列广告位

			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				// console.log(lastPosition+'||'+v.Position);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
					if(lastPosition==2){
						_html+="</div><div class=\"common-pagination\"></div></div>";
					}
					else if(lastPosition==3){
						_html+="</div>";
					}
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//360高度轮播
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
					}
					else if(0<counter<=4){//限制广告数量五张以内
						_html += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
					}
					else{
						_html+="";
					}
				}
				else if(v.Position==3){
					lastPosition=v.Position;
					
					if(counter==0){//第一张540X280高广告位
						_html += "<div class=\"h280 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<4){//限制广告数量4张以内
						_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						_html+="";
					}
				}
				else if(v.Position==4){
					lastPosition=v.Position;
					
					if(!counter){//第一张270X360高广告位
						_html += "<div class=\"h360 columns col4 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<=7){//限制广告数量8张以内
						_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
				}
				counter++;
				
			});

			
		}
		else if(style==14){//1X4模块  1-楼层标题  2-540X360 一行两列广告模块
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//540X360高度
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h360 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter<=3){//限制广告数量4张以内
						_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						_html+="";
					}

				}
				counter++;
			});
		}
		else if(style==113){//1X1X3模块  1-120楼层标题  1-360高度通栏横幅 3-商品模块
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
					if(lastPosition==2){
						_html+="</div><div class=\"common-pagination\"></div></div>";
					}
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//360高度轮播
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
					}
					else if(0<counter<=4){//限制广告数量五张以内
						_html += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
					}
					else{
						_html+="";
					}
				}
				else if(v.Position==3){//360高度轮播
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h360 goods-list-wrap\"><div class=\"swiper-container goods-swiper-container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\" ></a></div>";
					}
					else if(counter>0){//限制广告
						_html += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>"
					}
					else{
						_html+="";
					}
				}
				counter++;
			});
		}
		else if(style==181){//1X8模块  1-120楼层标题  8-270X320  一列行广告位
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
					if(lastPosition==2){
						_html+="</div><div class=\"common-pagination\"></div></div>";
					}
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//360高度轮播
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
					}
					else if(0<counter<=4){//限制广告数量五张以内
						_html += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
					}
					else{
						_html+="";
					}
				}
				else if(v.Position==3){//360高度轮播
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h360 goods-list-wrap\"><div class=\"swiper-container goods-swiper-container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\" ></a></div>";
					}
					else if(counter>0){//限制广告
						_html += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>"
					}
					else{
						_html+="";
					}
				}
				counter++;
			});
		}
		else{
			return '';
		}

		_html+=tailHtml+"</section>";
		tailHtml="";
		return _html;

	}
	Floor.addTail = function(sty,lastpos,ind,o){//处理模块尾部
		if(ind==o.length-1){
			if(sty==1148){
				switch (lastpos)
					{	
						case 0:
						case 1:
							return "";
							break;
						case 2:
							return "</div><div class=\"common-pagination\"></div></div>";
							break;
						case 3:
						case 4:
							return "</div>";
							break;
					}
			}
			else if(sty==14){
				switch (lastpos)
					{
						case 0:
						case 1:
							return "";
						 	break;
						case 2:
							return "</div>";
							break;
					}
			}
			else if(sty==113){
				switch (lastpos)
					{
						case 0:
						case 1:
							return "";
						 	break;
						case 2:
							return "</div><div class=\"common-pagination\"></div></div>";
							break;
						case 3:
							return "</div>";
							break;
					}
			}
			else{
				return "";
			}
		}

	}
	Floor.loadFloor('./res/getFloor.json');
}