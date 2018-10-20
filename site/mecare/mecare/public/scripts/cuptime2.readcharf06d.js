fullPageScroll=(function(){	
	var configMap={
		
		page_class_name	:'',//页面类名称
		during_time		:1000,
		icon_class_name	:'',
		is_icon			:false,
		uri_table		:[],
		lock			:true,
		five_lock		:false,
		settable_map:{
			page_class_name	:true,
			during_time		:true,
			icon_class_name	:true,
			is_icon			:true,
			uri_table		:true
		}
	},
	
	initModule,configModule,setConfigMap,setJqMap,pageScroll,iconHandle,mouseWheelFn,reBildWheel
	,pageZani,pageAani,pageBani,pageCani,pageDani,pageEani,pageFani,pageGani,pageHani,eightIconfn,changeNavBg,ieLowerBrawse,topNavFn,
	
	//jq对象
	jqMap={
		$container	:null
	},
	
	//startemap
	starteMap={
		$container	:null,//滑动的容器
		page_size	:null,//全屏页面尺寸		
		page_index	:0,//当前页面索引
		page_length	:null,//所有页面数
		stop_scroll	:false,//是否停止滚动
		timer_out	:null,//超时时间,
		anchor_json	:{},//uri对象
		lp_timer	:null,//定时器
		lp_index	:0,//播放到当前图片的索引
		third_page_index	:-1,//第三屏显示的索引,
		is_scroll_page		:true,//第三屏是否可以向下滚动页面
		is_scroll_page_prve	:true,//第三屏是否可以向上滚动页面
		four_state	:-1,
		is_four_scroll_next	:true,//第四屏是否可以向下滚动
		is_four_scroll_prve	:true,//第四屏是否可以向上滚动
		five_state	:-1,//第五屏所处的状态
		is_five_scroll_next	:true,//第五屏是否可以向下滚动
		is_five_scroll_prve	:true,//第五屏是否可以向上滚动
		eight_state	:0,
		is_eight_scroll_next:true,//第八屏是否可以向下滚动
		is_eight_scroll_prve:true,//第八屏是否可以向上滚动
		direct		:0//方向
	};
	
	//setJqMap 设置jq对象
	setJqMap=function(){
		var $container=starteMap.$container;
		jqMap={
			$container	:$container,
			$page		:$container.find('.'+configMap.page_class_name),
			$header		:$container.find('.mecare-header'),
			$footer		:$container.find('.moikit-footer-box'),
			$eight_icon	:$container.find('.mecare-t-eight-icon span'),
			$icon		:$('.'+configMap.icon_class_name),
			$nav		:$('.navi-fixed'),
			$nav_bg		:$('.navi-bg'),
			$top_nav	:$('.pn-list a'),
			$backHome:$('.p-icon'),
			$scrollTop:$('.cuptime-scroll-top')
		};
	}
	
	//低版本兼容问题
	ieLowerBrawse=function(){
		$('body').css({'position':'relative','height':'auto','overflow':'auto'});
		$('.mecare-con').css({'position':'relative','height':'auto'});
		$('.mecare-page-container').css({'position':'relative','height':'auto'});
		$('.mecare-page').height(1080);
		$('.mecare-t-text').css({'opacity':1});
		$('.mecare-t-img').css({'opacity':1});
		$('.mecare-page-three').height(1080*3);
		$('.mecare-t-page-center').css({'top':0,'position':'relative'});
		$('.mecare-t-page-box').css({'margin-top':0,'position':'relative','opacity':'1'});
		$('.mecare-page-four').height(1080*2);
		$('.mecare-fj-page-img-box').removeClass('mecare-fj-page-img-box-before');
		$('.mecare-five-movie-layout ').css({'left':0,'top':0,'opacity':1});
		$('.mecare-t-five-text-a').eq(0).css({'opacity':1});
		$('.mecare-eight-bg').css({'opacity':1});
		$('.mecare-page-eight').height(1080*3);
		$('.mecare-t-page-box').css({'overflow':'hidden','left':0});
		$('.mecare-eighv-bg').css({'opacity':1});
		$('.mecare-eighw-bg').css({'opacity':1});
		$('.mecare-t-eight-icon').hide();
		$('.right-navi').hide();
		$('.navi-fixed').hide();
	}
	
	
	//顶部焦点
	topNavFn=function(){ 
		var 
		$top_nav=jqMap.$top_nav;
		
		$top_nav.bind('click',function(){
			var 
			index=$top_nav.index($(this)),
			length=$top_nav.length/2;
			//Readchar.Event.unBuildWheel(mouseWheel);
			switch(index%length){
				case 0:
					starteMap.page_index=0;
				break;
				case 1:
					starteMap.page_index=2;
				break;
				case 2:
					starteMap.page_index=5;
				break;
				case 3:
					starteMap.page_index=8;
				break;
				case 4:
					starteMap.page_index=4;
				break;
			}
			pageScroll();
		});
	}


	
	//changeNavBg begin
	//purpose	:改变导航背景
	//arguments	:
	//	*color 颜色值
	//return	:none
	changeNavBg=function(color){
		jqMap.$nav_bg.css('background',color);
	}
	//changeNavBg end
	
	//焦点图切换
	iconHandle=function(e){
		var $this,icon_index,detail;
		//Readchar.Event.unBuildWheel(mouseWheel);
		$this=$(this);
		icon_index=jqMap.$icon.index($this);
		if(starteMap.page_index>icon_index){
			detail=-1;
		}else if(starteMap.page_index<icon_index){
			detail=1;
		}else{
			return false;
		}
		starteMap.page_index=icon_index;
		//滚动
		pageScroll(detail);
	}
	
	//页面滚切换方法
	pageScroll=function(delta){
		var
			$container,$page,page_index,anchor_json,uri_table,uri_table,
			page_height,during_time,purpose_top,header_height,footer_height,nav_top;

		//jq对象
		$container=jqMap.$container;					//滚动容器
		$page=jqMap.$page;								//全屏页面
		page_index=starteMap.page_index;				//页面当前页面索引
		
		anchor_json=starteMap.anchor_json;				//当前的uri map
		uri_table=configMap.uri_table;					//所有的uri map
		starteMap.page_size=Readchar.Style.getFullPageSize();
		page_height=starteMap.page_size.height;			//页面高度
		header_height=jqMap.$header.height();			//页面头部的高度
		footer_height=jqMap.$footer.height();			//底部头部的高度
		during_time=configMap.during_time;				//动画的持续时间
		
		//修改uri
		anchor_json=starteMap.anchor_json;
		uri_table=configMap.uri_table;
		anchor_json.page=uri_table[starteMap.page_index];
		
		//导航显示
		if(page_index>0){
			nav_top=65;
		}else{
			nav_top=0;
		}
		jqMap.$nav.css({
			"transform": "translate3d(0,"+nav_top+"px,0)",
			"-webkit-transform": "translate3d(0,"+nav_top+"px,0)",
			"-moz-transform": "translate3d(0,"+nav_top+"px,0)",
			"-o-transform": "translate3d(0,"+nav_top+"px,0)",
			'opacity'	:1
		});

		//右侧焦点
		jqMap.$icon.removeClass('cr-n-hover');
		jqMap.$icon.eq(page_index).addClass('cr-n-hover');
		//设置uri
		$.uriAnchor.setAnchor(starteMap.anchor_json);

		//获取页面需要滑动的高度
		if(page_index==0){								//当页面在最顶时
			purpose_top=0;
		}else if(page_index==1){						//当页面在第一屏时
			purpose_top=header_height;
		}else if(page_index==starteMap.page_length-1){
			purpose_top=page_height*(page_index-2)+footer_height+header_height;
		}else{
			purpose_top=page_height*(page_index-1)+header_height;
		}
		if(page_index!=0){
			jqMap.$scrollTop.show();
		}else{
			jqMap.$scrollTop.hide();
		}


		switch(anchor_json.page){						//针对不同的页面uri滑动相应的高度
			case uri_table[0]://header
				pageZani();
			break;
			case uri_table[1]://first
				changeNavBg('#333');
				pageAani();
			break;
			case uri_table[2]://second
				changeNavBg('#fff');
				pageBani();
				starteMap.third_page_index=-1;
			break;
			case uri_table[3]://third
				changeNavBg('#333');
				pageCani(delta);
				starteMap.four_state=-1;
			break;
			case uri_table[4]://four
				changeNavBg('#fff');
				pageDani(delta);
				starteMap.third_page_index=3;
				//starteMap.five_state=-1;
			break;
			case uri_table[5]://five
				changeNavBg('#333');
				pageEani(delta);
				starteMap.four_state=2;
			break;
			case uri_table[6]://six
				changeNavBg('#fff');
				pageGani();
				starteMap.five_state=5;
			break;
			case uri_table[7]://sevent
				pageHani();
			break;
			case uri_table[8]://eight
				changeNavBg('#333');
				//reBildWheel();
			break;
			case uri_table[9]://nine
				//reBildWheel();
			break;
		}
		
		
		//开始过度效果
		$container.css({
			"transform": "translate3d(0,-"+purpose_top+"px,0)",
			"-webkit-transform": "translate3d(0,-"+purpose_top+"px,0)",
			"-moz-transform": "translate3d(0,-"+purpose_top+"px,0)",
			"-o-transform": "translate3d(0,-"+purpose_top+"px,0)"	
		});
		
		//console.log(starteMap.page_index);
	}
	
	//pageZani begin
	//purpose	:第零屏的动画
	//arguments	:none
	//arguments	:none
	pageZani=function(){
		var 
		$container=jqMap.$container,
		$title=$container.find('.mecare-o-two-text');
		$title.css({'opacity':1});
		//reBildWheel();
	}
	//pageZani end
	//pageAani begin
	
	
	//purpose	:播放第一屏动画
	//arguments	:none
	//return 	:none
	pageAani=function(){
		var 
		$container=jqMap.$container,
		lp_index=starteMap.lp_index,
		$img=$container.find('.mecare-o-img-lay'),
		$tip=$container.find('.mecare-o-tip'),
		$last_img=$container.find('.mecare-o-img-last'),
		
		lp_last_index=$img.length-1,
		lp_rent_css_map={'display':'none'},
		lp_cuttren_css_map={'display':'block'};
		
		//cuptime2 动画
		setTimeout(function(){
			if(lp_index==0){
				starteMap.lp_timer=setInterval(function(){
					if(lp_index==lp_last_index-6){
						clearInterval(starteMap.lp_timer);
						starteMap.lp_index=lp_index;
						starteMap.lp_timer=null;
						$last_img.css('opacity',1);
						$tip.addClass('mecare-opacity-animate');
						//$img.eq(lp_index+1).css(lp_cuttren_css_map);
					}else{
						lp_index++;
						$img.addClass('mecare-o-img-lay');
						$img.eq(lp_index).addClass('mecare-o-img-lay-show');
					}
				},60);
			}
		},500);
		
		//文案动画
		
		
		//reBildWheel();
	}
	//pageAani end
	
	//pageBani begin
	//purpose	:播放第二屏的动画
	//argument	:none
	//return	:none
	pageBani=function(){
		var 
		$img=jqMap.$container.find('.mecare-t-two-img'),
		$text=jqMap.$container.find('.mecare-t-two-text');
		trans_img_map={opacity:1};
		$img.css(trans_img_map);
		$text.css(trans_img_map);
		//reBildWheel();
	}
	//pageBani end
	
	//pageCani begin
	//purpose	:播放第三屏动画
	//arguments	:none
	//return	:none
	pageCani=function(detail){
		var $text=jqMap.$container.find('.mecare-th-two-text');
		//console.log(detail)
		if(detail>0){
			if(starteMap.third_page_index>0){
				starteMap.third_page_index--;
			}
			$('.js-mecare-two-page-box').eq(starteMap.third_page_index+1).animate(
				{
					'opacity':0
				},configMap.during_time
			);
		}else{
			if(starteMap.third_page_index<2){
				starteMap.third_page_index++;
			}
			$('.js-mecare-two-page-box').eq(starteMap.third_page_index).animate(
				{
					'opacity':1
				},configMap.during_time
			);
		}
		$text.css('opacity',0);
		$text.eq(starteMap.third_page_index).css('opacity',1);
		
		//console.log('third_page_index:'+starteMap.third_page_index);
		
		starteMap.is_scroll_page=false;
		starteMap.is_scroll_page_prve=false;
		
		if(starteMap.third_page_index==0){
			starteMap.is_scroll_page_prve=true;//修改页面可否滑动的变量，让其可以向上滑动
		}
		
		if(starteMap.third_page_index==2) {
			starteMap.is_scroll_page = true;//修改页面可否滑动的变量，让其可以向下滑动
		}
	}
	//pageCani end
	
	//pageDani begin
	//purpose	:第四屏动画
	//arguments	:none
	//return	:none
	pageDani=function(delta){
		var $text=jqMap.$container.find('.mecare-t-four-text');
		starteMap.is_four_scroll_next=false;
		starteMap.is_four_scroll_prve=false;
		if(delta>0){
			starteMap.four_state--;
		}else{
			starteMap.four_state++;
		}
		if(starteMap.four_state==0){
			starteMap.is_four_scroll_prve=true;
			$('.mecare-fo-page-box').css({
				"transform": "translate3d(0,0,0)",
				"-webkit-transform": "translate3d(0,0,0)",
				"-moz-transform": "translate3d(0,0,0)",
				"-o-transform": "translate3d(0,0,0)"		
			});
			$text.eq(1).css('opacity',1);
		}else{
			starteMap.is_four_scroll_next=true;
			$('.mecare-fo-page-box').css({
				"transform": "translate3d(0,-"+1920+"px,0)",
				"-webkit-transform": "translate3d(0,-"+1920+"px,0)",
				"-moz-transform": "translate3d(0,-"+1920+"px,0)",
				"-o-transform": "translate3d(0,-"+1920+"px,0)"		
			});
			$text.eq(0).css('opacity',1).animate({'':''},900,function(){
				$('.mecare-fj-page-img-box').removeClass('mecare-fj-page-img-box-before');
			});
		}
	}
	//pageDani end
	
	//pageEani begin

	//purpose	:第五屏动画
	//arguments	:none
	//return	:none
	pageEani=function(detail){
		
		var $container=starteMap.$container,five_state,
		
		five_jq_map={
			$line	:$container.find('.mecare-fm-layout-line'),
			$bottom	:$container.find('.mecare-fm-layout-bottom'),
			$out	:$container.find('.mecare-fm-layout-out'),
			$top	:$container.find('.mecare-fm-layout-top'),
			$in		:$container.find('.mecare-fm-layout-in'),
			$ta	:$container.find('.mecare-fm-layout-ta'),
			$tb	:$container.find('.mecare-fm-layout-tb'),
			$tc	:$container.find('.mecare-fm-layout-tc'),
			$td	:$container.find('.mecare-fm-layout-td'),
			$tg	:$container.find('.mecare-fm-layout-tg'),
			$th	:$container.find('.mecare-fm-layout-th'),
			$tf	:$container.find('.mecare-fm-layout-tf'),
			$te	:$container.find('.mecare-fm-layout-te'),
			$text:$container.find('.mecare-t-five-text-a'),
			$box :$container.find('.mecare-six-movie-box'),
			$ag	:$container.find('.mecare-fm-layout-ag'),
			$layout:$container.find('.mecare-six-movie-layout'),
			$share:$container.find('.mecare-five-movie-box'),
			$part:$container.find('.mecare-six-movie-line-box'),
			$part_a:$container.find('.an-mecare-six-movie-line-touch-a'),
			$part_b:$container.find('.an-mecare-six-movie-line-touch-b'),
			$part_c:$container.find('.an-mecare-six-movie-line-touch-c'),
			$part_d:$container.find('.an-mecare-six-movie-line-touch-d'),
			$part_e:$container.find('.mecare-six-movie-text-box')
		},
		show_css	={'opacity':1},
		show_op_css	={'opacity':0.8},
		hidden_css	={'opacity':0},
		none_css	={'':''},
		position_none={'top':0,'left':0};
		
		starteMap.is_five_scroll_next=false;//修改页面可否滑动的变量，让其不能滑动
		starteMap.is_five_scroll_prve=false;//修改页面可否滑动的变量，让其不能滑动


		configMap.five_lock=true;

		if(detail>0){
			starteMap.five_state--;
		}else{
			starteMap.five_state++;
		}
		if(starteMap.five_state>4){
			starteMap.five_state=4;
		}
		five_state=starteMap.five_state;

		console.log(five_state);

		switch(five_state){
			case 0:
				starteMap.is_five_scroll_prve=true;
				firstAnimate();
			break;
			case 1:
				secondAnimate();
			break;
			case 2:
				thirdAnimate();
			break;
			case 3:
				fourAnimate();
			break;
			case 4:
				starteMap.is_five_scroll_next=true;
				fiveAnimate();
			break;
		}

		//第五屏第一状态
		function firstAnimate(){
			five_jq_map.$text.eq(0).css(show_css);
			five_jq_map.$bottom.animate(none_css,1000,function(){
				five_jq_map.$bottom.css(show_op_css).animate(none_css,500,function(){
					configMap.five_lock=false;
				});
			});
			five_jq_map.$out.animate(none_css,1000,function(){
				five_jq_map.$out.css(show_op_css);
			});
			five_jq_map.$top.animate(none_css,1000,function(){
				five_jq_map.$in.css(hidden_css);
				five_jq_map.$top.css(show_op_css);
			});
		}
		//第五屏第二状态
		function secondAnimate(){
			five_jq_map.$bottom.css(hidden_css);
			five_jq_map.$top.css(hidden_css);
			if(detail>0){
				five_jq_map.$text.eq(0).css(show_css);
				five_jq_map.$text.eq(1).css(hidden_css);
				five_jq_map.$line.css(show_css);
				five_jq_map.$ta.css(hidden_css);
				five_jq_map.$tb.css(hidden_css);
				five_jq_map.$tc.css(hidden_css);
				five_jq_map.$td.css(hidden_css).animate(none_css,1200,function(){
					configMap.five_lock=false;
				});
			}else{
				five_jq_map.$out.css(hidden_css).animate(none_css,800,function(){
					configMap.five_lock=false;
				});
				five_jq_map.$in.css(show_op_css);
			}
		}

		//第五屏第三状态
		function thirdAnimate(){
			//console.log('3');
			if(detail>0){
				five_jq_map.$tf.attr('style','').animate(none_css,300,function(){
					five_jq_map.$th.css(show_css).animate(none_css,300,function(){
						five_jq_map.$th.attr('style','');
					});
					five_jq_map.$tg.css(show_css).animate(none_css,300,function(){
						five_jq_map.$tg.attr('style','').animate(none_css,300)
					});
					five_jq_map.$te.css(hidden_css).animate(none_css,300,function(){
						five_jq_map.$ta.attr('style','opacity: 1');
						five_jq_map.$tb.attr('style','opacity: 1');
						five_jq_map.$tc.attr('style','opacity: 1');
						five_jq_map.$td.attr('style','opacity: 1').animate(none_css,500,function(){
							configMap.five_lock=false;
						});
					});
				});
			}else{
				five_jq_map.$text.eq(0).css(hidden_css);
				five_jq_map.$text.eq(1).css(show_css);
				five_jq_map.$line.css(hidden_css);
				five_jq_map.$ta.css(show_css);
				five_jq_map.$tb.css(show_css);
				five_jq_map.$tc.css(show_css);
				five_jq_map.$td.css(show_css).animate(none_css,1200,function(){
					configMap.five_lock=false;
				});
			}
		}

		//第五屏第四状态
		function fourAnimate(){
			if(detail>0){
				five_jq_map.$part_e.removeAttr('style');
				five_jq_map.$part_a.addClass('an-mecare-width-none');
				five_jq_map.$part_d.addClass('an-mecare-width-none');
				five_jq_map.$part_c.addClass('an-mecare-height-none').animate(none_css,100,function(){
					five_jq_map.$part_b.addClass('an-mecare-width-none').animate(none_css,100,function(){
						five_jq_map.$share.attr('style','');
						five_jq_map.$layout.attr('style','');
						five_jq_map.$text.eq(1).css(show_css).animate(none_css,1000,function(){
							five_jq_map.$ag.attr('style','');
							five_jq_map.$box.attr('style','');
						});
						//console.log('here');
					}).animate(none_css,1000,function(){
						configMap.five_lock=false;
					});
				});
			}else{
				five_jq_map.$ta.css(position_none);
				five_jq_map.$tb.css(position_none);
				five_jq_map.$tc.css(position_none);
				five_jq_map.$td.css(position_none);
				five_jq_map.$te.animate(none_css,900,function(){
					five_jq_map.$te.css(show_css).animate(none_css,10,function(){
						five_jq_map.$th.animate(none_css,900,function(){
							five_jq_map.$th.css(show_css).animate(none_css,10,function(){
								five_jq_map.$th.css(position_none);
							});
						})
						five_jq_map.$tg.animate(none_css,900,function(){
							five_jq_map.$tg.css(show_css).animate(none_css,10,function(){
								five_jq_map.$tg.css(position_none).animate(none_css,900);
								five_jq_map.$tf.css(show_css).animate(none_css,1200,function(){
									configMap.five_lock=false;
								});
							});
						})
					});
				});
			}
		}

		//第五屏第五状态
		function fiveAnimate(){
			var $layout=five_jq_map.$layout,
				$share=five_jq_map.$share;
			//if(direct>0){
				//configMap.five_lock=false;
			//}else{
			five_jq_map.$ag.css(show_css);
			five_jq_map.$box.css(show_css).animate(none_css,10,function(){
				five_jq_map.$ag.css(position_none);
				five_jq_map.$box.css(position_none).animate(none_css,900,function(){
					configMap.five_lock=false;
					sixAnimate();
				});
			});
			//}
		}

		//第五屏第六状态
		function sixAnimate(){
			var position_hidden,
				$layout=five_jq_map.$layout,
				$share=five_jq_map.$share;
			position_hidden={'top':'-450px'};
			//console.log('this');
			if(detail>0){
				configMap.five_lock=false;
			}else{
				five_jq_map.$text.eq(1).css(hidden_css).animate(none_css,900);
				$share.css(position_hidden).animate(none_css,1000,function(){
					transFn($layout.eq(0),160);
					transFn($layout.eq(1),320);
					transFn($layout.eq(2),620);
					transFn($layout.eq(3),550);
					transFn($layout.eq(4),430);
					$share.animate(none_css,500,function(){
						five_jq_map.$part.css(show_css).animate(none_css,100,function(){
							five_jq_map.$part_a.removeClass('an-mecare-width-none');
							five_jq_map.$part_b.removeClass('an-mecare-width-none');
							five_jq_map.$part_c.removeClass('an-mecare-height-none');
							five_jq_map.$part_d.removeClass('an-mecare-width-none');
							five_jq_map.$part_e.css(show_css);
							configMap.five_lock=false;
						});
					});
				});
				function transFn($container,y){
					$container.css({
						"transform": "translate3d(0,"+y+"px,0)",
						"-webkit-transform": "translate3d(0,"+y+"px,0)",
						"-moz-transform": "translate3d(0,"+y+"px,0)",
						"-o-transform": "translate3d(0,"+y+"px,0)"
					})
				}
			}
		}
	}
	//pageEani end
	
	//pageFani begin
	//purpose	:第六屏动画
	//arguments	:none
	//return 	:none
	pageFani=function(){
		var $text=starteMap.$container.find('.mecare-t-six-text');
		$text.css('opacity',1);
		//reBildWheel();
	}
	//pageFani end
	
	//pageGani begin
	//purpose	:第六屏动画
	//arguments	:none
	//return 	:none
	pageGani=function(){
		var $text=starteMap.$container.find('.mecare-t-seven-text');
		$('.mecare-t-seven-page-box').css({'background-position':'0px 0px'});
		$text.css('opacity',1);
	}
	//pageGani end
	
	//pageHani begin
	//purpose	:第八屏动画
	//arguments	:none
	//return	:none
	pageHani=function(){
		var $container=starteMap.$container,
			eight_state=starteMap.eight_state,
			jq_eight_map={
				$box:$container.find('.mecare-page-eight'),
				$bg:$container.find('.mecare-eight-bg'),
				$text:$container.find('.mecare-t-eight-text'),
				$cg	:$container.find('.mecare-t-eight-page-box-b'),
				$cg_img:$container.find('.mecare-eighv-bg'),
				$cg_text:$container.find('.mecare-t-eighv-text'),
				$dg	:$container.find('.mecare-t-eight-page-box-c'),
				$dg_img:$container.find('.mecare-eighw-bg'),
				$dg_text:$container.find('.mecare-t-eighw-text')
			},
			show_css={
				"transform": "translate3d(-1920px,0,0)",
				"-webkit-transform": "translate3d(-1920px,0,0)",
				"-moz-transform": "translate3d(-1920px,0,0)",
				"-o-transform": "translate3d(-1920px,0,0)"	
			},
			hidden_css={
				"transform": "translate3d(0,0,0)",
				"-webkit-transform": "translate3d(0px,0,0)",
				"-moz-transform": "translate3d(0px,0,0)",
				"-o-transform": "translate3d(0px,0,0)"	
			};
		
		starteMap.is_eight_scroll_next=false;//修改页面可否向下滑动的变量，默认让其不能滑动
		starteMap.is_eight_scroll_prve=false;//修改页面可否向上滑动的变量，默认让其不能滑动
		
		switch(eight_state){
			case	0:
				starteMap.is_eight_scroll_prve=true;
				changeNavBg('#fff');
				firstAnimate();
			break;
			case	1:
				changeNavBg('#333');
				secondAnimate();
			break;
			case	2:
				starteMap.is_eight_scroll_next=true;
				changeNavBg('#fff');
				thirdAnimate();
			break;
		}
		
		//修改索引状态
		jqMap.$eight_icon.removeClass('mecare-t-eight-icon-action');
		jqMap.$eight_icon.eq(eight_state).addClass('mecare-t-eight-icon-action');
		
		
		//状态一
		function firstAnimate(){
			var show_css={'opacity':1},
				bg_css={'top':'400px','left':'700px','opacity':1};	
			jq_eight_map.$bg.animate({'':''},1000,function(){
				jq_eight_map.$text.css(show_css);
				jq_eight_map.$bg.css(bg_css);
			});
			jq_eight_map.$cg.css(hidden_css);
			jq_eight_map.$dg.css(hidden_css);
		}
		
		//状态二
		function secondAnimate(){
			var
				cg_img_css={'top':'100px','left':'-200px','opacity':1},
				cg_text_css={'opacity':1};
			jq_eight_map.$cg.css(show_css).animate({'':''},900,function(){
				jq_eight_map.$cg_img.css(cg_img_css);
				jq_eight_map.$cg_text.css(cg_text_css);
			});
			jq_eight_map.$dg.css(hidden_css);
		}
		//状态三
		function thirdAnimate(){
			var 
				dg_img_css={'bottom':'-130px','opacity':1},
				dg_text_css={'opacity':1};
			jq_eight_map.$dg.css(show_css).animate({'':''},900,function(){
				jq_eight_map.$dg_img.css(dg_img_css);
				jq_eight_map.$dg_text.css(dg_text_css);
			});
		}
		//reBildWheel();
	}
	//pageHani end
	
	//eightIconfn begin
	//purpose	:第八屏焦点效果实现
	//arguments	:none
	//return 	:none
	eightIconfn=function(e){
		var index=jqMap.$eight_icon.index($(this));
		starteMap.eight_state=index;
		pageHani();
	}
	//eightIconfn end
	
	
	//重新绑定滚轮事件
	/*
	reBildWheel=function(){
		//再次注册滚轮事件
		if(starteMap.timer_out==null){
			starteMap.timer_out=setTimeout(function(){
				Readchar.Event.buildWheel(mouseWheel);
				clearTimeout(starteMap.timer_out);
				starteMap.timer_out=null;
				console.log('重新绑定');
			},configMap.during_time);
		}
	}*/

	
	//配置参数方法
	setConfigMap=function(arg_map){
		var
			input_map	=arg_map.input_map,
			settable_map=arg_map.settable_map,
			config_map	=arg_map.config_map,
			key_name,error;
		for(key_name in input_map){
			if(input_map.hasOwnProperty(key_name)){
				if(settable_map.hasOwnProperty(key_name)){
					config_map[key_name]=input_map[key_name];
				}else{
					error=makeError('Bad Input','Setting config key|'+key_name+'| is not supported')
				};
			}
		}
	}
	
	
	//配置插件参数
	configModule=function(input_map){
		setConfigMap({
			input_map	:input_map,
			settable_map:configMap.settable_map,
			config_map	:configMap
		});
	}
	
	
	//初始化插件方法
	initModule=function($container){
		var anchor_json;
		starteMap.$container=$container;
		setJqMap();
		//计算出所有切换屏幕的总数
		starteMap.page_length=jqMap.$page.length;
		if(jqMap.$header){
			starteMap.page_length++;
		}
		if(jqMap.$footer){
			starteMap.page_length++;
		}

		
		//刷新时获取页面的索引
		anchor_json=$.uriAnchor.makeAnchorMap();
		if(anchor_json.page){
			starteMap.anchor_json=anchor_json;
			for(var i=0;i<configMap.uri_table.length;i++){
				if(anchor_json.page==configMap.uri_table[i]){
					starteMap.page_index=i;
					pageScroll();
				}
			}
		}

		var my_time_out=null;
		$(document).mousewheel(function(event,delta){
			//detail:-1 向下，1向上
			if(configMap.five_lock){
				return false;
			}
			if(configMap.lock){
				if(delta==-1&&starteMap.page_index<starteMap.page_length-1){
					if((starteMap.page_index==3&&!starteMap.is_scroll_page)||
						(starteMap.page_index==4&&!starteMap.is_four_scroll_next)||
						(starteMap.page_index==5&&!starteMap.is_five_scroll_next)){
					}else{
						starteMap.page_index++;
					}
				}else if(delta==1&&starteMap.page_index>0){
					if((starteMap.page_index==3&&!starteMap.is_scroll_page_prve)||
						(starteMap.page_index==4&&!starteMap.is_four_scroll_prve)||
						(starteMap.page_index==5&&!starteMap.is_five_scroll_prve)){
					}else{
						starteMap.page_index--
					}
				}
				pageScroll(delta);
				//console.log(starteMap.page_index);
			}
			configMap.lock=false;

			if(my_time_out==null){
				my_time_out=setTimeout(function(){
					configMap.lock=true;
					clearTimeout(my_time_out);
					my_time_out=null;
				},configMap.during_time);
			}
		});

		//如果有焦点，注册焦点事件
		if(configMap.is_icon){
			jqMap.$icon.click(iconHandle);
		}
		
		//第八屏焦点事件绑定
		jqMap.$eight_icon.bind('click',eightIconfn);
		
		//导航焦点
		topNavFn();
		pageZani()

		jqMap.$backHome.click(function(){
			starteMap.page_index=0;
			pageScroll();
		});

		jqMap.$scrollTop.click(function(){
			starteMap.page_index=0;
			pageScroll();
		});

	}
	
	return {
		initModule		:initModule,
		configModule	:configModule,
		ieLowerBrawse	:ieLowerBrawse
	}
})();