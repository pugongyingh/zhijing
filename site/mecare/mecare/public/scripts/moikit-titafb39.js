$(function(){
	if(Readchar.Browser.ie<10){
		titaModule.lowerIeModule($('body'));
	}else{
		titaModule.initModule($('body'));
	}
});


var titaModule=(function(){
	var	
	
	
	//所有jq对象缓存到jqMap对象里面
	jqMap={
		$container:null
	},
	
	//缓存参数值
	stateMap={
		//窗口高度
		window_height:null,
		scroll_dir:0,
		moive_first:true,
		current_index:0,
		is_first:true
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
			
			if(jqMap.scroll_dir<=0){
				//向下
				if(drecte_destens<=margin_top){
					is_in=true;
				}
			}
			if(jqMap.scroll_dir>0){
				if(drecte_destens<=margin_bottom){
					is_in=true;
				}
			}
			//console.log(drecte_destens);
			return is_in;
		}
	},
	handleChangeOp,
	handleChange,		//点击切换等离子效果
	palyMoiveHand,		//播放视频
	hideMoiveHand,		//隐藏视频
	initRunAnima,		//雪花飘舞效果
	//方法名声明
	setJqMap,			//缓存jq对象方法
	checkedStop,		//停止的地方
	animateFrame,		//当滑动滚是执行的方法，判断那个dom该执行动画
	pageScrollTo,		//页面滚动到指定的位置
	lowerIeModule,		//低版本浏览器
	
	//setJqMap
	//目的：初始化所有插件涉及到的jq对象
	//参数：none
	//返回：none
	setJqMap=function(){
		var
		$container=jqMap.$container;
		jqMap={
			$window		:$(window),
			$container	:$container,
			$page_main	:$container.find('.mokit-tita-box-a'),
			$page_main_img:$container.find('.moikit-tita-tit-img'),
			
			$page_two_img:$container.find('.moikit-tita-b-img-box'),
			
			$page_three_img:$container.find('.mokit-tita-movie-a'),
			
			$page_four	:$container.find('.mokit-tita-box-d'),
			$page_four_img:$container.find('.moikit-tita-d-img'),
			
			$page_five_img:$container.find('.moikit-tita-right-a'),
			$page_five_img_a:$container.find('.moikit-tita-r-img-a'),
			$page_five_img_b:$container.find('.moikit-tita-r-img-b'),
			$page_five_img_c:$container.find('.moikit-tita-r-img-c'),
			
			$page_six_img:$container.find('.moikit-tita-right-b'),
			$page_six_img_a:$container.find('.moikit-tita-rk-img-a'),
			$page_six_img_b:$container.find('.moikit-tita-rk-img-b'),
			$page_six_img_crice:$container.find('.moikit-tita-r-icon'),
			$page_six_show:$container.find('.moikit-tita-r-icon-img'),
			
			$page_seven_img:$container.find('.moikit-tita-right-c'),
			
			$page_eight_img:$container.find('.moikit-tita-right-h'),
			
			$page_ten_img:$container.find('.moikit-tita-right-j'),
			$page_eleven_img:$container.find('.moikit-tita-k-img'),
			$page_eleven_line:$container.find('.moikit-tita-deg-img-line'),
			$page_eleven_num:$container.find('.moikit-tita-deg-img-num'),
			
			$page_twelve_img:$container.find('.mokit-tita-box-l'),
			$page_forth_img:$container.find('.moikit-tita-word-n'),
			$page_fifth_img:$container.find('.moikit-tita-word-o'),
			$page_fifth_icon:$container.find('.moikit-tita-o-icon ul li'),
			$page_fifth_box:$container.find('.moikit-tita-o-img'),
			$page_fifth_icon_text:$container.find('.moikit-tita-o-text span'),
			$page_fifth_list:$container.find('.moikit-tita-o-img'),
			$page_fifth_wrap:$container.find('.moikit-tita-o-wrap'),
			$page_moive:$container.find('.mokit-tita-m-jpg'),
			
			$page_run_box:$container.find('.moikit-tita-n-img-ani-box'),
			$nav_fixed:$('.navi-fixed'),
			$nav_btn:$('.pn-list a'),
		}
	}
	
	lowerIeModule=function($container){
		
		jqMap.$container=$container;
		setJqMap();
		
		
		$('.js-moikit-text-ani').css({opacity:1});
		$('.moikit-tita-tit-img').css({opacity:1});
		$('.moikit-tita-d-img').css({opacity:1});
		$('.moikit-tita-deg-img-line').width(95);
		$('.moikit-tita-deg-img').css({opacity:1});
		$('.moikit-tita-b-img-box').css({opacity:1});
		$('.js-moikit-tita-word-d').eq(1).find('.js-moikit-text-ani').css({opacity:0});
		$('.js-moikit-tita-word-d').eq(2).find('.js-moikit-text-ani').css({opacity:0});
		
		$('.moikit-tita-r-icon').css({opacity:1});
		$('.moikit-tita-r-icon-img-bg').eq(0).addClass('.moikit-tita-r-icon-img-bg-action');
		
		$('.moikit-tita-r-icon-img-bg').hover(function(){
			var
			$this=$(this),
			index=$('.moikit-tita-r-icon-img-bg').index($this);
			
			$('.js-moikit-tita-word-d').find('.js-moikit-text-ani').css({opacity:0});
			$('.js-moikit-tita-word-d').eq(index).find('.js-moikit-text-ani').css({opacity:1});
			
			$('.moikit-tita-r-icon-img').removeClass('moikit-tita-r-icon-img-action');
			$('.moikit-tita-r-icon-img-bg').removeClass('moikit-tita-r-icon-img-bg-action');
			
			$('.moikit-tita-r-icon-img').eq(index).addClass('moikit-tita-r-icon-img-action');
			$('.moikit-tita-r-icon-img-bg').eq(index).addClass('moikit-tita-r-icon-img-bg-action');
		});
		
		//最后焦点切换
		jqMap.$page_fifth_icon.click(handleChangeOp);
		jqMap.$page_fifth_list.click(handleChangeOp);
		
		jqMap.$nav_btn.click(function(){
			var
			$this=$(this),
			index=jqMap.$nav_btn.index($this);
			
			num=index%7;
			//alert(num);
			switch(num){
				case 0:
					pageScrollTo(0)
				break;
				case 1:
					pageScrollTo($('.mokit-tita-box-b').offset().top)
				break;
				case 2:
					pageScrollTo($('.mokit-tita-box-d').offset().top)
				break;
				case 3:
					pageScrollTo($('.mokit-tita-box-k').offset().top)
				break;
			}
		});
		
		$(window).scroll(function(e){
			if(jqMap.$window.scrollTop()>500){
				//console.log(jqMap.$window.scrollTop());
				jqMap.$nav_fixed.css({'top':0});
			}else{
				jqMap.$nav_fixed.css({'top':-75});
			}
		});
	}
	
	handleChangeOp=function(e){
		var
		$this=$(this),
		$page_fifth_icon=jqMap.$page_fifth_icon
		index=$page_fifth_icon.index($this)>=0?$page_fifth_icon.index($this):jqMap.$page_fifth_list.index($this);
		//if(!$this.hasClass('moikit-tita-o-img-action')){
			$this.addClass('moikit-tita-o-img-action');
			
			$page_fifth_icon.removeClass('moikit-tita-o-img-action');
			$page_fifth_icon.eq(index).addClass('moikit-tita-o-img-action');
			
			jqMap.$page_fifth_box.removeClass('moikit-tita-o-img-active');
			jqMap.$page_fifth_box.eq(index).addClass('moikit-tita-o-img-active');
			
			jqMap.$page_fifth_wrap.animate({'margin-left':(2-index)*384},500);
			
			jqMap.$page_fifth_icon_text.removeClass('moikit-tita-o-text-action');
			jqMap.$page_fifth_icon_text.eq(index).addClass('moikit-tita-o-text-action');
			
		//}
		return false;
	}
	
	initRunAnima=function(){
		var 
		i,
		html='',
		trans_rot,
		top_num,
		time_delay,
		snow_length=100;
		for(i=0;i<snow_length;i++){
			trans_rot=parseInt(Math.random()*360);
			top_num=parseInt(Math.random()*70);
			time_delay=Math.random().toFixed(2);
			html=html
			+'<span class="moikit-tita-n-img-ani-box-a" style="transform: rotate('+trans_rot+'deg);-webkit-transform: rotate('+trans_rot+'deg);">'
                +'<i class="moikit-tita-n-dot moikit-tita-n-dot-a" style="top:'+top_num+'px; animation-delay:'+time_delay+'s;-webkit-animation-delay:'+time_delay+'s;"></i>'
            +'</span>'	
		}
		
		jqMap.$page_run_box.html(html);
	}
	
	
	//handleChange
	//目的：第六屏等离子点击切换功能
	//参数：none
	//返回：none
	handleChange=function(index){
		//alert(index);
		stateMap.current_index=index;
		$animJqSix=jqMap.$page_six_img.siblings().find('.js-moikit-text-ani'),
		$currAnimJqSix=jqMap.$page_six_img.siblings().eq(index).find('.js-moikit-text-ani');
		
		jqMap.$page_six_show.removeAttr('style')
		$animJqSix.removeClass('js-moikit-text-ani-run');
				
		$currAnimJqSix.each(function(index){
			//$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
			if(index==$currAnimJqSix.length-1){
				$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+((index-1)*300)+'ms anima-both');
			}else{
				$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
			}
		});
		
		jqMap.$page_six_show.removeClass('moikit-tita-r-icon-img-action');
		jqMap.$page_six_show.eq(index).addClass('moikit-tita-r-icon-img-action');
		jqMap.$page_six_show.find('.moikit-tita-r-icon-img-bg').removeClass('moikit-tita-r-icon-img-bg-action');
		jqMap.$page_six_show.eq(index).find('.moikit-tita-r-icon-img-bg').addClass('moikit-tita-r-icon-img-bg-action');
	}
	
	
	//animateFrame
	//目的：当滚动滑轮是，执行方法判断那个一个元素进入视口，如果元素进入视口执行对应的方法
	//参数：none
	//返回：none
	animateFrame=function(e){
		//主页：智能净水壶
		//alert();
		if(e!=undefined){
			jqMap.scroll_dir=Readchar.Event.getWheelDelta(e);
		}else{
			jqMap.scroll_dir=0;
		}
		
		//if(util.domInViewport(jqMap.$page_main_img,0)){
			if(jqMap.$page_main_img.hasClass('moikit-tita-tit-img-stop')){
				
				var $animJqMain=jqMap.$page_main_img.prev().find('.js-moikit-text-ani');
				
				//图形动画
				jqMap.$page_main_img.removeClass('moikit-tita-tit-img-stop');
				
				//淡入动画
				$animJqMain.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300+1000)+'ms anima-both');
				});
			};
		//}
		//第一屏：烧开≠健康
		if(util.domInViewport(jqMap.$page_two_img,600,200)){
			var $animJqTwo=jqMap.$page_two_img.prev().find('.js-moikit-text-ani');
			
			$animJqTwo.each(function(index){
				$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
			});
			
			jqMap.$page_two_img.addClass('anima-opacity-in duration_1500ms delay_'+$animJqTwo.length*300+'ms anima-both');
		}
		//第二屏：您需要一台健康智能的净水壶
		if(util.domInViewport(jqMap.$page_three_img,600,200)){
			var $animJqThree=jqMap.$page_three_img.parent().find('.js-moikit-text-ani');
			
			$animJqThree.each(function(index){
				$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
			});
			
			if(stateMap.moive_first){
				jqMap.$page_three_img.find('video')[0].play();
			}	
			stateMap.moive_first=false;
			
		}
		//第三屏：高效率多层次的过滤
		
		if(util.domInViewport(jqMap.$page_four,600,200)){
			var $animJqFour=jqMap.$page_four_img.prev().find('.js-moikit-text-ani');
				$animJqFour.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
				});
		}
		
		if(util.domInViewport(jqMap.$page_four_img,750,200)){
			if(jqMap.$page_four_img.hasClass('moikit-tita-d-img-stop')){
				jqMap.$page_four_img.removeClass('moikit-tita-d-img-stop');
			};
		}
		//第四屏：PP 致密筛网
		if(util.domInViewport(jqMap.$page_five_img,650,200)){
			if(jqMap.$page_five_img.hasClass('moikit-tita-right-a-stop')){
				jqMap.$page_five_img.removeClass('moikit-tita-right-a-stop');
				jqMap.$page_five_img_a.removeClass('moikit-tita-r-img-a-stop');
				jqMap.$page_five_img_b.removeClass('moikit-tita-r-img-b-stop');
				jqMap.$page_five_img_c.removeClass('moikit-tita-r-img-c-stop');
				
				var $animJqFive=jqMap.$page_five_img.prev().find('.js-moikit-text-ani');
				
				$animJqFive.each(function(index){
					if(index==$animJqFive.length-1){
						$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+((index-1)*300)+'ms anima-both');
					}else{
						$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
					}
					
				});
			};
		}
		//第五屏：离子交换颗粒
		if(util.domInViewport(jqMap.$page_six_img,650,200)){
			if(jqMap.$page_six_img.hasClass('moikit-tita-right-a-stop')){
				jqMap.$page_six_img.removeClass('moikit-tita-right-a-stop');
				jqMap.$page_six_img_a.removeClass('moikit-tita-r-img-a-stop');
				jqMap.$page_six_img_b.removeClass('moikit-tita-r-img-b-stop');
				
				var $animJqSix=jqMap.$page_six_img.siblings().eq(0).find('.js-moikit-text-ani');
				
				$animJqSix.each(function(index){
					if(index==$animJqSix.length-1){
						$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+((index-1)*300)+'ms anima-both');
					}else{
						$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
					}
				});
				jqMap.$page_six_img_crice.addClass('anima-opacity-in duration_900ms delay_'+(300)+'ms anima-both');
				jqMap.$page_six_show.css({'opacity':1});
				jqMap.$page_six_show.eq(1).delay(($animJqSix.length+2)*300).animate({'opacity':0.3},800);
				jqMap.$page_six_show.eq(2).delay(($animJqSix.length+2)*300).animate({'opacity':0.3},800);
				if(stateMap.is_first){
					stateMap.is_first=false;
					jqMap.$page_six_show.delay(($animJqSix.length+2)*300+800).animate({'':''},function(){
						jqMap.$page_six_show.eq(0).find('.moikit-tita-r-icon-img-bg').addClass('moikit-tita-r-icon-img-bg-action');
					});
				}
			};
		}
		
		//第六屏：Naturess 技术超滤膜
		if(util.domInViewport(jqMap.$page_seven_img,680,200)){
			jqMap.$page_seven_img.removeClass('moikit-tita-right-a-stop');
			
			var $animJqSeven=jqMap.$page_seven_img.prev().find('.js-moikit-text-ani');
				
				$animJqSeven.each(function(index){
					if(index==$animJqSeven.length-1){
						$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+((index-1)*300)+'ms anima-both');
					}else{
						$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
					}
				});
		}
		
		//第八屏：智能滤芯更换提醒
		if(util.domInViewport(jqMap.$page_eight_img,600,200)){
			jqMap.$page_eight_img.removeClass('moikit-tita-right-a-stop');
			
			var $animJqEight=jqMap.$page_eight_img.prev().find('.js-moikit-text-ani');
				
				$animJqEight.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_500ms delay_'+(index*500)+'ms anima-both');
				});
		}
		
		//第十屏：准确记录用水量
		if(util.domInViewport(jqMap.$page_ten_img,600,200)){
			jqMap.$page_ten_img.removeClass('moikit-tita-right-a-stop');
			
			var $animJqTen=jqMap.$page_ten_img.prev().find('.js-moikit-text-ani');
				
				$animJqTen.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_500ms delay_'+(index*500)+'ms anima-both');
				});
		}
		
		//第十一屏:合理的人体工程学设计
		if(util.domInViewport(jqMap.$page_eleven_img,550,200)){
			
			jqMap.$page_eleven_img.removeClass('opacity-none');
			
			var $animJqEleven=jqMap.$page_eleven_img.prev().find('.js-moikit-text-ani');
				
				$animJqEleven.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
				});
				
				jqMap.$page_eleven_line.eq(1).addClass('moikit-tita-deg-img-line-anim duration_300ms delay_'+($animJqEleven.length*300)+'ms anima-both');
				jqMap.$page_eleven_line.eq(0).addClass('moikit-tita-deg-img-line-anim duration_300ms delay_'+(($animJqEleven.length+2)*300)+'ms anima-both');
				jqMap.$page_eleven_num.eq(1).addClass('anima-opacity-in duration_300ms delay_'+(($animJqEleven.length+1)*300)+'ms anima-both');
				jqMap.$page_eleven_num.eq(0).addClass('anima-opacity-in duration_300ms delay_'+(($animJqEleven.length+3)*300)+'ms anima-both');
				
		}
		//十二：细节设计，更显极致
		if(util.domInViewport(jqMap.$page_twelve_img,600,200)){
			var $animJqTwelve=jqMap.$page_twelve_img.find('.js-moikit-text-ani');
				
				$animJqTwelve.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
				});
		};
		//十四：超长续航 40 天
		if(util.domInViewport(jqMap.$page_forth_img,650,200)){
			var $animJqForth=jqMap.$page_forth_img.find('.js-moikit-text-ani');
				
				$animJqForth.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
				});
		}
		
		//十四：开放，大开眼界
		if(util.domInViewport(jqMap.$page_fifth_img,650,200)){
			var $animJqFifth=jqMap.$page_fifth_img.find('.js-moikit-text-ani');
				
				$animJqFifth.each(function(index){
					$(this).addClass('js-moikit-text-ani-run duration_300ms delay_'+(index*300)+'ms anima-both');
				});
		}
	}
	
	
	//palyMoiveHand
	//目的：鼠标放上去，播放视频
	palyMoiveHand=function(e){
		var
		$this=$(this),
		video=$this.prev()[0];
		
		video.play();
	}
	
	hideMoiveHand=function(){
		var
		$this=$(this),
		video=$this.prev()[0];
		
		video.pause();
	}
	
	var is_down=true;
	checkedStop=function(){
		//
		var
		scroll_top=jqMap.$window.scrollTop();
		if(scroll_top>=5060&&scroll_top<5180){
			Readchar.Event.buildWheel(stopScroll);
		}else{
			Readchar.Event.buildWheel(animateFrame);
		}
		//console.log(scroll_top);
	}
	
	var timeout=null,is_scroll=true;
	stopScroll=function(e){
				
		  var scroll_dir=jqMap.scroll_dir=Readchar.Event.getWheelDelta(e);
		  Readchar.Event.stopDefault(e);
		  Readchar.Event.unBuildWheel(stopScroll);
		  //console.log(is_scroll);
		 // if(is_scroll){
			 // is_scroll=false;
			  if(scroll_dir<=0){
				  if(stateMap.current_index<2){
					  is_down=true;
					  stateMap.current_index++;
					  handleChange(stateMap.current_index);
					 // jqMap.$window.scrollTop(scroll_des-100);
					 // console.log(stateMap.current_index);
				  }else{
					// is_scroll=true;
					 var scroll_des=jqMap.$window.scrollTop()
					 jqMap.$window.scrollTop(scroll_des+100);
				  }
			  } 
			  if(scroll_dir>0){
				  if(stateMap.current_index>0){
					  is_down=true;
					  stateMap.current_index--;
					  handleChange(stateMap.current_index);
					  //jqMap.$window.scrollTop(scroll_des+100);
				  }else{
					// is_scroll=true;
					 var scroll_des=jqMap.$window.scrollTop()
					 jqMap.$window.scrollTop(scroll_des-100);
				  }
			  }
		  	if(timeout==null){
			  timeout=setTimeout(function(){
				  Readchar.Event.buildWheel(stopScroll);
				  is_scroll=true;
				  clearTimeout(timeout);
				  timeout=null;
			  },1000);
			} 
		 // }
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
		//stateMap赋值
		stateMap.window_height=jqMap.$window.height();
		//执行一次动画先
		animateFrame();
		//
		//Readchar.Event.buildWheel(animateFrame);
		//jqMap.$window.bind({'scroll':animateFrame});
		$(window).scroll(function(e){
			if(jqMap.$window.scrollTop()>500){
				//console.log(jqMap.$window.scrollTop());
				jqMap.$nav_fixed.css({'top':0});
			}else{
				jqMap.$nav_fixed.css({'top':-75});
			}
			animateFrame();
		});
		//Readchar.Event.buildWheel(animateFrame);
		
		initRunAnima();
		
		jqMap.$page_six_show.hover(function(e){
			var
			$this=$(this),
			index=jqMap.$page_six_show.index($this);
			
			handleChange(index);
		});
		jqMap.$page_moive.hover(palyMoiveHand,hideMoiveHand)
		
		//最后焦点切换
		jqMap.$page_fifth_icon.click(handleChangeOp);
		jqMap.$page_fifth_list.click(handleChangeOp);
		
		jqMap.$nav_btn.click(function(){
			var
			$this=$(this),
			index=jqMap.$nav_btn.index($this);
			
			num=index%7;
			//alert(num);
			switch(num){
				case 0:
					pageScrollTo(0)
				break;
				case 1:
					pageScrollTo($('.mokit-tita-box-b').offset().top)
				break;
				case 2:
					pageScrollTo($('.mokit-tita-box-d').offset().top)
				break;
				case 3:
					pageScrollTo($('.mokit-tita-box-k').offset().top)
				break;
			}
		});
	}
	
	
	return {
		initModule	:initModule,
		util		:util,
		lowerIeModule:lowerIeModule
	}
})();


