		var title= document.title;
		var desc = document.title;
		var pic  = '../../wx.beeba.cn/Public/Wechat/images/opentalk/share_icon.jpg';
		var link = document.location.href;
 


		function is_weixin(){
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
				return true;
			 } else {
				return false;
			}
		}

		function AddFiles(URL,FileType){
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var addheadfile;
			if(FileType=="js"){
			  addheadfile= document.createElement("script");
			  addheadfile.type = "text/javascript";
			  addheadfile.src=URL;
			}else{
			  addheadfile= document.createElement("link");
			  addheadfile.type = "text/css";
			  addheadfile.rel="stylesheet";
			  addheadfile.rev = "stylesheet";
			  addheadfile.media = "screen";
			  addheadfile.href=URL;
			}
			oHead.appendChild( addheadfile);
		}

		AddFiles('../../wx.beeba.cn/Public/static/layer_mobile/need/layer.css','css'); 

		

		if(is_weixin()){

			$.getScript("../../wx.beeba.cn/Public/static/layer_mobile/layer.js", function() {
				 
			});
			  

			$.jsonp({
				url: 'http://wx.beeba.cn/Wxapi/getSignure?url='+encodeURI(link),
	
				timeout: 5 * 60 * 1000,
							 
				callbackParameter: "callback",
				callback : 'back' + Math.random().toFixed(2)*1000 ,
							 
				success: function(json){
								 
					console.log(json);
	
					if(json.appId){
	
						weixin(json); 
						
					}else{
						layer.open({
							content: '获取微信分享参数失败,请重新打开！'
							,skin: 'msg'
							,time: 3 //2秒后自动关闭
						  });
					}
								 
				},
							 
				error: function(XMLHttpRequest,textStatus){
					console.log(XMLHttpRequest);
				}
						
			});


		}


		 
		



		function weixin(json){ 
 
			//微信jssdk config配置 

			wx.config({
				  debug: false,
				  appId: json.appId,
				  timestamp: json.timestamp,
				  nonceStr: json.nonceStr,
				  signature: json.signature,                  
				  jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'hideOptionMenu',
					'checkJsApi'
				  ]
			});


			 
				
			//调用微信js-sdk    
			wx.ready(function(){            
				//隐藏右上角菜单
				//wx.hideOptionMenu();
				
				wx.onMenuShareTimeline({
						title: title, // 分享标题
						link: link, 
						imgUrl: pic, // 分享图标

						trigger: function (res) {
							console.log('用户点击分享到朋友圈');
						},
						success: function () { 
							// 用户确认分享后执行的回调函数
							console.log("已成功分享到朋友圈");
						},
						cancel: function () { 
							// 用户取消分享后执行的回调函数
							console.log("已取消分享");
						},
						fail: function(){
							console.log("分享失败");
						}
					});
				
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					link: link, 
					imgUrl: pic, // 分享图标
					desc: desc, // 分享描述 

					trigger: function (res) {
						console.log('用户点击分享到朋友');
					},
					success: function () {
						// 用户确认分享后执行的回调函数
						console.log("已成功分享给朋友");
					},
					cancel: function () { 
						// 用户取消分享后执行的回调函数
						console.log("已取消分享");
					},
					fail: function(){
						console.log("分享失败");
					}
				});
			});


			wx.error(function(res){ 
				console.log(res);
				layer.open({
					content: '微信错误：'+res.errMsg
					,skin: 'msg'
					,time: 2 //2秒后自动关闭
				  }); 
			});

		}


		