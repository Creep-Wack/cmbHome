(function(){

	var _oW = window.screen.width;
	// function doAjaxCall(_url){
	// 	var request = null;
	// 	if(window.XMLHttpRequest){
	// 		request = new XMLHttpRequest();
	// 	}
	// 	else if(window.ActiveObject){
	// 		request = new ActiveObject('Microsoft.XMLHTTP');
	// 	}

	// 	if(request){
	// 		request.open('GET',_url,true);
	// 		request.onreadystatechange = function(){
	// 			if(request.readyState===4){
	// 				if(request.status==200||request.status==0){
	// 					return request.responseText;
	// 				}
	// 			}
	// 		}
	// 		request.send(null);
	// 	}else{
	// 		alert('error');
	// 	}
	// }
	// var result = doAjaxCall('./src/resource.json');


		$(function(){
			$.ajax({
				type:'GET',
				url:'./res/test.json',
				dataType:'json',
				error:function(data){
					console.log(arguments[1]);
				},
				success:function(data){
					console.log(data);
				}
			});
		});
		// console.log(htmlobj);
	//img懒加载

	 var imgObj=$(".show-slide img");
	 var imgMark=0;

	 window.onscroll=lazyL;
	 function lazyL(){//懒加载
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
	// Slide.moveTo = function(len){//红色横条跟随动画(滑动页面时)
	// 	var nextWidth = $('.active').next().width();
	// 	var move_len = -(len%_oW)/_oW*50;
	// 	$('#slide-line').css('left',Slide.init_len+move_len+'px');
	// }
	Slide.animateTo = function(t){//红色横条跟随动画(释放时)
		$('#slide-line').animate(
			{
				'left':$('.slide-nav.active').offset().left+'px',
				'width':$('.slide-nav.active').width()+'px'
			},t,function(){
				$('.slide-nav.active em').css('display','block');
				$('#slide-line').css({
					'opacity':'0',
					'left':$('.slide-nav.active').offset().left+'px'
				});
		});
	}
	Slide.Start = function(){
		$('.slide-nav.active em').css('display','none');
		$('#slide-line').css('opacity','1');
		
	}
	// Slide.jumpTo = function(ind){
	// 	$('.slide-nav').removeClass('active').eq(ind).addClass('active');
	// 	navSwiper.slideTo(ind-3);
	// 	mainSwiper.slideTo(ind);
	// }


	  

	//Swiper部分
	//主页面Swiper
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

	//导航Swiper	
	var navSwiper = new Swiper('.nav-swiper-container',{
		setWrapperSize :true,
		slidesPerView : 'auto'
	});

	$('.slide-nav').click(function(){
		Slide.ifClick=true;
		var ind = $('.slide-nav').index($(this));
		$('.slide-nav').removeClass('active').eq(ind).addClass('active');
		mainSwiper.slideTo(ind);
		Slide.End();	

	});

	//首页通栏轮播Swiper
	var bannerSwiper = new Swiper('.banner-swiper-container',{
		autoplay:3000,
		pagination : '.banner-pagination',
		loop:true,
		autoplayDisableOnInteraction:false
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
