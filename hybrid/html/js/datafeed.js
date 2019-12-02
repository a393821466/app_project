// import socket from './socket.js';
// import Event from './event.js'

/*********************************************/

// 次文件只需要关注 getBars 和 subscribeBars 函数即可

/******************************************/

// 历史数据 第一条数据的 时间撮 因为k线图一次性历史数据只拿一部分，用户吧图往前滑动，就会用这个时间撮去请求更早的 历史数据
var detafeed_historyTime = 0
// 上一次的 K线周期 切换产品的时候 需要从websock 取消订阅这个
var detafeed_lastResolution = null
// 上一次的产品 切换产品的时候 需要从websock 取消订阅这个
var detafeed_lastSymbol = null

var tmpLineData=-1

function FeedBase () {}

FeedBase.prototype.onReady = function (callback) {
  callback(this._configuration)
}

FeedBase.prototype.getSendSymbolName = function (symbolName) {
  var name = symbolName.split('/')
  return (name[0] + name[1]).toLocaleLowerCase()
}

FeedBase.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
  var getParams=$init.queryMeter();
  var num=!getParams.priceDecimalPlaces?10000:getParams.priceDecimalPlaces;
  var foint=Math.pow(10, num)
  onResolve(
    {
      "name": symbolName,
      "timezone": "Asia/Shanghai",
      "pricescale": foint,
      "minmov": 1,
      "minmov2": 0,
      "ticker": symbolName,
      "description": "",
      "session": "24x7",
      "type": "bitcoin",
      "volume_precision": 10,
      "has_intraday": true,
      "intraday_multipliers": ['1', '5', '15', '30', '1D','1W','1M'], // 时间
      "has_weekly_and_monthly": false,
      "has_no_volume": false,
      "regular_session": "24x7"
    }
  )
}
FeedBase.prototype.getApiTime = function (resolution) {
  switch (resolution) {
    case '1':
      return '1'
    case '5':
      return '5'
    case '15':
      return '15'
    case 'day':
      return '1D'
    case 'week':
      return '1W'
    case 'month':
      return '1M'  
  }
}

FeedBase.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
  // 切换产品周期 或者 切换产品 会执行这个函数
  // 是历史数据 
  var history = true
  /*
    !detafeed_historyTime 如果没请请求过这个产品或者这个周期的历史数据
    resolution !== detafeed_lastResolution 是否更换了产品周期
    detafeed_lastSymbol !== symbolInfo.name 是否切换了产品
  */
  if (!detafeed_historyTime || (resolution !== detafeed_lastResolution) || detafeed_lastSymbol !== symbolInfo.name) {
    // 那就不是历史数据
    history = false
    // 储存请求过的产品
    detafeed_lastSymbol = symbolInfo.name
    // 记录目前时间搓，就用目前的目前时间搓往前请求历史数据
    detafeed_historyTime = window.parseInt((Date.now() / 1000))
  }


  /*
    @socket.sendData
    第一个参数订阅历史数据
    第二个参数订阅实时数据
    第三个参数 是  是否是历史数据
  */
  console.log(1321)
  var that=this;
  var webSocketUrl='';
  var getParams=$init.queryMeter()
  hub.off('data')
  hub.on('data',function(data){
    console.log(1321)
    var d=!domain?'https://tmk.eanjee.com':domain
    var us=$init.getProtocol(d);
    var getUrl=data.merchantData.merchantSetting.publishDomain;
    webSocketUrl=(us === 'https:' ? 'wss://' : 'ws://') + getUrl + '/ws'
    var message = new proto.MessageBase();
    message.setClientid('0a0493f7-80d4-4d1a-9d98-6da9ae9d399e');
    message.setCmd(proto.CommandType.PUSH_DATA)
    message.setRequesttype(1)
    message.setData(`${getParams.contractCode}&${getParams.commodityCode}`)
    let bytes = message.serializeBinary()
    // 记录这次请求的时间周期
    detafeed_lastResolution = resolution
    var meta = {noData: false}
    var bars = []
    if (data.marketData.length && Array.isArray(data.marketData)) {
      detafeed_historyTime = data.marketData[0].time/1000 - 1
      bars=data.marketData;
    } else {
      meta = {noData: true}
    }
    onResult(bars, meta)
    if(resolution=='1'){
      if(ws.socket!==null){
        ws.close();
      }else{
        ws.sendData(bytes, 'candle.this.'+that.getApiTime(resolution)+'.'+symbolInfo.name, history,webSocketUrl)
      }
    }
  })
  // socket.sendData({
  //   args: [`candle.${this.getApiTime(resolution)}.${symbolInfo.name}`, 1441, detafeed_historyTime],
  //   cmd: 'req',
  //   id: '0a0493f7-80d4-4d1a-9d98-6da9ae9d399e'
  // }, `candle.${this.getApiTime(resolution)}.${symbolInfo.name}`, history,webSocketUrl,bytes)
}


FeedBase.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
  // Event.off('realTime')

  // 拿到实时数据 在这里画
  hub.on('realTime',function(data){
    if(data){
      if (historyData.length) {
        var socketDas = historyData[historyData.length - 1]
        var date = new Date(data[0].replace(/\-/g, '/'))
        var t=new Date(date).getTime();
        let r = {
          time: t,
          close: data[23] * 1,
          open: socketDas.close,
          high: socketDas.high,
          low: socketDas.low,
          volume: 0,
          totalVolume: data[30] * 1,
        }
        if (data[23] * 1 > r.high) {
          r.high = data[23] * 1
        }
        if (data[23] * 1 < r.low) {
          r.low = data[23] * 1
        }
        let scoketDate = socketDas.time
        let chartDate = date.getTime()
        if (tmpLineData === -1) {
          tmpLineData = socketDas.totalVolume
        }
        if (chartDate - scoketDate >= 60 * 1000) {
          r.volume = data[30] * 1 - tmpLineData
          tmpLineData = data[30] * 1
          historyData.push(r)
        }else{
          r.time = socketDas.time
          r.volume = data[30] * 1 - tmpLineData
          historyData.pop()
          historyData.push(r)
        }
        if(resolution=='1'){
          onTick(historyData[historyData.length-1])
        }
      }
    }
  })
}

FeedBase.prototype.unsubscribeBars = function (listenerGuid) {
  // 取消订阅产品的callback
}
