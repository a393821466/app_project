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
  var model={
    num: 1,
    title: '元模式',
    type: '0'
  }
  var isOpenHandView=true;
  var das={
    templateCode:getParams.tpCode,
    CommodityName:getParams.CommodityName,
    commodityCode:getParams.commodityCode,
    contractCode:getParams.getParams,
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
      that.css('color','#ccc');
      that.find('.quick-text').text('OFF');
      $parentBar.find('.b').text('闪电买多');
      $parentBar.find('.m').text('闪电卖多');
      $quickBar.show(100);
      quickFlat=false;
    }else{
      that.css('color','#fff');
      that.find('.quick-text').text('ON');
      $parentBar.find('.b').text('买多');
      $parentBar.find('.m').text('卖多');
      $quickBar.hide(100);
      quickFlat=true;
    }
  });
  // 存储token
  localStorage.setItem("token",getParams.token);
  // 获取单个行情
  $init.get('/apis/business/getQuotaInfo',{templateCode:das.templateCode,commodityCode:das.commodityCode},function(res){
    if(res.status){
      marketData=res.data;
      $(".marketName").find('.name').text(marketData.CommodityName);
      $(".marketName").find('.code').text(marketData.commodityCode+marketData.contractCode);
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
  })
  // 打开选择手数
  $(".handNum").off('click').on('click',function(){
    var $handView=$("#quickBuyHandNum");
    $handView.show()
    setTimeout(function(){  
      $("#getHandNum").addClass('active');
    },10)
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
function addClass (fatherDom, dom) {
  [...fatherDom.getElementsByTagName('span')].forEach(function(item){
    item.className = ''
  })
  dom.className = 'active'
}