// JavaScript Document
$(document).ready(function() {
   
/*if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
	var dodyHeight=$(document.body).width();
	if(dodyHeight<1400){	
		};
	
	
	}*/
//product.html
window.onscroll=backTop;	
function backTop(){
	     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	     if(scrollTop==0){
	         $(".topBox").hide(); 
	     }else{
			 $(".topBox").show();  
	     }
	
     }
$(".topBox").hover(
	function(){	$(this).find("img").attr("src","images/Top-02.html");	},
	function(){ $(this).find("img").attr("src","images/Top-01.html");}

	);	 
$(".topBox").on("click",function(){
	
	$("html,body").animate({scrollTop: '0px'}, 800);  });	 
	 
//注册登陆框显示隐藏
$(".hea_sign").on("click",function(){
	$(".popup_box").show();
	$(".login").show();		
	});	

$(".hea_login").on("click",function(){
	$(".popup_box").show();
	$(".sign").show();		
	});	
$(".close").on("click",function(){
	$(this).parent().hide()
			.parent().hide();
	});
	
	
//输入框密码改变
$(".tx1").on("focus",function(){
	
	if( $(this).val() != "密码") return;
	$(this).hide();
	$(this).siblings().show()
		   .val("")
		   .focus();
});
$(".pwd1").on("blur",function(){
	if($(this).val() != "") return;
	$(this).hide();
	$(this).siblings().show()
		   .val("密码");
} )
$(".tx2").on("focus",function(){
	
	if( $(this).val() != "重复密码") return;
	$(this).hide();
	$(this).siblings().show()
		   .val("")
		   .focus();
});
$(".pwd2").on("blur",function(){
	if($(this).val() != "") return;
	$(this).hide();
	$(this).siblings().show()
		   .val("重复密码");
} );	 
 
});
//头部的显示隐藏
