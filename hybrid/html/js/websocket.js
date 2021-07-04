// import Event from './event.js'

var ws = {
  socket: null, // socket name
  realTimeData: null, // 请求实时数据的参数
  intervalObj: null, // 定时器的名字
  lastRealTimeData: null, // 上一次请求的产品
  socketUrl:'',
  bytesData:[],
  sendData(historyData, realTimeDatas, history,webSocketUrl) {
    // 储存历史数据
    this.historyData = historyData
    this.realTimeData = realTimeDatas
    // 如果上一次订阅过产品
    if (this.lastRealTimeData) {
      // 如果不是订阅历史产品 那么肯定就是切换周期咯 或者切换产品咯
      // 那么就取消订阅上一次的产品实时数据
      !history && this.sendWsRequest({
        args: [this.lastRealTimeData],
        cmd: 'unsub'
      })

      // 请求这一次的历史
      this.sendWsRequest(this.historyData)
      // 如果不是订阅历史产品 那么肯定就是切换周期咯 或者切换产品咯 
      // 那么就订阅一下 这次产品的或者周期的 实时数据
      !history && this.sendWsRequest({
        args: [this.realTimeData],
        cmd: 'sub',
        id : 'fd0823a5-e16b-4f46-8b68-3fd723beb321'
      })
    } else {

      // 如果是第一次订阅，就是说刚进入交易所，
      // 先存起来这一次请求的产品 作为历史产品
      this.lastRealTimeData = this.realTimeData
      // 然后 初始化一下websocket
      this.initWs(webSocketUrl,historyData)
    }
  },
  initWs (url,bytes) {
    //'wss://api.ifukang.com/v2/ws'
    socketUrl = url
	  bytesData = bytes
    this.socket = new WebSocket(url)
    this.socket.binaryType='arraybuffer'
    this.socket.onopen = () => {
      this.sendWsRequest(bytes)
      console.log('open & link socket');
      // this.sendWsRequest({
      //   args: [this.realTimeData],
      //   cmd: 'sub',
      //   id : 'fd0823a5-e16b-4f46-8b68-3fd723beb321'
      // })
    }
    this.socket.onmessage = resp => {
      this.message(resp)
    }
    this.socket.onclose = () => {
      this.close()
    }
    this.socket.onerror = err => {
      this.error(err)
    }
  },
  error (err) {
    console.log(err, 'depth-socket::error')
  },
  close () {
    // 如果websocket关闭的话，就从新打开一下。
    this.initWs(socketUrl,bytesData)
    console.log('depth-socket::close')
  },
  message (resp) {
    // 拿到数据。
    // 吧这次请求的产品 储存成历史产品
    this.lastRealTimeData = this.realTimeData
    // var data = JSON.parse(resp.data.replace(/\r/g, '').replace(/\n/g, ''))
    var data = proto.MessageBase.deserializeBinary(resp.data).array[5]
    hub.emit('realTime', data)
  },
  checkSendMessage(options) {
    // 这里处理websocket 连接不上的问题
    var checkTimes = 10
    var i = 0
    this.intervalObj = setInterval(() => {
      i += 1
      if (this.socket.readyState === 1) {
        // ...
        this.socket.send(options)
        clearInterval(this.intervalObj)
        return
      }
      if (i >= checkTimes) {
        clearInterval(this.intervalObj)
        console.log('send post_data_str timeout.')
      }
    }, 500)
  },
  sendWsRequest (options) {
    switch (this.socket.readyState) {
      case 0:
        this.checkSendMessage(options)
        break
      case 1:
        this.socket.send(options)
        break
      case 2:
        console.log('ws关闭状态')
        break
      case 3:
        this.initWs(socketUrl,bytesData)
        break
      default:
        console.log('ws未知错误')
    }
  }
}

// export default socket
