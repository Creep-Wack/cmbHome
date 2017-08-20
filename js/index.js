
var _oW = document.documentElement.clientWidth;
var _oH = document.documentElement.clientHeight;
// var _adUrl = '/Home/GetHomeAdvertisement';//固定位置（顶部轮播通栏、底部导航、跑马灯、每日特惠板块头图、专区图标）
// var _tabUrl = '/Home/GetSecondaryPage';//顶部导航
// var _dailyDealUrl = '/Home/GetDaypreference';//每日特惠商品列表
// var _statisticsUrl = 'https://ssl.mall.cmbchina.com/sts/api/PageLoger';//数据统计接口
// var _floorUrl = '/Home/GetAdvertisement';//模块楼层

var _statisticsUrl = 'https://ssl.mall.cmbchina.com/sts/api/PageLoger';//数据统计接口
var _floorUrl = 'Home/GetAdvertisement.json';//模块楼层
var _adUrl = 'Home/GetHomeAdvertisement.json';//固定位置（顶部轮播通栏、底部导航、跑马灯、每日特惠板块头图、专区图标）
var _tabUrl = 'Home/GetSecondaryPage.json';//顶部导航
var _dailyDealUrl = 'Home/GetDaypreference.json';//每日特惠商品列表
var mainSwiper;
var navNameArr= ['首页'] ;
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
	    win.addEventListener(resizeEvt, recalc, true);
	})(document, window); 

 

// 顶部滑条部分 START
	
	var Slide = {
		ifClick:false
	};//Slide小滑条对象
	Slide.addAct = function(num){//更改激活nav
		$('.slide-nav').removeClass('active').eq(num).addClass('active');
	}
	Slide.navCont = new Array();//新增导航容器
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
					navNameArr.push(obj.SecondaryPageName);//存储页面名称到容器中
					$('#main-swiper-wrap').append("<div class=\"main-slide swiper-slide\"><div class=\"floorCont\"></div></div>");
					Slide.navCont.push(obj.Sysno);//导航容器组装
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
				var counter=0;
				$.each(data,function(ind,obj){//一级遍历原始JSON对象
					if(obj.ModelSysno==-1){//组装首页轮播
						lunboArr.push(obj);
						// content="<div class=\"banner-slide swiper-slide\"><a href=\""+obj.AppUrl+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
						// $('#banner-slider-wrap').append(content);
					}
					else if(obj.ModelSysno==-2){//专区图标
						content= "<li><a href=\"javascript:void(0)\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></li>";
						$('#nav-tab').append(content);
					}
					else if(obj.ModelSysno==-3){//跑马灯
						$('#marqueeCont .topline-icon').attr('href',obj.TopLineAppUrl);
						content = "<li class=\"swiper-slide\"><a href=\"javascript:void(0)\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+">" + obj.AdvertisementName + "</a></li>";
						$('#marquee-wrap').append(content);
						$('#marqueeCont').show();
					}
					else if(obj.ModelSysno==-4){//每日特惠Banner
						
						content = "<div class=\"container h200\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
						if(!counter){
							$('#dailyDeal-banner').append(content);
						}
						counter++;
					}
				
					else if(obj.ModelSysno==-5){//底部TAB
						content= "<li><a href=\"javascript:void(0)\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\""+obj.ResourceUrl+"\"></a></li>";
						$('#footer-wrap').append(content);
						$('#footer').show();
					}

				});
				if(lunboArr.length==0){//无首屏轮播
					$('#banner-out-wrap').hide();
				}
				else if(lunboArr.length==1){//一条首屏轮播
					content = "<div class=\"banner-slide swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+lunboArr[0].AdvertisementName+" data-modelSysno="+lunboArr[0].ModelSysno+" data-Position="+lunboArr[0].Position+" data-sysNo="+lunboArr[0].Sysno+" data-link="+lunboArr[0].AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
					$('#banner-slider-container').prepend(content);
				}
				else{
					content="<div class=\"swiper-wrapper\" id=\"banner-slider-wrap\">";
					$.each(lunboArr,function(ind,obj){
						content+="<div class=\"banner-slide swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></div>";

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
	CmbIndex.loadDailyDeal = function(_url){//每日特惠商品
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			error:function(data){
				console.log(arguments[1]);
			},
			success:function(data){
				var content;
				var counter=0;
				$.each(data,function(ind,obj){//一级遍历原始JSON对象
					if(counter<6){
						content  = "<div class=\"swiper-slide deal-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType=0 data-modelSysno="+obj.ProductSysno+" data-Position="+obj.PositionID+" data-sysNo="+obj.ProductCode+" data-link="+obj.DaypreferenceLink+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.DefaultImage+"\"><p class=\"deal-name\">"+obj.ProductName+"</p><p class=\"deal-price\">"+obj.Price+"</p></a></div>";
						$('#dailyDealAd').append(content);
						counter++;
					}
					else{
						return;
					}
				});
				//每日特惠推荐商品Swiper
				var dealSwiper = new Swiper('.dailyDeal-swiper-container',{
					direction:'horizontal',
					slidesPerView:'auto',
					resistanceRatio : 0
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
	 var _oScroll =  document.getElementsByClassName('show-slide')[0];

	 $(".main-slide").scroll(function(){
	 	lazyL();
 });
	 function lazyL(){//懒加载
	 	_oScroll =  document.getElementsByClassName('show-slide')[0];
	 	// console.log(1);
	 	imgMark=0;
		imgObj=$(".show-slide img");
	   var seeHeight = document.documentElement.clientHeight;
	   // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//兼容chrome
	   var scrollTop = _oScroll.scrollTop || document.body.scrollTop;
	   for(var i=imgMark;i<imgObj.length;i++){
	     if(imgObj[i].offsetTop <seeHeight + scrollTop){
	         if(imgObj[i].getAttribute("src")=="https://img01.mall.cmbchina.com/banner/default_02.png"){//二次验证
	           imgObj[i].src = imgObj[i].getAttribute("data-original");//获取data-src重载src
	           // $(imgObj[i]).fadeIn();
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
	Slide.verifyPage = function(num,link){//验证页面
		if(Slide.alreadyLoadArr.indexOf(num)==-1){
			Slide.alreadyLoadArr.push(num);
			Floor.clear();
			Floor.loadFloor(num,_floorUrl);
		}
		else{
			return;
		}
		// console.log(Slide.alreadyLoadArr);
	}
	
	mainSwiper = new Swiper('.main-swiper-container',{
		resistanceRatio : 0,
		observer:true,
		touchAngle : 25,
		observeParents:true,
		onInit: function(swiper){
			fixViewHeight();
		},
		onTouchStart: function(swiper,even){
			if(mainSwiper.activeIndex!=0){//不在首页时往首页滑动将会将首页bannerz-index设为-1
				$('#banner-slider-container').css('z-index','-1');
			}
	    },
	    onTouchEnd: function(swiper){
	    	$('#banner-slider-container').css('z-index','10');
	    },
		onSlideChangeEnd:function(swiper){//主页面slide切换完成触发
			var _Id = swiper.activeIndex;
			navSwiper.slideTo(_Id-3);//导航slide滑动到相应位置
			
			Slide.addAct(_Id);
			$('.show-slide').removeClass('show-slide');
			if(_Id!=0){//二级页
				Slide.verifyPage($('.slide-nav.active').attr('data-sysno'),_floorUrl);
			}
			imgMark=0;
			$('.main-slide.swiper-slide-active').addClass('show-slide');
			_oScroll =  document.getElementsByClassName('show-slide')[0];
			if(_oScroll.scrollTop<_oH){//获取当前页面滚动条位置
				$('#goTop').fadeOut();
			}
			else{
				$('#goTop').fadeIn();
			}
			imgObj=$(".show-slide img");
			lazyL();
			Slide.ifClick=false;
		}

	});



	

	//楼层商品列表Swiper
	var dealSwiper = new Swiper('.goods-swiper-container',{
		direction:'horizontal',
		slidesPerView:'auto',
		observer:true
	});
	//通用500高度通栏轮播
	var h500Swiper = new Swiper('.common-h500-banner',{
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
		h500Swiper = new Swiper('.common-h500-banner',{
			pagination : '.common-pagination',
			autoplay:3000,
			autoplayDisableOnInteraction:false,
			loop:true,
			observer:true
		});

	}
	// console.log(Slide.navCont);
	Floor.loadFloor = function(sysNo,_url){//装载楼层
		$('#loading-block').show();
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
				// console.log(Slide.navCont.indexOf(+sysNo));
				//2017-8-1 14:05:39  更改楼层装载方式
				if(!$('.floorCont').eq(Slide.navCont.indexOf(+sysNo)+1).html()){
					$('.floorCont').eq(Slide.navCont.indexOf(+sysNo)+1).append(content);	//内容装入楼层
				}
				
				$('#loading-block').hide();
				lazyL();
				Floor.reDefineSwiper();
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
					_html+= "<div class=\"block-title h120 img_wrap\"><img src=\""+v.ResourceUrl+"\"></div>";
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
				_html+= "<div class=\"h500 fullHeight\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+lunboArr[0].AdvertisementName+" data-modelSysno="+lunboArr[0].ModelSysno+" data-Position="+lunboArr[0].Position+" data-sysNo="+lunboArr[0].Sysno+" data-link="+lunboArr[0].AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
				tailHtml="";
			}
			else{
				_html+="<div class=\"swiper-container common-h500-banner container\"><div class=\"swiper-wrapper\">";
				$.each(lunboArr,function(ind,obj){
					_html += "<div class=\"swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
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
					if(!counter){
						lastPosition=v.Position;
						_html+= "<div class=\"block-title h120 img_wrap\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
					}
					else{}
					
				}
				else if(v.Position==2){//540X560高度
					if(!counter){
						lastPosition=v.Position;
						_html += "<div class=\"h560 columns col2 clearfix\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{}
				}
				else if(v.Position==3){//540X280高度 上下
					if(counter<2){
						lastPosition=v.Position;
						_html += "<a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{}
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
					if(!counter){
						lastPosition=v.Position;
						_html+= "<div class=\"block-title h120 img_wrap\"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
					}
				}
				else if(v.Position==2){//540X360高度
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h360 columns col2 clearfix\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<4){//限制广告数量4张以内
						_html += "<a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
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
					if(!counter){
						lastPosition=v.Position;
						_html+= "<div class=\"block-title h120 img_wrap\"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
					}
				}
				else if(v.Position==2){//320高度一行四列广告位
					lastPosition=v.Position;
					if(counter==0){//第一张广告  2017-7-31 修改class h250-->h320
						_html += "<div class=\"h320 columns col4 clearfix\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<8){//限制广告数量8张以内
						_html += "<a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
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
					if(!counter){
						lastPosition=v.Position;
						_html+= "<div class=\"block-title h120 img_wrap\"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
					}
				}
				else if(v.Position==2){//250高度广告
					lastPosition=v.Position;
					if(counter==0){//第一张广告
						_html += "<div class=\"h250 columns col2 clearfix\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<8){//限制广告数量8张以内
						_html += "<a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
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
					if(!counter){
						lastPosition=v.Position;
						_html+= "<div class=\"block-title h120 img_wrap\"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
					}
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
						afterHtml += "<div class=\"h420 goods-list-wrap\"><div class=\"swiper-container goods-swiper-container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\" ></a></div>";
					}
					else if(counter>0&&counter<6){//限制最多六个商品
						afterHtml += "<div class=\"swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a></div>"
					}
					else{
						afterHtml+="";
					}
				}
				counter++;
			});
			if(lunboArr.length==0){}//无轮播
			else if(lunboArr.length==1){//一条首屏轮播
				middleHtml+= "<div class=\"h360 fullHeight\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+lunboArr[0].AdvertisementName+" data-modelSysno="+lunboArr[0].ModelSysno+" data-Position="+lunboArr[0].Position+" data-sysNo="+lunboArr[0].Sysno+" data-link="+lunboArr[0].AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
				tailHtml="";
			}
			else{
				middleHtml+="<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\">";
				$.each(lunboArr,function(ind,obj){
					middleHtml += "<div class=\"swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
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
					// _html+= "<div class=\"block-title h120 img_wrap\"><img src=\""+v.ResourceUrl+"\"></div>";
					beforeHtml="<div class=\"block-title h120 img_wrap\"><img src=\""+v.ResourceUrl+"\"></div>";
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
						afterHtml += "<div class=\"h280 columns col2 clearfix\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<4){//限制广告数量4张以内
						afterHtml += "<a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else{
						afterHtml+="";
					}
				}
				else if(v.Position==4){
					lastPosition=v.Position;
					
					if(!counter){//第一张270X360高广告位
						afterHtml += "<div class=\"h360 columns col4 clearfix\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
					else if(0<counter&&counter<8){//限制广告数量8张以内
						afterHtml += "<a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+v.AdvertisementName+" data-modelSysno="+v.ModelSysno+" data-Position="+v.Position+" data-sysNo="+v.Sysno+" data-link="+v.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+v.ResourceUrl+"\"></a>";
					}
				}
				counter++;
				
			});
			if(lunboArr.length==0){}//无轮播
			else if(lunboArr.length==1){//一条首屏轮播
				middleHtml+= "<div class=\"h360 fullHeight\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+lunboArr[0].AdvertisementName+" data-modelSysno="+lunboArr[0].ModelSysno+" data-Position="+lunboArr[0].Position+" data-sysNo="+lunboArr[0].Sysno+" data-link="+lunboArr[0].AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+lunboArr[0].ResourceUrl+"\"></a></div>";
				tailHtml="";
			}
			else{
				middleHtml+="<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\">";
				$.each(lunboArr,function(ind,obj){
					middleHtml += "<div class=\"swiper-slide\"><a href=\"javascript:void(0)\" class=\"img_wrap\" onclick=\"goUrl(this)\" data-adPageType="+obj.AdvertisementName+" data-modelSysno="+obj.ModelSysno+" data-Position="+obj.Position+" data-sysNo="+obj.Sysno+" data-link="+obj.AppUrl+"><img src=\"https://img01.mall.cmbchina.com/banner/default_02.png\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
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
	mainSwiper.update();


// 回到顶部模块
	
	$('.main-slide').scroll(function(event){ 
	    var wScrollY = _oScroll.scrollTop; // 当前滚动条位置               
	    if (wScrollY >= _oH) {      
	    	$('#goTop').fadeIn(400);   
	    }  
	    else{
	    	$('#goTop').fadeOut(400); 
	    }  
	});

	$('#goTop').on('tap',function(){
		$('.show-slide').animate({scrollTop:0},400); 
		$('html,body').animate({scrollTop:0},400); 
	}); 
	$('#goTop').on('click',function(){
		$('.show-slide').animate({scrollTop:0},400); 
		$('html,body').animate({scrollTop:0},400); 
	});  

}

//更新goUrl方法
function goUrl(_this){//一般广告跳转方法  
	IndexStatistics.updateDeviceId();
	var _data = 
	{
		sessionId: $('#token').val(),
		actionCode: $(_this).attr('data-adPageType')+"_"+$(_this).attr('data-modelSysno')+"_"+$(_this).attr('data-Position')+"_"+$(_this).attr('data-sysno'),
		source:$('#RouteChannelType').val(),
		pageCode:$('.slide-nav.active').text(),
		actionType:'click',
		data:JSON.stringify({index_sessionId:localStorage.index_sessionId||'unknown',source:$('#RouteChannelType').val(),pageCode:$('.slide-nav.active').text(),sessionId: $('#token').val(),actionCode: $(_this).attr('data-adPageType')+"_"+$(_this).attr('data-modelSysno')+"_"+$(_this).attr('data-Position')+"_"+$(_this).attr('data-sysno'),myDeviceId:IndexStatistics.updateDeviceId(),timestamp: +new Date()}),
		extraData:JSON.stringify({appName:navigator.appName,appVersion:navigator.appVersion,platform:navigator.platform})
	};
	 IndexStatistics.Send(_data);
	 if($(_this).attr('data-link')){
	 	window.location.href=$(_this).attr('data-link');	
	 }
	 
}


function jumpsearch(sourceObj) {
    var keyword = $('#keyword').val();
    if (keyword == "") {
        keyword = $('#keyword').attr("placeholder");
    }
    var url = "";
    if ($.trim(keyword) != "") {
        url = $(sourceObj).attr("data-src");
        url = url.replace("mykeyword", encodeURIComponent((encodeURIComponent(keyword))));
        //location.href = "/" + Cmb.WebUI.Common.GetChannelType() + "/Product/ProductSearchList?keyword=" + keyword;
    } else {
        //没有传递参数,跳转到查询页
        url = $(sourceObj).attr("data-emptysrc");
    }
    goUrl(url + "&bannersysno=0&hmsr=cl5&hmmd=search&hmpl=&hmkw=&hmci=");
    //location.href = url;
}

function goSecondPage(char){//二级页跳转方法  goSecondPage('首页');
	mainSwiper.slideTo(navNameArr.indexOf(char));
}

function fixViewHeight(){//修正视窗高度
	var sj_headH =$('.common-top').height()||0;//手机银行高度修正
	$('#mainWrap').height(_oH-$('#myNav').height()-sj_headH-$('#footer').height());//初始化重新定义container 高度
	$('#mainWrap').css({
		'margin-top':$('#myNav').height()+sj_headH,
		'margin-bottom':$('#footer').height()
	});
}
$(window).resize(function() {
  fixViewHeight();
});


// 统计
var IndexStatistics=new Object();
// 发送统计
IndexStatistics.Send = function(md_data) {//提交统计
	try{
		$.ajax({
            url: _statisticsUrl,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: md_data
        });
	}
	catch(e){}
  
}; 
IndexStatistics.updateDeviceId = function(){//机器唯一识别码
	if(!localStorage.myDeviceId){//首次登录
		function S4() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
		localStorage.myDeviceId = S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4();
	}
	return localStorage.myDeviceId;
}





