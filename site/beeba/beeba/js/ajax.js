

$(document).ready(function() {
		
    
	$.ajax({/*加载页面*/
			url: "/footer.html",	
			type: "get",
			cache: false,
			dataType:"text",
			//dataType:"json",
			data:"",
			global: true,
			success: function(data){
				if(data!=null){
					$(".footer").html(data);
					}else{
						console.log(data);
						/*$(".pa_boxe").show();*/
						}
				
			},error:function(err){	
			/*$(".pa_boxe").show();*/	
			console.log(err);
			}
		});
	
	
	
	})


			
			
	 