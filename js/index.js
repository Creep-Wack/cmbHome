(function(){

	var _oW = window.screen.width;

	var CmbIndex={};
	CmbIndex.loadAdvertisement = function(_url){//装载首页广告
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			error:function(data){
				console.log('error'+arguments[1]);
			},
			success:function(data){
				// var htmlObj={};
				// htmlObj.bannerObj = $.grep(data,function(obj){
				// 	return obj.ModelType==1&&obj.ModelSysno==-1
				// });
				var content;
				$.each(data,function(ind,obj){//一级遍历原始JSON对象
					if(obj.ModelSysno==-1||obj.ModelType==1){//组装首页轮播
						content="<div class=\"banner-slide swiper-slide\"><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></div>";
						$('#banner-slider-wrap').append(content);
					}
					else if(obj.ModelSysno==-2||obj.ModelType==2){//专区图标
						content= "<li><a href=\""+obj.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+obj.ResourceUrl+"\"></a></li>";
						$('#nav-tab').append(content);
					}
					else if(obj.ModelSysno==-3||obj.ModelType==3){//跑马灯
						content= "<li class=\"swiper-slide\"><a href=\""+obj.Link+"\">"+obj.marqueeText+"</a></li>";
						$('#marquee-wrap').append(content);
					}
					else if(obj.ModelSysno==-5||obj.ModelType==5){//底部TAB
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
	CmbIndex.loadAdvertisement('./res/test.json');
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
	var Slide = {
		init_len:0,
		ifClick:false
	};//Slide小滑条对象


	Slide.addAct = function(num){//更改激活nav
		$('.slide-nav').removeClass('active').eq(num).addClass('active');
	}
	$('.slide-nav').click(function(){
		Slide.ifClick=true;
		var ind = $('.slide-nav').index($(this));
		$('.slide-nav').removeClass('active').eq(ind).addClass('active');
		mainSwiper.slideTo(ind);
	});


	  

	//Swiper部分
	//主页面整体Swiper
	var mainSwiper = new Swiper('.main-swiper-container',{
		autoHeight:true,
		resistanceRatio : 0,
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

	var navSwiper = new Swiper('.nav-swiper-container',{
		setWrapperSize :true,
		slidesPerView : 'auto'
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
		slidesPerView:3.4
	});
	//通用580高度通栏轮播
	var dealSwiper = new Swiper('.common-h580-banner',{
		autoplay:3000,
		pagination : '.common-pagination',
		loop:true,
		autoplayDisableOnInteraction:false
	});
})()
