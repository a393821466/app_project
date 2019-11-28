var $init = {
  parseQuery: function (data) {
    var query = Object.keys(data).map(function (key) {
      //   if (paramProxy) {
      //     return `${paramProxy}[${key}]=${encodeURIComponent(data[key])}`
      // }
      return `${key}=${encodeURIComponent(data[key])}`
    }).join('&');
    return query;
  },
  get: function (url, query, successfn, errorfn,token, dataType) {
    var queryParams = '';
    var dataTypes = (dataType == null || dataType == "" || typeof (dataType) == "undefined") ? "json" : dataType;
    // var getParams=$init.queryMeter()
    if (query) {
      queryParams = url + '?' + $init.parseQuery(query)
    } else {
      queryParams = url;
    }
    $.ajax({
      type: "get",
      url: queryParams,
      dataType: dataTypes,
      beforeSend: function (xhr) {
        // 需要设置请求报文
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        // if(getParams.domain){
        //   var u=$init.formatUrl(getParams.domain)
        //   console.log(u)
        //   xhr.setRequestHeader("merchantCode", u.toUpperCase());
        // }
        xhr.setRequestHeader("Authorization", token);
      },
      success: function (response) {
        successfn(response)
      },
      error: function (e) {
        errorfn(e)
      }
    })
  },
  post: function (url, params, key, successfn, errorfn, dataType) {
    var dataTypes = (dataType == null || dataType == "" || typeof (dataType) == "undefined") ? "json" : dataType;
    var q = $init.queryMeter()
    $.ajax({
      type: 'post',
      url: url,
      data: params,
      dataType: dataTypes,
      beforeSend: function (xhr) {
        // 需要设置请求报文
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.setRequestHeader("merchantCode", q.merchant);
        xhr.setRequestHeader("key", key);
      },
      success: function (response) {
        successfn(response)
      },
      error: function (e) {
        errorfn(e)
      }
    })
  },
  queryMeter: function () {
    var obj = {}
    var arr = location.href
      .substring(location.href.lastIndexOf('?') + 1)
      .split('&')
    for (var i = 0; i < arr.length; i++) {
      var aa = arr[i].split('=')
      obj[aa[0]] = aa[1]
    }
	// console.log('----------------')
	// console.log(JSON.stringify(obj))
	// console.log('----------------')
    return obj
  },
  encrypt: function (data, key) {
    let keys = CryptoJS.enc.Utf8.parse(key)
    let ivs = CryptoJS.enc.Utf8.parse('123456789abcdef0')
    let encrypted = CryptoJS.AES.encrypt(data, keys, {
      iv: ivs,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()
  },
  rsaEncrypt: function (publicKey, data) {
    var jse = new JSEncrypt()
    jse.setPublicKey(publicKey)
    return jse.encrypt(data)
  },
  info:function(options){
    /**
     * 调用
     * 字符串类型参数：$.info('成功');
     * 对象型参数：$init.info({});
     * message:' 操作成功',    //提示信息
     * time:'2000',           //显示时间（默认：2s）
     * type:'success',        //显示类型，包括4种：success.error,info,warning
     * showClose:false,       //显示关闭按钮（默认：否）
     * autoClose:true,        //是否自动关闭（默认：是）
     */
    var defaults={
        message:' 操作成功',
        time:'2000',
        type:'success',
        showClose:false,
        autoClose:true,
        onClose:function(){}
    };
    if(typeof options === 'string'){
        defaults.message=options;
    }
    if(typeof options === 'object'){
        defaults=$.extend({},defaults,options);
    }
    //message模版
    var templateClose=defaults.showClose?'<a class="c-message--close">×</a>':'';
    var template='<div class="c-message messageFadeInDown">'+
        '<i class=" c-message--icon c-message--'+defaults.type+'"></i>'+
        templateClose+
        '<div class="c-message--tip">'+defaults.message+'</div>'+
    '</div>';
    var _this=this;
    var $body=$('body');
    var $message=$(template);
    var timer;
    var closeFn,removeFn;
    //关闭
    closeFn=function(){
        $message.addClass('messageFadeOutUp');
        $message.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
            removeFn();
        })
    };
    //移除
    removeFn=function(){
        $message.remove();
        defaults.onClose(defaults);
        clearTimeout(timer);
    };
    //移除所有
    $('.c-message').remove();
    $body.append($message);
    //居中
    $message.css({
        'margin-left':'-'+$message.width()/2+'px'
    })
    //去除动画类
    $message.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
        $message.removeClass('messageFadeInDown');
    });
    //点击关闭
    $body.on('click','.c-message--close',function(e){
        closeFn();
    });
    //自动关闭
    if(defaults.autoClose){
        timer=setTimeout(function(){
            closeFn();
        },defaults.time)
    }
  },
  formatPoint: function(price,point) {
    if (price && point) {
      price = parseFloat(price)
      return price.toFixed(point)
    } else {
      return price
    }
  },
  formatUrl:function(url){
    if(!url){
      return
    }
    if(url.indexOf('http')>=-1||url.indexOf('https')>=-1){
      var u=url.split('//');
      var getOrigin=u[u.length-1];
      var getCode=getOrigin.split('.');
      return getCode[0];
    }
  },
  getProtocol:function(url){
    var u=url.split('//');
    return u[0];
  },
  getApiTimer:function(resolution){
    switch (resolution) {
      case '1':
        return 'M1'
      case '3':
        return 'M3'
      case '5':
        return 'M5'
      case '15':
        return 'M15'
      case '30':
        return 'M30'
      case '60':
        return 'H1'
    }
  },
  ramdomString: function (len) {
    const data = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let nums = ''
    for (let i = 0; i < len; i++) {
      const r = parseInt(Math.random() * 61)
      nums += data[r]
    }
    return nums
  }
}