$(document).ready(function(e) {
	
	var icon_index=0;
	var icon_length=$(".sr_icon_box > div").length;
	/*//section0
	$("#section0 .pro_play").on("click",function(){
		$("#section0 .se_embBox").show();
		/!*$("#media").show();*!/
		document.getElementById("media").play();
		uyt_tuer=false;
		});
	$("#section0 .ne_colse").on("click",function(){
		uyt_tuer=true;
		$("#section0 .se_embBox").hide();
		/!*$("#media").hide();*!/
		document.getElementById("media").pause();
		});*/
	//观看视频按钮
	$(".pro_play").hover(
		function(){$(this).addClass("pro_hoerBox");},
		function(){$(this).removeClass("pro_hoerBox");}
	);
	//section4
	$("#section4 .pro_play").on("click",function(){
		var rnm_index=$(this).index();	
		$("#section4 .se_embBox").show();
		switch (rnm_index)
							{
								case 1:
									$(".embea_ioc_01").show();
								break;
								case 2:
									$(".embea_ioc_02").show();
								break;
							};
		});
	$("#section4 .ne_colse").on("click",function(){
		$("embed").hide();
		/*$(".embea_ioc_02").hide();*/
		$("#section4 .se_embBox").hide();
		});
	//section9
	var index_div=$(".sr_icon_box > div").length;
	for(var i=0;i<index_div; i++){
		var span_width=($(".sr_icon_box > div:eq("+i+")").find("span").width()+55)/2;
		$(".sr_icon_box > div:eq("+i+")").find("span").css("margin-left",-span_width);
		};	
	//图片墙
	$(".sr_icon_box > div").hover(
		function(){
			$(this).find("span").show();
			$(this).find("img").css({"-webkit-transform":"scale(1.05,1.05)", "-moz-transform":"scale(1.05,1.05)"});
			
			},
		function(){
			$(this).find("span").hide()
			$(this).find("img").css({"-webkit-transform":"scale(1,1)", "-moz-transform":"scale(1,1)"});
			}	
	);
	$(".sr_icon_box > div").on("click",function(){
		icon_index=$(this).index();
		$(".icon_bigBox").show();
		$(".icon_conBox > img:eq("+icon_index+")").show().siblings("img").hide();
		});
	$(".ne_right").on("click",function(){
			if(icon_index==icon_length-1){
				icon_index=0;
				$(".icon_conBox > img:eq("+icon_index+")").show().siblings("img").hide();
				}else{
					icon_index=icon_index+1;
					$(".icon_conBox > img:eq("+icon_index+")").show().siblings("img").hide();
					}
		});	
	$(".ne_left").on("click",function(){
			if(icon_index==0){
				icon_index=icon_length-1;
				$(".icon_conBox > img:eq("+icon_index+")").show().siblings("img").hide();
				}else{
					icon_index=icon_index-1;
					$(".icon_conBox > img:eq("+icon_index+")").show().siblings("img").hide();
					}
		});	
	$(".icon_bigBox .ne_colse").on("click",function(){
		$(".icon_bigBox").hide();
		});	
	//right_nav
	$(".right_nav li").hover(
		function(){$(this).find("span").show();},
		function(){$(this).find("span").hide();}
	);
	
	$(".right_nav li").on("click",function(){
		var nav_index=$(this).index()+2;
		$(this).find("font").addClass("bg_fff").next().show();
		$(this).siblings().find("font").removeClass("bg_fff").next().hide();
		switch (nav_index)
							{
								case 2:
									$.fn.fullpage.moveTo(2)
								break;
								case 3:
									$.fn.fullpage.moveTo(3)
								break;
								case 4:
									$.fn.fullpage.moveTo(4)
								break;
								case 5:
									$.fn.fullpage.moveTo(5)
								break;
								case 6:
									$.fn.fullpage.moveTo(6)
								break;
								case 7:
									$.fn.fullpage.moveTo(7)
								break;
								case 8:
									$.fn.fullpage.moveTo(8)
								break;
								case 9:
									$.fn.fullpage.moveTo(9)
								break;
								case 10:
									$.fn.fullpage.moveTo(10)
								break;
							};
		});
	
});

	var uyt_tuer=true;	//视频
	var hu_header=true;	//头部
	var huan=true;			//Down 3rdPage
	var huan_2=true;		//Down 5Page
	var huan_foot=true;		//Down footer
	var huan_up=true;		//up 3rdPage
	var huan_2_up=true;		//up 5Page
	var huan_foot_up=true;	//up footer
	
	// mouseDown下滑
	function mouseDown(){
		var herder_disply=$(".herderBox").css("display");
		var width_box=$(window).width();
		var height_box=$(window).height();
		var set1_top=parseInt($(".se_1Box").css("top"));
		if(set1_top!=0){
			if(set1_top==height_box && uyt_tuer){
				$(".se_1Box").stop().animate({top:0},500);
				setTimeout('$(".sec_01").addClass("animate1_01");$(".sec_02").addClass("animate1_02");', 500);
				$("#section0 .se_embBox").hide();
				$(".herderBox").stop().animate({top:"-123px"},500);
				$(".herderBox_small").stop().animate({top:"0px"},500);
				};
			}else{
				if(huan && huan_2 && huan_foot){
					$.fn.fullpage.moveSectionDown();
				}else{
					 if(huan && huan_2 && !huan_foot){
							var foot_display=$(".footer").css("display");
							if(foot_display=="none"){
								huan_foot=true;
								huan_foot_up=false;
								$(".footer").show();
								var box_top=parseInt($("#fullpage").css("top"));
								var footheight=$(".footer").height()+110;
								var foot_box_hei=box_top-footheight;
								$("#fullpage").animate({top:foot_box_hei},100);
								$(".right_nav").hide();
							}
						};
					
					};
				
				};
		
		
		};
		
	// mouseUp 上滑	
	function mouseUp(){
		
		var foot_disply=$(".footer").css("display");
		var width_box=$(window).width();
		var height_box=$(window).height();
		var header_top=parseInt($(".herderBox").css("top"));
		var set1_top=parseInt($(".se_1Box").css("top"));	
			if(set1_top==0 && hu_header){
				setTimeout('$(".sec_01").removeClass("animate1_01");$(".sec_02").removeClass("animate1_02");', 500);
				$(".se_1Box").stop().animate({top:height_box},500)
				$(".herderBox").stop().animate({top:"0px"},500);
				$(".herderBox_small").stop().animate({top:"-59px"},500);
			}; //头部显示
		if(foot_disply=="block"){
			if(!huan_foot_up){
				huan_foot=false;
				huan_foot_up=true;
				var box_top=parseInt($("#fullpage").css("top"));
				var footheight=$(".footer").height()+110;
				var foot_box_hei=box_top+footheight;
				$("#fullpage").animate({top:foot_box_hei},100);
				$(".right_nav").show();
				$(".footer").delay(100).fadeOut();
			};
		}else{	
			if(huan_up && huan_2_up && huan_foot_up){
				$.fn.fullpage.moveSectionUp();
				}else if(huan_up && huan_2_up && !huan_foot_up){
					$.fn.fullpage.moveSectionUp();
				};
			
			} ;
		
	};