
$(document).ready(function() {
	var height_box=$(window).height();

	$("#section0").css("height",height_box);
		
	$("body").on("touchstart",function(){
			var id_none_02=$(".full_nav").css("display");	
			if(id_none_02!="none"){
				setTimeout('$(".full_nav").slideUp();',200);
			}
		
		});	
	
	$(".full_nav_buttn").on("touchstart",function(){
		var id_none=$(".full_nav").css("display");
		if(id_none=="none"){
			/*$(".full_nav").slideDown();*/
			setTimeout('$(".full_nav").slideDown();',200);
			}else{
				setTimeout('$(".full_nav").slideUp();',200);
				
				
				};
	
		});
		
		

	//观看视频
	$(".pro_boxplay_01").on("touchstart",function(){
		$(this).parent().find(".se_embBox").show();
			$("#media").show();
			document.getElementById("media").play();
		});
	$(".ne_colse").on("touchstart",function(){
		$(this).parent().hide();
		$("#media").hide();
		document.getElementById("media").pause();
		});
	var du_buxs=$(".full_headerBox").css("padding");
	var jdhr_height=$(".full_headerBox").innerHeight();
	$(".banner").css("padding-top",jdhr_height);
    /*window.onscroll=backTop;
	function backTop(){
				 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				 if(scrollTop > 0){	 
					$(".full_headerBox").stop().animate({padding:"5px 5%"},250);

					 }else{
						  
						$(".full_headerBox").stop().animate({padding:du_buxs},250) 
						 };
			
			 };	*/
	 checkPlatform();	 
		
	});


	
   
function checkPlatform(){

	if(/MicroMessenger/i.test(navigator.userAgent)){
		$("#buy_button").attr("href","http://item.m.jd.com/ware/view.action?wareId=1457919486");
	}
};
  