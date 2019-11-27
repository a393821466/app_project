// 图表库实例化后储存的函数
var widget = null 
// 进入页面 默认展示的产品
var index_market = 'BTC/USDT'
// 进入页面 默认展示的产品周期
var index_activeCycle = 1

$(function(){
  // 行情图表事件
  // 给chartConfig添加展示周期
  chartConfig.interval = index_activeCycle
  // 给chartConfig添加展示产品
  chartConfig.symbol = index_market
  // 初始化 TradingView
  widget = new window.TradingView.widget(chartConfig)

  widget && widget.onChartReady && widget.onChartReady(function () {
    // 这是k线图 展示的 7日均线和30日均线。
    widget.chart().createStudy('Moving Average', false, false, [7], null, {'Plot.linewidth': 2, 'Plot.color': '#2ba7d6'})
    widget.chart().createStudy('Moving Average', false, false, [30], null, {'Plot.linewidth': 2, 'Plot.color': '#de9f66'})
		setTimeout(() => {
			widget.chart().resetData()
		}, 1000)
  })
  var marketDom = document.getElementById('symbol')
  var intervalDom = $("#interval").find('span')
  intervalDom.off('click').on('click',function(e){
    console.log(e.target.dataset.value)
    // 3 为平均K线； 1 为面积图
    widget.chart().setChartType(e.target.dataset.value == '1' ? 3 : 1)
    widget.chart().setResolution(e.target.dataset.value)
    $(this).addClass('active').siblings().removeClass('active')
  })
  // 行情页面及购买逻辑
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
  var das={
    templateCode:getParams.tpCode,
    CommodityName:getParams.CommodityName,
    commodityCode:getParams.commodityCode,
    contractCode:getParams.contractCode,
    priceDecimalPlaces:getParams.priceDecimalPlaces,
    productTypeCode:getParams.productTypeCode
  }
  // 闪电下单开启关闭
  var quickFlat=true;
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
  // 存储token
  // localStorage.setItem("token",getParams.token);
  // 获取单个行情
  $init.get('/apis/business/getQuotaInfo',{templateCode:das.templateCode,commodityCode:das.commodityCode},function(res){
    if(res.status){
      marketData=res.data;
      closeTimer()
      $(".marketName").find('.name').text(marketData.CommodityName);
      if(das.productTypeCode=='DIGICCY'){
        $(".marketName").find('.code').text(marketData.commodityCode);
      }else{
        $(".marketName").find('.code').text(marketData.commodityCode+marketData.contractCode);
      }
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
  $init.get('/apis/futures/v2/market/'+das.commodityCode+'/'+das.contractCode,'',function(res){
    if(res.status){
      marketPrice=res.data;
      marketPrice.lastPrice = $init.formatPoint(res.data.lastPrice)
      marketPrice.buyNumber = res.data.askSize
      marketPrice.sellNumber = res.data.bidSize
      var m = new Decimal(res.data.lastPrice).sub(res.data.openPrice).toNumber()
      marketPrice.upDropPrice = $init.formatPoint(m)
      var n = new Decimal(m).div(res.data.openPrice).toNumber()
      var x = new Decimal(n).mul(100).toNumber()
      marketPrice.upDropSpeed = x
      marketPrice.buyPrice = res.data.askPrice
      marketPrice.sellPrice = res.data.bidPrice
      renderPrice()
    }
  },function(err){
    $init.info({
      message:err.msg,
      type:'error'
    });
    return;
  },getParams.token)
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
  function renderPrice(){
    var prices=marketPrice.askPrice
    if(!prices){
      return
    }
    var bt1=baidu.template;
    var timerHtml=bt1('getDymicPrice',{data:marketPrice});
    $("#decimalPrice").html(timerHtml);
    $(".quick-rise").find('.r').text(marketPrice.buyPrice);
    $(".quick-sell").find('.f').text(marketPrice.sellPrice);
  }
  // 获取所有的历史数据
  function getHistoryList(){
    
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
  function openMaskView(node1,node2,className){
    node1.show();
    setTimeout(function(){  
      node2.addClass(className);
    },1);
  };
  function closeMaskView(node1,node2,className){
    node1.removeClass(className);
    setTimeout(function(){  
      node2.hide();
    },200);
  };
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
function addClass (fatherDom, dom) {
  [...fatherDom.getElementsByTagName('span')].forEach(function(item){
    item.className = ''
  })
  dom.className = 'active'
}