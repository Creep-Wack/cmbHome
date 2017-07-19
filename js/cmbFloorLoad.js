var Floor = new Object();
Floor.SysnoCont = new Array();//各模块ID
Floor.TypeCont = new Array();//各模块ID
Floor.blockCont = new Array();//各楼层对象
Floor.loadFloor = function(_url){//装载顶部导航
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
				if(Floor.SysnoCont.indexOf(obj.ModelSysno)==-1){//新模块则新建一个数组存放模块内容
					Floor.SysnoCont.push(obj.ModelSysno);
					Floor.TypeCont.push(obj.ModelType);
					Floor.blockCont.push(new Array());
				}
				Floor.blockCont[Floor.blockCont.length-1].push(obj);	
			});
			$.each(Floor.blockCont,function(key,value){
				Floor.loadBlock(Floor.TypeCont[key],value);
			});
		}
	});		
}
Floor.loadBlock = function(style,obj){//页面组装	
	var _html = "<section class=\"container\">";
	var counter=0;//当前对象内部计数器
	var lastPosition=0;//上一个对象类型
	var tailHtml="";
	if(style==1148){//1X1X4X8模块 position:1-楼层标题  2-360高度通栏轮播  3-540X280高度一行两列广告位  4-270X360高度一行四列广告位

		$.each(obj,function(k,v){
			// if(k==obj.length-1){//是否是最后一个对象
			// 	console.log(lastPosition);
			// 	swith(lastPosition)
			// 	{
			// 		case 0:
			// 			tailHtml="";
			// 		 	break;
			// 		case 1:
			// 			tailHtml="";
			// 		 	break;
			// 		case 2:
			// 			tailHtml="</div><div class=\"common-pagination\"></div></div></section>";
			// 			break;
			// 		case 3:
			// 			tailHtml="</div></section>";
			// 		case 4:
			// 			tailHtml="</div></section>";
			// 	}
			// }
			// console.log(v);
			if(lastPosition!=0&&lastPosition!=1&&lastPosition!=v.Position){//上一步组装元素与当前组装对象非同类型
				counter=0;
				if(lastPosition==2){
					_html+="</div><div class=\"common-pagination\"></div></div>";
				}
				else if(lastPosition==3){
					_html+="</div>";
				}
			}
			if(v.Position==1){//楼层标题
				lastPosition=1;
				_html+= "<div class=\"block-title h120\"><img src=\""+v.ResourceUrl+"\" alt=\"楼层标题\"></div>";
			}
			else if(v.Position==2){//360高度轮播
				lastPosition=2;
				if(!counter){//第一张广告
					counter++;
					_html += "<div class=\"swiper-container common-h360-banner container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
				}
				else if(0<counter<=5){//限制广告数量五张以内
					counter++;
					_html += "<div class=\"swiper-slide\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a></div>";
				}
			}
			else if(v.Position==3){
				lastPosition=3;
				
				if(!counter){//第一张540X280高广告位
					counter++;
					_html += "<div class=\"h280 columns col2 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
				}
				else if(0<counter<=4){//限制广告数量4张以内
					counter++;
					_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
				}
			}
			else if(v.Position==4){
				lastPosition=4;
				
				if(!counter){//第一张270X360高广告位
					counter++;
					_html += "<div class=\"h360 columns col4 clearfix\"><a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
				}
				else if(0<counter<=8){//限制广告数量8张以内
					counter++;
					_html += "<a href=\""+v.Link+"\"><img src=\"https://img01.mall.cmbchina.com/banner/default.jpg\" data-original=\""+v.ResourceUrl+"\"></a>";
				}
			}
			
		});
		_html+=tailHtml;
		tailHtml="";
		console.log(_html);
	}

}
Floor.loadFloor('./res/getFloor.json');