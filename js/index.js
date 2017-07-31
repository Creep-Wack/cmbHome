/* 
2017-7-24 17:19:21 更新内容
1、新增每日特惠板块LOAD
2、更换页面时清空Floor对象存储内容 释放内存
3、更换了部分CSS样式
4、整理了原HTML结构

2017-7-31 17:51:21 更新内容
1、同步增加goUrl方法
2、更换部分css样式
3、1X8A  模板部分class更换
*/
var _oW = window.screen.width;
var _floorUrl = './res/getFloor.json';//模块楼层
var _adUrl = './res/getAd.json';//固定位置（顶部轮播通栏、底部导航、跑马灯、每日特惠板块头图、专区图标）
var _tabUrl = './res/getTab.json';//顶部导航
var _dailyDealUrl = './res/getDailyDeal.json';//每日特惠商品列表
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
				console.log(arguments[1]);
			},
			success:function(data){
				// console.log(data);
				var content="";
				$.each(data,function(ind,obj){//遍历原始JSON对象
					content+="<div class=\"swiper-slide slide-nav\" data-sysNo=\""+obj.Sysno+"\"><em></em>"+obj.SecondaryPageName+"</div>";
					$('#main-swiper-wrap').append("<div class=\"main-slide swiper-slide\" data-hash=\"slide\"><div class=\"floorCont\"></div></div>");
					
				});
				$('#top-nav').append(content);
				navSwiper.update();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			}
		});	
	}

	Slide.loadSlide(_tabUrl);

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
				var lunboArr = new Array();
				$.each(data,function(ind,obj){//一级遍历原始JSON对象
					if(obj.ModelSysno==-1){//组装首页轮播
						lunboArr.push(obj);
						// content="<div class=\"banner-slide swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
						// $('#banner-slider-wrap').append(content);
					}
					else if(obj.ModelSysno==-2){//专区图标
						content= "<li><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></li>";
						$('#nav-tab').append(content);
					}
					else if(obj.ModelSysno==-3){//跑马灯
						content= "<li class=\"swiper-slide\"><a href=\""+obj.Link+"\">"+obj.marqueeText+"</a></li>";
						$('#marquee-wrap').append(content);
						$('#marquee').show();
					}
					else if(obj.ModelSysno==-4){//每日特惠！！！！！
						
						content = "<div class=\"container h360\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
						$('#dailyDeal-banner').append(content);
					}
				
					else if(obj.ModelSysno==-5){//底部TAB
						content= "<li><a href=\""+obj.Link+"\"><img src=\""+obj.ResourceUrl+"\"></a></li>";
						$('#footer-wrap').append(content);
						$('#footer').show();
					}

				});
				if(lunboArr.length==0){//无首屏轮播
					$('#banner-slider-container').hide();
				}
				else if(lunboArr.length==1){//一条首屏轮播
					content = "<div class=\"banner-slide swiper-slide\"><a href=\""+lunboArr[0].Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
					$('#banner-slider-container').prepend(content);
				}
				else{
					content="<div class=\"swiper-wrapper\" id=\"banner-slider-wrap\">";
					$.each(lunboArr,function(ind,obj){
						content+="<div class=\"banner-slide swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";

					});
					content+="</div>";
					$('#banner-slider-container').prepend(content);
					//首页通栏轮播Swiper
					var bannerSwiper = new Swiper('.banner-swiper-container',{
						autoplay:3000,
						pagination : '.banner-pagination',
						loop:true,
						setWrapperSize :true,
						autoplayDisableOnInteraction:false,
						observer:true
					});
				}
				
				//首页跑马灯Swiper
				var marqueeSwiper = new Swiper('.marquee-swiper-container',{
					direction:'vertical',
					autoplay:3000,
					loop:true,
					autoplayDisableOnInteraction:false
				});
				
				lazyL();
			}
		});
	}
	CmbIndex.loadDailyDeal = function(_url){
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			error:function(data){
				console.log(arguments[1]);
			},
			success:function(data){
				var content;
				$.each(data,function(ind,obj){//一级遍历原始JSON对象
						content  = "<div class=\"swiper-slide deal-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.DefaultImage+"\"><p class=\"deal-name\">"+obj.ProductName+"</p><p class=\"deal-price\">"+obj.Price+"</p></a></div>";
						$('#dailyDealAd').append(content);

				});
				//每日特惠推荐商品Swiper
				var dealSwiper = new Swiper('.dailyDeal-swiper-container',{
					direction:'horizontal',
					slidesPerView:3.8
				});
				
				lazyL();
			}
		});
		
	}
	CmbIndex.loadDailyDeal(_dailyDealUrl);
	CmbIndex.loadAdvertisement(_adUrl);
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
	Slide.alreadyLoadArr=new Array();//存储已加载的页面
	Slide.verifyPage = function(num){
		if(Slide.alreadyLoadArr.indexOf(num)==-1){
			Slide.alreadyLoadArr.push(num);
			Floor.clear();
			Floor.loadFloor(num,_floorUrl);
		}
		else{
			return;
		}
	}
	var mainSwiper = new Swiper('.main-swiper-container',{
		autoHeight:true,
		resistanceRatio : 0,
		observer:true,
		touchAngle : 25,
		observeParents:true,
		hashnav:true,
		onSlideChangeEnd:function(swiper){//主页面slide切换完成触发
			var _Id = swiper.activeIndex;
			navSwiper.slideTo(_Id-3);//导航slide滑动到相应位置
			
			Slide.addAct(_Id);

			// setTimeout('function(){Slide.Start();Slide.animateTo(300);}',1800);
			
			$('.show-slide').removeClass('show-slide');
			if(_Id!=0){//二级页
				Slide.verifyPage($('.slide-nav.active').attr('data-sysNo'),_floorUrl);
			}
			
			imgMark=0;
			$('.main-slide.swiper-slide-active').addClass('show-slide');
			imgObj=$(".show-slide img");
			lazyL();
			Slide.ifClick=false;
		}

	});



	

	//楼层商品列表Swiper
	var dealSwiper = new Swiper('.goods-swiper-container',{
		direction:'horizontal',
		slidesPerView:3.4,
		observer:true
	});
	//通用580高度通栏轮播
	var h580Swiper = new Swiper('.common-h580-banner',{
		pagination : '.common-pagination',
		loop:true,
		observer:true
	});
	//通用360高度通栏轮播
	var h360Swiper = new Swiper('.common-h360-container',{
		pagination : '.common-pagination',
		loop:true,
		observer:true
	});

//模块化部分START   

	var Floor = new Object();
	Floor.SysnoCont = new Array();//保存模块ID指针
	Floor.TypeCont = new Array();//保存模块类型指针
	Floor.blockCont = new Array();//保存各楼层对象
	Floor.clear = function(){//!!!!!!清空容器释放内存!!!!!!!!!!!!!!!!!!!!!!
		Floor.SysnoCont = new Array();
		Floor.TypeCont = new Array();
		Floor.blockCont = new Array();
	}
	Floor.reDefineSwiper = function(){
		h360Swiper = new Swiper('.common-h360-banner',{
			// pagination : '.common-pagination',
			loop:true,
			observer:true,
			autoplay:3000
		});
		dealSwiper = new Swiper('.goods-swiper-container',{
			slidesPerView:3.4,
			observer:true
		});
		h580Swiper = new Swiper('.common-h580-banner',{
			pagination : '.common-pagination',
			autoplay:3000,
			autoplayDisableOnInteraction:false,
			loop:true,
			observer:true
		});

	}
	Floor.loadFloor = function(sysNo,_url){//装载楼层
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			data:{
				sysno:sysNo
			},
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
				$('.floorCont').eq(sysNo).append(content);	
				lazyL();
				Floor.reDefineSwiper();
				// mainSwiper.update();
				mainSwiper.onResize();
			}	
		});		
	}
	Floor.loadBlock = function(style,obj){//页面组装	
		var _html = "<section class=\"container\">";
		var counter=0;//当前对象内部计数器
		var lastPosition=0;//上一个对象类型
		// console.log(obj);
		var tailHtml="";
		var lunboArr = new Array();
		if(style==1){//横幅模块  1-120楼层标题  2-580高度通栏横幅
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\"></div>";
				}
				else if(v.Position==2){//580高度轮播
					lastPosition=v.Position;
					if(counter<5){//限制广告张数
						lunboArr.push(v);
					}
				}
				counter++;
			});
			if(lunboArr.length==0){}//无轮播
			else if(lunboArr.length==1){//一条首屏轮播
				_html+= "<div class=\"h580 fullHeight\"><a href=\""+lunboArr[0].Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
				tailHtml="";
			}
			else{
				_html+="<div class=\"swiper-container common-h580-banner container\"><div class=\"swiper-wrapper\">";
				$.each(lunboArr,function(ind,obj){
					_html += "<div class=\"swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
				});
			}
		}
		else if(style==2){//1X3模块  1-楼层标题  3  p1 左侧540X560大图  p2 右上540x280 p3 右下540X280
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//540X560高度
					lastPosition=v.Position;
					_html += "<div class=\"h560 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
				}
				else if(v.Position==3||v.Position==4){//540X280高度 上下
					lastPosition=v.Position;
					_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
				}
				counter++;
			});
		}
		else if(style==3){//1X4模块  1-楼层标题  2-540X360 一行两列广告模块
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					_html+= "<div class=\"block-title h120\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//540X360高度
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h360 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter<4){//限制广告数量4张以内
						_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						_html+="";
					}

				}
				counter++;
			});
		}
		else if(style==4){//1X8A模块  1-120楼层标题  8-270X320  一行4列广告位
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
				else if(v.Position==2){//320高度一行四列广告位
					lastPosition=v.Position;
					if(counter==0){//第一张广告  2017-7-31 修改class h250-->h320
						_html += "<div class=\"h320 columns col4 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter<8){//限制广告数量8张以内
						_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						_html+="";
					}
				}
				counter++;
			});
		}
		else if(style==5){//1X8B模块  1-120楼层标题  8-540X250  一行2列广告位
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
				else if(v.Position==2){//250高度广告
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h250 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter<8){//限制广告数量8张以内
						_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						_html+="";
					}
				}
				counter++;
			});
		}
		else if(style==6){//1X1X3模块  1-120楼层标题  1-360高度通栏横幅 3-商品模块
			var beforeHtml=middleHtml=afterHtml='';
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					beforeHtml= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
				}
				else if(v.Position==2){//360高度轮播
					lastPosition=v.Position;
					if(counter<5){//限制广告张数
						lunboArr.push(v);
					}
				}
				else if(v.Position==3){//360高度轮播
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						afterHtml += "<div class=\"h360 goods-list-wrap\"><div class=\"swiper-container goods-swiper-container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\" ></a></div>";
					}
					else if(counter>0){//限制广告
						afterHtml += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>"
					}
					else{
						afterHtml+="";
					}
				}
				counter++;
			});
			if(lunboArr.length==0){}//无轮播
			else if(lunboArr.length==1){//一条首屏轮播
				middleHtml+= "<div class=\"h360 fullHeight\"><a href=\""+lunboArr[0].Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
				tailHtml="";
			}
			else{
				middleHtml+="<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\">";
				$.each(lunboArr,function(ind,obj){
					middleHtml += "<div class=\"swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
				});
				middleHtml +="</div><div class=\"common-pagination\"></div></div>";
			}
			_html+=beforeHtml+middleHtml+afterHtml;
		}
		else if(style==7){//1X1X4X8模块 position:1-楼层标题  2-360高度通栏轮播  3-540X280高度一行两列广告位  4-270X360高度一行四列广告位
			var beforeHtml=middleHtml=afterHtml='';
			$.each(obj,function(k,v){
				tailHtml = Floor.addTail(style,lastPosition,k,obj);
				
				if(lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
					counter=0;
					if(lastPosition==3){
						afterHtml+="</div>";
					}
				}
				if(v.Position==1){//楼层标题
					lastPosition=v.Position;
					// _html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\"></div>";
					beforeHtml="<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\"></div>";
				}
				else if(v.Position==2){//360高度轮播
					lastPosition=v.Position;
					if(counter<5){//限制广告张数
						lunboArr.push(v);
					}
				}
				else if(v.Position==3){
					lastPosition=v.Position;
					
					if(counter==0){//第一张540X280高广告位
						afterHtml += "<div class=\"h280 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<4){//限制广告数量4张以内
						afterHtml += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						afterHtml+="";
					}
				}
				else if(v.Position==4){
					lastPosition=v.Position;
					
					if(!counter){//第一张270X360高广告位
						afterHtml += "<div class=\"h360 columns col4 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<=7){//限制广告数量8张以内
						afterHtml += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
				}
				counter++;
				
			});
			if(lunboArr.length==0){}//无轮播
			else if(lunboArr.length==1){//一条首屏轮播
				middleHtml+= "<div class=\"h360 fullHeight\"><a href=\""+lunboArr[0].Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
				tailHtml="";
			}
			else{
				middleHtml+="<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\">";
				$.each(lunboArr,function(ind,obj){
					middleHtml += "<div class=\"swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
				});
				middleHtml +="</div><div class=\"common-pagination\"></div></div>";
			}
			_html+=beforeHtml+middleHtml+afterHtml;

			
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
			if(sty==1){
				switch (lastpos)
					{
						case 0:
						case 1:
							return "";
						 	break;
						case 2:
							return "</div><div class=\"common-pagination\"></div></div>";
							break;
					}
			}
			else if(sty==2){
				switch (lastpos)
					{
						case 0:
						case 1:
							return "";
						 	break;
						case 2:
						case 3:
						case 4:
							return "</div>";
							break;
					}
			}
			else if(sty==3||sty==4||sty==5){
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
			else if(sty==6){
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
			else if(sty==7){
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
			else{
				return "";
			}
		}

	}
	Floor.loadFloor(0,_floorUrl);//刚进入时加载首页
}

//添加goUrl方法
function goUrl(url){
	window.location.href = url;
}