var Floor = new Object();
Slide.loadSlide = function(_url){//装载顶部导航
		$.ajax({
			type:'GET',
			url:_url,
			dataType:'json',
			error:function(data){
				console.log('error'+arguments[1]);
			},
			success:function(data){
				var content;
				$.each(data,function(ind,obj){//遍历原始JSON对象
					content="<div class=\"swiper-slide slide-nav\"><em></em>"+obj.SecondaryPageName+"</div>";
						$('#top-nav').append(content);
						$('#main-swiper-wrap').append("<div class=\"main-slide swiper-slide\"></div>");
						// navSwiper.slideTo(0);
				});


			}
		});	
		
	}