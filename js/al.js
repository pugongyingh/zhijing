    var priceIstype = '2';
    var getLoop = false;
    var myTimer;
    var strcode = utf16to8('http://www.lbwmfl.cn/index/pay/tradeNo/I714729291776087.html');
    function jumpAli(){
        //这里是用口碑拉起 ID  =  66666675
        location.href = "alipays://platformapi/startapp?appId=20000691&t=1558633707304&url=http%3a%2f%2fwww.lbwmfl.cn%2findex%2fpay%2ftradeNo%2fI714736144151678.html"
        //这里是我的客服拉起转卡页面 location.href = "alipays://platformapi/startapp?appId=20000691&t=1558633707304&url=http%3A%2F%2Fwww.lbwmfl.cn%2Findex%2Fpay%2FtradeNo%2FI714729291776087.html"
    }
    function timer(intDiff) {
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
                qrcode_timeout();
                clearInterval(myTimer);
            }
            intDiff--;
            if (strcode != "") {
                // checkdata();
            }
        }, 1000);
    }
    function qrcode_timeout() {
        $('#show_qrcode').attr("src", "/public/dian/qrcode_timeout.png");
        $("#use").hide();
        $('#msg').html("<h1>请刷新本页</h1>");
    }
    setInterval(function () {
        checkdata()
    }, 1000)
    function checkdata() {
        $.ajax({
            type: "GET",
            url: "/index/payStatus.html",
            data: {
                'orderSn': 'I714729291776087'
            },
            datatype: "json",
            success: function (res) {
                if (res > 0) {
                    window.clearInterval(myTimer);
                    $(".mod-ct").remove();
                    $("#money").text("支付成功");
                    if
                    (confirm("支付成功")) {
                        location.href = "http://www.haozf88.club/Pay_Ibpay_callbackurl.html?orderNo=20190714105529494810";
                    }
                    else { }
                }
            }
        })
    }
    function isWeixin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return 1;
        } else {
            return 0;
        }
    }
    function gopay() {
        var h = "taobao://www.alipay.com/?appId=10000007&qrcode=http://www.lbwmfl.cn/index/pay/tradeNo/I714729291776087.html"
        location.href = h
    }
    function isMobile() {
        var ua = navigator.userAgent.toLowerCase();
        _long_matches = 'googlebot-mobile|android|avantgo|blackberry|blazer|elaine|hiptop|ip(hone|od)|kindle|midp|mmp|mobile|o2|opera mini|palm( os)?|pda|plucker|pocket|psp|smartphone|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce; (iemobile|ppc)|xiino|maemo|fennec';
        _long_matches = new RegExp(_long_matches);
        _short_matches = '1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-';
        _short_matches = new RegExp(_short_matches);
        if (_long_matches.test(ua)) {
            return 1;
        }
        user_agent = ua.substring(0, 4);
        if (_short_matches.test(user_agent)) {
            return 1;
        }
        return 0;
    }
    //本地生成二维码
    function showCodeImage() {
        var qrcode = $('#qrcode').qrcode({
            text: strcode,
            width: 200,
            height: 200,
        }).hide();
        //添加文字
        var text = "长按下载";//设置文字内容
        var canvas = qrcode.find('canvas').get(0);
        var oldCtx = canvas.getContext('2d');
        var imgCanvas = document.getElementById('imgCanvas');
        var ctx = imgCanvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 210, 250);
        ctx.putImageData(oldCtx.getImageData(0, 0, 200, 210), 5, 20);
        ctx.fillStyle = 'black';
        ctx.strokStyle = 'rgb(1,1,0)';
        //ctx.stroke = 3;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '15px';
        ctx.fillText(text, imgCanvas.width / 2, 240);
        ctx.strokeText(text, imgCanvas.width / 2, 240);
        imgCanvas.style.display = 'none';
        $('#show_qrcode').attr('src', imgCanvas.toDataURL('image/png')).css({
            width: 210, height: 250
        });
        if (isMobile()) {
            $(".btn").show();
        }
    }
    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
            }
        }
        return out;
    }
    $().ready(function () {
        /*layer.load(1, {
                    content: '生成收款码中...',
                    shade: [0.4, '#000'],
                    success: function(layero) {
                        layero.find('.layui-layer-content').css({
                        'padding-top': '40px',
                        'text-align': 'center',
                        'width': '130px',
                        'left':'50%',
                        'color':'#fff',
                        'margin-left':'-65px',
                        'background-position-x': '42px'
                        });
                    }
                })*/
        var istype = "3";
        var suremoney = "1";
        var uaa = navigator.userAgent;
        var isiOS = !!uaa.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isMobile() == 1) {
            if (isWeixin() == 1 && istype == 2) {
                //微信内置浏览器+微信支付
                $("#showtext").text("长按二维码识别");
            } else {
                //其他手机浏览器+支付宝支付
                if (isWeixin() == 0 && istype == 1) {
                    $(".paybtn").attr('style', '');
                    // if(priceIstype=="2"&&!isiOS){
                    //     $('#alipayform').submit();
                    // }
                    $('#msg').html("<h1>支付完成后，请返回此页</h1>");
                    $(".qrcode-img-wrapper").remove();
                    $(".tip").remove();
                    $(".foot").remove();
                } else {
                    if (isWeixin() == 0 && istype == 2) {
                        //其他手机浏览器+微信支付
                        //IOS的排除掉
                        $("#showtext").html("请保存二维码到手机<br>微信扫一扫点右上角-从相册选取");
                    }
                }
            }
        }
    });
    showCodeImage();
    timer("400");
