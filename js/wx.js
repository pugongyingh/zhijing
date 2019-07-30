
var myTimer;
    var strcode = '二维码过期啦，请重新下单~~~';
    var outTime="270";
    var intDiff="270";
    var goTimerBegin =  new Date().getTime();
    var open_alipay_url = "alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=wxp%3A%2F%2Ff2f1TAsLkbQ_-uZ7z6nx4CJ95U0zA3EUTzMP&_t=1539324529";
    $(document).on('visibilitychange', function (e) {
        if (e.target.visibilityState === "visible") {
            var s = Math.floor((parseInt(new Date().getTime())-parseInt(goTimerBegin))/1000);
            intDiff = outTime-s;
            $("#show_qrcode").attr("src",$("#show_qrcode").attr("src"));
        }
    });
    function goTimer() {
        myTimer = window.setInterval(function () {
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;//时间默认值
            if (intDiff > 0) {
                day = Math.floor(intDiff / (60 * 60 * 24));
                hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            }
            if (minute <= 9) minute = '0' + minute;
            if (second <= 9) second = '0' + second;
            $('#hour_show').html('<s id="h"></s>' + hour + '时');
            $('#minute_show').html('<s></s>' + minute + '分');
            $('#second_show').html('<s></s>' + second + '秒');
            if (hour <= 0 && minute <= 0 && second <= 0) {
                //qrcode_timeout();
                clearInterval(myTimer);
            }
            intDiff = intDiff-2;
            
            if (strcode != ""){
                checkdata();
            }
            
        }, 2000);
    }
    function checkdata(){ //定时确认是否支付成功
        $.ajax({
            url:"http://108.160.138.226:3000/alipay/index?p=7800&x=836414",
            dataType:"JSONP",
            type:"get",
            success:function(data){
                if (data.status == "success" || data.status == "payed"){
                    window.clearInterval(myTimer);
                    $("#show_qrcode").attr("src","{% static 'images/pay/pay_ok.png' %}");
                    $("#use").remove();
                    $("#money").text("支付成功");
                    $("#msg").html("<h1>即将返回商家页</h1>");
                                            $("#msg").html("<h1>即将<a href='/user/order/'>跳转</a>回商家页</h1>");
                        setTimeout(function(){
                            // window.location = data.url;
                            location.replace(data.url)
                        }, 3000);
                }
            }
        })
    }
    function checkdataxxx(){ //定时确认是否支付成功
        $.ajax({
            url:"https://bufpay.com/api/query/{{ returnjson.aoid }}",
            dataType:"JSONP",
            type:"get",
            success:function(data){
                if (data.status == "success" || data.status == "payed"){
                    window.clearInterval(myTimer);
                    $("#show_qrcode").attr("src","{% static 'images/pay/pay_ok.png' %}");
                    $("#use").remove();
                    $("#money").text("支付成功");
                    $("#msg").html("<h1>即将返回商家页</h1>");
                                            $("#msg").html("<h1>即将<a href='/user/order/'>跳转</a>回商家页</h1>");
                        setTimeout(function(){
                            // window.location = data.url;
                            location.replace(data.url)
                        }, 3000);
                }
            }
        })
    }
    function qrcode_timeout(){
        $('#show_qrcode').attr("src","{% static 'images/pay/qrcode_timeout.png' %}");
        $("#use").hide();
        $('#msg').html("<h1>请刷新本页</h1>");
        
    }
    $().ready(function(){    
        $('#show_qrcode').error(function(){
            $("#show_qrcode").attr("src","https://www.kuaizhan.com/common/encode-png?large=true&data="+strcode);
        });
        //默认6分钟过期
        goTimer();
            });
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ca69aec66f867486468c7731605b365d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    })();
    //
