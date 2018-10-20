//Readchar mecare
if (typeof Mecare == 'undefined' || !Mecare) {
  var Mecare = {
  };
};
Mecare.messBox = Mess = {
  passWord: '密码',
  passNull: '密码不能为空',
  passWordTip: '设置6~12为密码',
  reNewPass: '请输入重复密码',
  newPass: '请设置6~12位新密码',
  passError: '密码应为6-16个字符，区分大小写',
  newpassTip: '请输入新的密码',
  reptWord: '两次输入的密码不一致',
  oldPassWord: '请输入当前密码',
  checkNum: '验证码',
  checkNumNull: '请填写验证码',
  phCheckError: '请填写六位数字验证码',
  emCheckError: '请填写六位验证码',
  phoneNumNull: '请输入手机号码',
  phoneNum: '手机号',
  userName: '手机号/账户名',
  userNull: '账号不能为空',
  inputPC: '请输入您收到的手机验证码',
  phoneErrorA: '请正确输入手机格式',
  phoneErrorB: '请输入11位数手机号码',
  phoneRegisted: '该手机号码已被注册，马上登录',
  bindPhone: '请输入您要绑定的手机',
  bindEmaiPh: '请输入如您账号绑定的邮箱或手机号',
  email: '邮箱',
  emailError: '请输入正确的邮箱格式，支持数字、字母、下划线',
  emailNull: '邮箱不能为空',
  inputUser: '请输入您绑定麦开账号的邮箱或手机号码',
  bindEmail: '请输入您要绑定的邮箱',
  resUser: '请填写收货人姓名',
  userLong: '姓名最长为10个汉字或英文字母',
  resPhNum: '请输入联系人电话',
  addDtail: '请填写详细地址',
  addLong: '不能多于80个字符',
  choiceCity: '请选择省份、城市、区/县'
}
Mecare.Validator = {
  validateIn: function (elm, defText) {
    var value = elm.attr('value');
    elm.css({
      'color': '#333737'
    });
    if (value == '' || value == defText) {
      elm.attr({
        'value': ''
      });
    }
  },
  validateOut: function (elm, defText, tipElm, textBox, checkFn) {
    var value = elm.attr('value');
    elm.css({
      'color': '#9ba2a2'
    });
    if (!checkFn(value)) {
      tipElm.removeClass('lcd-none');
      if (value == '' || value == defText) {
        if (checkFn != Rc.checkPassWord) {
          elm.attr('value', defText);
        }
        tipElm.text(textBox.nullText);
      } else {
        tipElm.text(textBox.errorText);
      }
      return false;
    } else {
      tipElm.addClass('lcd-none');
      return true;
    }
  }
}
Mecare.alertLay = Layout = {
  showAlert: function (layId) {
    if (layId == '#editAdd') {
      $('#gdi-box > div.gd-rows >div.lc-input >input').eq(0).attr('value', '')
      $('#gdi-box > div.gd-rows >div.lc-input >input').eq(1).attr('value', '');
      $('#s_province').attr('value', '省份/直辖市');
      $('#s_city').attr('value', '城市');
      $('#s_county').attr('value', '区/县');
      $('#gdi-box > div.gd-rows >div.lc-input >input').eq(2).attr('value', '');
      $('#gdi-box > div.gd-rows >div.lc-input >input').eq(3).attr('value', '');
    }
    this.addEmpLay();
    $(layId).css({
      'opacity': '1'
    });
    $(layId).css({
      'display': 'block'
    });
  },
  addEmpLay: function () {
    var strHtml = '<div id=\'lay-bg\'></div>';
    $('body').append(strHtml);
    $('#lay-bg').css({
      'display': 'block',
      'opacity': '0.2'
    });
    $('#lay-bg').height($('body').height());
  },
  removeBgLay: function (timer) {
    if (!timer) {
      timer = 0
    };
    $('#lay-bg').css({
      'opacity': '0'
    });
    setTimeout(function () {
      if ($('#lay-bg')) {
        $('#lay-bg').remove();
      }
    }, timer);
  },
  hiddenAlert: function (layId) {
    $(layId).css({
      'opacity': '0'
    });
    this.removeBgLay(500);
    $(layId).css({
      'display': 'none'
    });
  },
  editLay: function (layId, elm) {
    var mindex = $('.gdd-edit').index(elm),
    name = $('ul.gda-defau li div .gda-name').eq(mindex).text(),
    phone = $('ul.gda-defau li h4').eq(mindex).text(),
    eare = $('ul.gda-defau li h5').eq(mindex).children('em'),
    sheng = eare.eq(0).text(),
    shi = eare.eq(1).text(),
    qu = eare.eq(2).text(),
    addressStr = $('ul.gda-defau li p').eq(mindex).text(),
    add = addressStr.substring(0, addressStr.indexOf('（')),
    bian = $('ul.gda-defau li p em').eq(mindex).text();
    $('#gdi-box > div.gd-rows >div.lc-input >input').eq(0).attr('value', name)
    $('#gdi-box > div.gd-rows >div.lc-input >input').eq(1).attr('value', phone);
    $('#s_province').attr('value', sheng);
    change(1);
    $('#s_city').attr('value', shi);
    change(2);
    $('#s_county').attr('value', qu);
    $('#gdi-box > div.gd-rows >div.lc-input >input').eq(2).attr('value', add);
    $('#gdi-box > div.gd-rows >div.lc-input >input').eq(3).attr('value', bian);
    this.addEmpLay();
    $(layId).css({
      'opacity': '1'
    });
    $(layId).css({
      'display': 'block'
    });
  },
  uaResult: function (message, imgUrl) {
    var str = '<div id=\'success\'><div class=\'su-posi\'><img src=\'' + imgUrl + '\' width=\'25\' height=\'25\'/></div><div class=\'su-mess\'><span>' + message + '</span></div></div>';
    $('body').append(str);
    this.showAlert('#success');
    var saTime = setTimeout(function () {
      Layout.hiddenAlert('#success');
      $('#success').remove();
      clearTimeout(saTime);
    }, 1500)
  },
  showWX: function (imgUrl) {
    var htmlStr = '<div id=\'mecar-wx\'><img src=\'' + imgUrl + '\' alt=\'\' width=\'350\' height=\'519\'/></div>';
    $('body').append(htmlStr);
    $('#wx-bg').css({
      'display': 'block',
      'opacity': '0.3'
    });
    $('#wx-bg').height($(document).height());
    $('#mecar-wx').stop().animate({
      'top': '50%'
    }, 300);
    return false;
  },
  hiddenWX: function () {
    $('#wx-bg').css({
      'opacity': '0'
    });
    $('#mecar-wx').stop().animate({
      'top': '140%'
    }, 300, function () {
      $('#mecar-wx').remove();
    });
    setTimeout(function () {
      $('#wx-bg').css({
        'display': 'none'
      });
    }, 300);
  }
}
$('a.me-jn-colse').click(function () {
  Layout.hiddenAlert($(this).parent());
})
$('a.mecare-wx').bind({
  click: function () {
    Layout.showWX('public/images/2w.png');
    $('#mecar-wx').bind({
      click: function () {
        Layout.hiddenWX();
      }
    });
  }
});
$(document).ready(function (e) {
  $('body').append('<div id=\'wx-bg\'></div>');
  $('.lcc-btn > a.lcc-btn-blue').bind({
    click: function () {
      if (!$(this).hasClass('lcc-btn-def'))
      {
        Layout.showAlert('#yzm-lay')
      }
    }
  });
  $('.lcy-zm >input').bind({
    focus: function () {
      valiIn($(this), Mess.checkNum)
    },
    blur: function () {
      validateEcode($(this), $('#yzm-lay > .lc-tip'));
    }
  });
});
var timer = null;
function countDown(inputElm, tipElm, sendEmail) {
  var time = 60;
  $('.lcc-btn > a.lcc-btn-blue').addClass('lcc-btn-def');
  timer = setInterval(function () {
    time--;
    $('.lcc-btn > a').eq(0).text(time + '秒');
    if (time <= 0) {
      clearInterval(timer);
      $('.lcc-btn > a.lcc-btn-blue').removeClass('lcc-btn-def');
      if (sendEmail) {
        if (!validateEmail(inputElm, tipElm)) {
          if (!$('.lcc-btn > a.lcc-btn-blue').hasClass('lcc-btn-def')) {
            $('.lcc-btn > a.lcc-btn-blue').addClass('lcc-btn-def');
          }
        }
      } else {
        if (!validatePhoneNum(inputElm, tipElm)) {
          if (!$('.lcc-btn > a.lcc-btn-blue').hasClass('lcc-btn-def')) {
            $('.lcc-btn > a.lcc-btn-blue').addClass('lcc-btn-def');
          }
        }
      }
      $('.lcc-btn > a').eq(0).text('重新获取');
    }
  }, 1000);
}
var valiOut = Mecare.Validator.validateOut,
valiIn = Mecare.Validator.validateIn;
function validatePhoneNum(inputElm, tipElm) {
  return valiOut(inputElm, Mess.phoneNum, tipElm, {
    nullText: Mess.phoneNumNull,
    errorText: Mess.phoneErrorB
  }, Rc.checkMobilePhone);
}
function validatePcode(inputElm, tipElm) {
  return valiOut(inputElm, Mess.checkNum, tipElm, {
    nullText: Mess.checkNumNull,
    errorText: Mess.phCheckError
  }, Rc.checkChcode)
}
function validateEcode(inputElm, tipElm) {
  return valiOut(inputElm, Mess.checkNum, tipElm, {
    nullText: Mess.checkNumNull,
    errorText: Mess.emCheckError
  }, Rc.checkEmCode)
}
function validatePassWorld(inputElm, tipElm) {
  return valiOut(inputElm, Mess.passWord, tipElm, {
    nullText: Mess.passNull,
    errorText: Mess.passError
  }, Rc.checkPassWord)
}
function validateEmail(inputElm, tipElm) {
  return valiOut(inputElm, Mess.email, tipElm, {
    nullText: Mess.emailNull,
    errorText: Mess.emailError
  }, Rc.checkEmail)
}
$(".setLan").click(function(){
	lan=$(this).attr('data-lan');
	
	url='/index/set-lan?locale='+lan;
	$.getJSON(url,{},function(d){
		window.location.href="index.html";
	})
});