var geneModule=(function(){
	var	
	
	
	//所有jq对象缓存到jqMap对象里面
	jqMap={
		$container:null
	},
	
	//缓存参数值
	stateMap={

	},
	
	//工具包
	util={
		//目的：判断元素是否进入视口中间，以此为依据决定是否播放动画
		//参数：
			//$jqObj:接受一个判断的jq对象			必选
			//margin_top：元素距离窗口顶部的距离，	可选
			//margin_bottom：元素距离窗口顶部的距离，	可选
			//$window：特指$(window)				可选
			
		//返回：
			//drecte_destens:如果进入了视口的位置返回改元素离窗口顶部的距离
		domInViewport:function($jqObj,margin_top,margin_bottom,$window){
			var 
			dir,
			is_in=false,
			drecte_destens=$jqObj.offset().top-jqMap.$window.scrollTop(),//元素离视口的距离
			dom_height=$jqObj.height(),
			top_dis,			//距离窗口顶部的距离
			bottom_dis,			//距离窗口底部的距离
			window_height;		//窗口高度
			
			if($jqObj==undefined||$jqObj.length==0){
				console.log('方法：util.domInViewport必选参数$jqObj没找到');
				return false;
			}
			$window=$window==undefined?$(window):$window;
			margin_top=margin_top==undefined?0:margin_top;
			margin_bottom=margin_bottom==undefined?margin_top:margin_bottom;
			window_height=$window.height();
			
			top_dis=margin_bottom;
			bottom_dis=margin_bottom;
			
			//if(jqMap.scroll_dir<=0){
				//向下
				if(drecte_destens<=margin_top){
					is_in=true;
				}
			//}
			/*if(jqMap.scroll_dir>0){
				if(drecte_destens<=margin_bottom){
					is_in=true;
				}
			}*/
			//console.log(is_in);
			return is_in;
		}
	},
	initHtml,animateFn;
	
	//setJqMap
	//目的：初始化所有插件涉及到的jq对象
	//参数：none
	//返回：none
	setJqMap=function(){
		var
		$container=jqMap.$container;
		jqMap={
			$window		:$(window),
			$container	:$container
		}
	}
	
	initHtml=function(){
		var
		$gc=$('.js-gc'),
		text=$gc.text(),
		new_gc_html='';
		for(var i=0; i<text.length;i++){
			new_gc_html+='<b class="gc-anim" style="-webkit-animation-delay:'+i*50+'ms">'+text[i]+'</b>';
		}
		$gc.html(new_gc_html);
	}
	
	
	animateFn=function(){
		/*console.log('in');
		if(util.domInViewport($('.out'),600)){
			$('.js-ga').addClass('in');
		};*/
		var
		$out=$('.js-s1600-action');
		for(var i=0;i<$out.length;i++){
			if(util.domInViewport($out.eq(i),800)){
				if(!$out.eq(i).hasClass('in')){
					$out.eq(i).addClass('in');
				}
			}else{
				$out.eq(i).removeClass('in');
			}
		}
		
		
		var
		$PG=$('.js-s1600-pg-aciton');
		if(util.domInViewport($PG,800)){
				if(!$PG.hasClass('in')){
					$PG.addClass('in');
				}
			}else{
				$PG.removeClass('in');
		}
		/*
		if(util.domInViewport($('.stop-c'),600)){
			$('.stop-c').addClass("in");
		}
		if(util.domInViewport($('.stop-f'),600)){
			$('.stop-f').addClass("in");
		}
		if(util.domInViewport($('.stop-g'),600)){
			$('.stop-g').addClass("in");
		}
		if(util.domInViewport($('.stop-h'),600)){
			$('.stop-h').addClass("in");
		}
		if(util.domInViewport($('.stop-i'),600)){
			$('.stop-i').addClass("in");
		}
		if(util.domInViewport($('.stop-l'),600)){
			$('.stop-l').addClass("in");
		}
		if(util.domInViewport($('.moikit-gene-ptk-pos'),600)){
			$('.moikit-gene-ptk-pos').find('span').addClass("in");
		}*/
		
	}
	
	
	
	//pageScrollTo
	//滚动页面到指定的位置
	pageScrollTo=function(position){
		$('html, body').animate({  
			scrollTop: position
		}, 800);  
	}
	
	
	
	
	//initModule
	//初始化插件所有的变量
	initModule=function($container){
		//赋值jqMap对象
		jqMap.$container=$container;
		setJqMap();
		
		//initHtml();
		
		$(window).scroll(function(e){
			if(jqMap.$window.scrollTop()>140){
				//console.log(jqMap.$window.scrollTop());
				$('.js-moikit-gene-nav').css({'top':0});
			}else{
				$('.js-moikit-gene-nav').css({'top':-75});
			}
			console.log(jqMap.$window.scrollTop());
			if(jqMap.$window.scrollTop()>10460){
				$('.moikit-s1600-pkh').css({
					'transform':'translateY(-20px)',
					'-webikit-transform':'-webikit-translateY(-20px)'
				});
			}else{
				$('.moikit-s1600-pkh').css({
					'transform':'translateY(0px)',
					'-webikit-transform':'-webikit-translateY(0px)'
				});
			}
			animateFn();
		});
		
		animateFn();
		
		$('.moikit-gn-box a').click(function(){
			var
			$this=$(this),
			index=$('.moikit-gn-box a').index($this);
			
			num=index%5;
			//alert(num);
			switch(num){
				case 0:
					//pageScrollTo(0)
					pageScrollTo($('.moikit-s1600-pta').offset().top)
				break;
				case 1:
					pageScrollTo($('.moikit-s1600-ptb').offset().top)
				break;
				case 2:
					pageScrollTo($('.moikit-s1600-ptf').offset().top)
				break;
				case 3:
					pageScrollTo($('.moikit-s1600-ptm').offset().top)
				break;
			}
			
			$('.moikit-gn-box a').removeClass('moikit-gn-action');
			$('.moikit-gn-box a').eq(num).addClass('moikit-gn-action');
			$('.moikit-gn-box a').eq(num+5).addClass('moikit-gn-action');
		});
	}
	
	
	return {
		initModule	:initModule,
		util:util
	}
})();


$(function(){
	geneModule.initModule($('body'))
});