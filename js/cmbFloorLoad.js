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
			$('.index-page').append(content);
			h360Swiper = new Swiper('.common-h360-banner',{
				autoplay:3000,
				pagination : '.common-pagination',
				loop:true,
				observer:true,
				autoplayDisableOnInteraction:false
			});
		}
	});		
}
Floor.loadBlock = function(style,obj){//页面组装	
	var _html = "<section class=\"container\">";
	var counter=0;//当前对象内部计数器
	var lastPosition=0;//上一个对象类型
	// console.log(obj);
	var tailHtml="";
	if(style==7){//1X1X4X8模块 position:1-楼层标题  2-360高度通栏轮播  3-540X280高度一行两列广告位  4-270X360高度一行四列广告位

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
	else if(style==3){//1X4模块  1-楼层标题  2-540X360 一行两列广告模块
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
	else if(style==6){//1X1X3模块  1-120楼层标题  1-360高度通栏横幅 3-商品模块
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
				else if(counter>0){//限制广告数量
					_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
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
		if(sty==7){
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
		else if(sty==3){
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
					case 4:
						return "</div>";
				}
		}
		else{
			return "";
		}
	}

}
Floor.loadFloor('./res/getFloor.json');