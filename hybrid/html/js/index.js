// 图表库实例化后储存的函数
var widget = null 
// 进入页面 默认展示的产品
var index_market = ''
// 进入页面 默认展示的产品周期
var index_activeCycle = 1
// 商户信息
var merchantInfo='';
// 域名
var domain='';
// 历史数据
var historyData=[];
$(function(){
  // 行情图表事件
  // 给chartConfig添加展示周期
  chartConfig.interval = index_activeCycle
  // 所有的变量
  var getParams=$init.queryMeter()
  var marketData='';
  var marketPrice='';
  var model={
    num: 1,
    title: '元模式',
    type: '0'
  }
  var tradeHands=1;
  var stopMoney=0;
  var buyPrices=0;
  var sellPrices=0;
  var das={
    templateCode:getParams.tpCode,
    CommodityName:decodeURI(getParams.CommodityName),
    commodityCode:getParams.commodityCode,
    contractCode:getParams.contractCode,
    priceDecimalPlaces:getParams.priceDecimalPlaces,
    productTypeCode:getParams.productTypeCode
  }
  domain=!getParams.domain?'':getParams.domain
  // 给chartConfig添加展示产品
  chartConfig.symbol = das.CommodityName
  var quickFlat=true;
  // 初始化 TradingView
  widget = new window.TradingView.widget(chartConfig)

  widget && widget.onChartReady && widget.onChartReady(function () {
    // 这是k线图 展示的 7日均线和30日均线。
    widget.chart().createStudy('Moving Average', false, false, [5], null, {'Plot.linewidth': 2, 'Plot.color': '#2ba7d6'})
    widget.chart().createStudy('Moving Average', false, false, [15], null, {'Plot.linewidth': 2, 'Plot.color': '#de9f66'})
		setTimeout(() => {
			widget.chart().resetData()
		}, 1000)
  })
  
  // 行情页面及购买逻辑
  // 获取商户信息
  $init.get(domain+'/apis/console/subsystem/merchant','',function(res){
    merchantInfo=res.data
    getHistoryList();
  },function(err){
    $init.info({
      message:err.msg,
      type:'error'
    });
    return;
  },getParams.token);
  // 获取单个行情
  $init.get(domain+'/apis/business/getQuotaInfo',{templateCode:das.templateCode,commodityCode:das.commodityCode},function(res){
	if(res.status){
      marketData=res.data;
      closeTimer() 
      $(".marketName .nameAndCode").find('.name').text(marketData.CommodityName);
      if(das.productTypeCode=='DIGICCY'){
        $(".marketName .nameAndCode").find('.code').text(marketData.commodityCode);
      }else{
        $(".marketName .nameAndCode").find('.code').text(marketData.commodityCode+marketData.contractCode);
      };
      singleMarketFun(marketData);
      return;
    }
    $init.info({
      message:res.msg,
      type:'error'
    });
  },function(err){
    $init.info({
      message:err.msg,
      type:'error'
    });
    return;
  },getParams.token)
  function singleMarketFun(das){
    $init.get(domain+'/apis/futures/v2/market/'+das.commodityCode+'/'+das.contractCode,'',function(res){
      if(res.status){
        marketPrice=res.data;
        marketPrice.lastPrice = $init.formatPoint(res.data.lastPrice);
        marketPrice.buyNumber = res.data.askSize;
        marketPrice.sellNumber = res.data.bidSize;
        var m = new Decimal(res.data.lastPrice).sub(res.data.openPrice).toNumber();
        marketPrice.upDropPrice = $init.formatPoint(m);
        var n = new Decimal(m).div(res.data.openPrice).toNumber();
        var x = new Decimal(n).mul(100).toNumber();
        marketPrice.upDropSpeed = x;
        marketPrice.buyPrice = res.data.askPrice;
        marketPrice.sellPrice = res.data.bidPrice;
        marketPrice.status=das.status;
        renderPrice(marketPrice);
        order(marketPrice)
      }
    },function(err){
      $init.info({
        message:err.msg,
        type:'error'
      });
      return;
    },getParams.token)
  }
  // 获取所有的历史数据
  function getHistoryList(data){
    var query=!data?'':{
      mins:data
    };
    $init.get(domain+'/apis/futures/v2/market/'+das.commodityCode+'/'+das.contractCode+'/minsline',query,function(res){
      if(res.status){
        var data=res.data;
        if(data&&data.length){
          data.forEach(e => {
            var date = new Date(e.timeStr.replace(/\-/g, '/'));
            var time = new Date(date).getTime();
            historyData.push({
              time: time,
              totalVolume: e.endTotalQty,
              close: e.closePrice,
              open: e.openPrice,
              high: e.highPrice,
              low: e.lowPrice,
              volume: e.volume
            })
          });
          var das={
            merchantData:merchantInfo,
            marketData:historyData
          }
          hub.emit('data', das);
          socketData()
        }else{
          historyData=[]
        }
      }
    },function(err){
      $init.info({
        message:err.msg,
        type:'error'
      });
      return;
    },getParams.token);
  }
  function socketData(){
    var $buyMall=$("#buyMallNum");
    hub.on('realTime', data => {
      buyPrices=Number(data[13]);
      sellPrices=Number(data[3]);
      data[8]>=100?$buyMall.find('.buyView').css('width',100+'%'):$buyMall.find('.buyView').css('width',data[8]+'%');
      data[18]>=100?$buyMall.find('.mallView').css('width',100+'%'):$buyMall.find('.mallView').css('width',data[18]+'%');
      $(".buyMallNum .buy").find("span").text(data[8]);
      $(".buyMallNum .mall").find("span").text(data[18]);
      var m = new Decimal(data[23]).sub(data[28]).toNumber()
      var n = new Decimal(m).div(data[28]).toNumber()
      var x = new Decimal(n).mul(100).toNumber()
      var d={
        lastPrice:$init.formatPoint(data[23],das.priceDecimalPlaces),
        upDropSpeed:x,
        upDropPrice:m,
        buyPrice:$init.formatPoint(buyPrices,das.priceDecimalPlaces),
        sellPrice:$init.formatPoint(sellPrices,das.priceDecimalPlaces),
        status:marketData.status,
        openPrice:$init.formatPoint(data[25],das.priceDecimalPlaces),
        highPrice:$init.formatPoint(data[26],das.priceDecimalPlaces),
        lowPrice:$init.formatPoint(data[27],das.priceDecimalPlaces),
        closePrice:$init.formatPoint(data[28],das.priceDecimalPlaces)
      }
      renderPrice(d);
      order(d);
    })
  }

  // 底部下单导航
  function order(data){
    if(data=='close') return;
    var bt1=baidu.template;
    var order=bt1('toOrder',data);
    $("#bottom_order").html(order);
    // 闪电下单开启关闭
    var $quickBar=$('.quicktTollBar');
    var $parentBar=$('.quickOriderView');
    $(".quick-center").off('click').on('click',function(){
      var that=$(this);
      if(quickFlat){
        that.find('.quickIcon').css('color','#ccc');
      that.find('.quick-text').css('color','#ccc');
        that.find('.quick-text').text('OFF');
        $parentBar.find('.b').text('闪电买多');
        $parentBar.find('.m').text('闪电卖多');
        $quickBar.show(100);
        quickFlat=false;
      }else{
        that.find('.quickIcon').css('color','#fff');
        that.find('.quick-text').css('color','#fff');
        that.find('.quick-text').text('ON');
        $parentBar.find('.b').text('买多');
        $parentBar.find('.m').text('卖多');
        $quickBar.hide(100);
        quickFlat=true;
      }
    });
    // 选择手数及止盈弹窗
    var $handView=$("#quickBuyHandNum");
    var $profitView=$("#quickTakeProfit");
    $(".handNum").off('click').on('click',function(){
      openMaskView($handView,$(".handView"),'active');
    });
    $(".handNumUp .right,.quickHandNumView").off('click').on('click',function(){
      closeMaskView($(".handView"),$handView,'active');
    });

    $(".stopLoopAmount").off('click').on('click',function(){
      openMaskView($profitView,$(".profitView"),'active');
    });
    $(".profitViewUp .right,.quickTakeProfitView").off('click').on('click',function(){
      closeMaskView($(".profitView"),$profitView,'active');
    });
  }
  // 圆角模式处理
  $('#models').off('click').on('click',function(){
    if($(this).prop("checked")){
      model={
        num: 1,
        title: '元模式',
        type: '0'
      }
    }else{
      model={
        num: 0.1,
        title: '角模式',
        type: '1'
      }
    }
    $(".modelText").text(model.title);
    getDataAndMaps();
  })
  // 持仓时间
  function closeTimer(){
    var closeTimes=marketData.closeTime;
    var data1=!closeTimes?{time:''}:{time:closeTimes}
    var bt1=baidu.template;
    var timerHtml=bt1('getTimer',data1);
    $("#timer").html(timerHtml);
    getDataAndMaps()
  }
  // 渲染价格
  function renderPrice(marketPrice){
    var bt1=baidu.template;
    var timerHtml=bt1('getDymicPrice',{data:marketPrice});
    $("#decimalPrice").html(timerHtml);
    $("#handicap .higt").find('b').text(marketPrice.highPrice);
    $("#handicap .low").find('b').text(marketPrice.lowPrice);
    $("#handicap .open").find('b').text(marketPrice.openPrice);
    $("#handicap .yesterdaySettlement").find('b').text(marketPrice.closePrice);
    $("#handicap .riseFall").find('b').text(marketPrice.upDropPrice);
    $("#handicap .bd").find('b').text(marketPrice.upDropSpeed.toFixed(2));
    // $(".quick-rise").find('.r').text(marketPrice.buyPrice);
    // $(".quick-sell").find('.f').text(marketPrice.sellPrice);
  }
  // 获取手数及遍历全部手数
  function getDataAndMaps(){
    var allTradeHands=marketData.tradeHandsUnit;
    if(!allTradeHands){
      return
    }
    var d=allTradeHands.split(',');
    var data1={splitHands:d}
    var bt1=baidu.template;
    var handsHtml=bt1('getHandNums',data1);
    $("#handNums").html(handsHtml);
    var aLi=$(".handNumContent ul li");
    aLi.eq(0).addClass('active');
    tradeHands=aLi.eq(0).find('span').text();
    $(".hand-num-view .num").text(tradeHands);
    aLi.off('click').on('click',function(){
      var n=$(this).find('span').text();
      tradeHands=n;
      $(".hand-num-view .num").text(n);
      profit(marketData);
      $(this).addClass('active').siblings().removeClass('active');
      closeMaskView($(".handView"),$handView,'active');
    })
    profit(marketData);
  }
  // 选择止盈及数据渲染
  function profit(marketData){
    var gearInfo=marketData.gearInfo;
    if(!gearInfo){
      return
    }
    let v=[];
    let gearInfoMoney = typeof gearInfo === 'string' ? JSON.parse(gearInfo) : [];
    for (let j in gearInfoMoney) {
      let nums = Object.keys(gearInfoMoney[j])[0];
      let stopMoney=(nums*model.num)*tradeHands;
      v.push(stopMoney);
    }
    var data2={profitMoney:v,types:marketData.currentCurrencySign}
    var bt2=baidu.template;
    var profitHtml=bt2('getProfits',data2);
    $("#profits").html(profitHtml);
    var aLis=$(".profitContent ul li");
    aLis.eq(0).addClass('active');
    stopMoney=aLis.eq(0).find('span').text();
    $(".stop-loop-amount .types").text(marketData.currentCurrencySign);
    $(".stop-loop-amount .num").text(stopMoney);
    aLis.off('click').on('click',function(){
      var n=$(this).find('span').text();
      stopMoney=n;
      $(".stop-loop-amount .num").text(stopMoney);
      $(this).addClass('active').siblings().removeClass('active');
      closeMaskView($(".profitView"),$profitView,'active');
    })
  }
  function openMaskView(node1,node2,className){
    node1.show();
    setTimeout(function(){  
      node2.addClass(className);
    },10);
  };
  function closeMaskView(node1,node2,className){
    node1.removeClass(className);
    setTimeout(function(){  
      node2.hide();
    },200);
  };
  // 切换产品周期
  var marketDom = document.getElementById('symbol')
  var intervalDom = $("#interval").find('span')
  intervalDom.off('click').on('click',function(e){
    var val=e.target.dataset.value;
    if(e.target.className=='active'){
      return;
    }
    $(this).addClass('active').siblings().removeClass('active')
    if(val=='handicap'){
      $("#tv_chart_container").hide();
      $("#handicap").show();
      return;
    }
    if(val=='day'){
      console.log('日线')
      return;
    }
    $("#handicap").hide();
    $("#tv_chart_container").show();
    // 3 为平均K线； 1 为走势图
    widget.chart().setChartType(!val ? 3 : 1)
    widget.chart().setResolution(!val?'1':val)
    getHistoryList(val)
  })
});



// 切换产品
// marketDom.addEventListener('click', function (e) {
//   // e.target.innerHTML 就是我们拿到的产品
//   // 5是 5分钟数据
// 	console.log(e.target.innerHTML)
//   widget.setSymbol(e.target.innerHTML, 5)

//   // 这个函数不用看，我为了样式好看 写一个添加删除class
//   addClass(marketDom, e.target)

// 	addClass(intervalDom, intervalDom.children[1])
// }, false)


// // 切换产品周期
// intervalDom.addEventListener('click', function (e) {
//   // e.target.dataset.value 这个就是获取的产品的周期
// 	console.log(e.target.dataset.value)
// 	// 3 为平均K线； 1 为面积图
// 	widget.chart().setChartType(e.target.dataset.value == '1' ? 3 : 1)
//   widget.chart().setResolution(e.target.dataset.value)
//   // 这个函数不用看，我为了样式好看 写一个添加删除class
//   addClass(intervalDom, e.target)
// }, false)




// 单纯的写一个添加class的函数，这个不用看 没用
// function addClass (fatherDom, dom) {
//   [...fatherDom.getElementsByTagName('span')].forEach(function(item){
//     item.className = ''
//   })
//   dom.className = 'active'
// }