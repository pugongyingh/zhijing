// JavaScript Document
$(function(){
	//手机头部导航
	$('.moikit-phone-header-nav').click(function(){
		if($('body').width()>1024){
			return false;
		}
		$('.moikit-header-nav-box').toggle();
	});

	$('.moikit-footer-nav-list ul li.moikit-footer-nl-title').click(function(){
		if($('body').width()>1024){
			return false;
		}
		var
				purpose_height=0,
				$this=$(this),
				$parent=$this.parent(),
				$ul=$parent.siblings(),
				$li=$parent.find('li'),
				hide_li_length=$parent.find('li.phone-hide').length,
				length=$li.length,
				first_li_height=$this.outerHeight(),
				other_li_height=$parent.find('li').eq(1).outerHeight();


		if($parent.outerHeight()==first_li_height){
			purpose_height=first_li_height+(length-1-hide_li_length)*other_li_height;
		}else{
			purpose_height=first_li_height
		}
		$('.moikit-footer-nav-list ul li.moikit-footer-nl-title').removeClass('moikit-footer-nlt-show');
		if(purpose_height==first_li_height){
			$this.removeClass('moikit-footer-nlt-show');
		}else{
			$this.addClass('moikit-footer-nlt-show');
		}
		$ul.css({'height':first_li_height});
		$parent.css({'height':purpose_height});
	});
});