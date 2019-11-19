import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import chache from '@/common/utils/storage'
import config from '@/common/utils/config'
import {state} from './mutations'

export default{
	// 取行情列表
	async getMarketList({commit},res){
		const getMarket=await httpUtils.get(address.marketTrade.marketList,res);
		if(getMarket.status){
			commit('GETMARKETLIST',getMarket.data)
		}
		return getMarket
	},
	// webSocket创建连接
	async createWebsocket({commit},res){
		let dev = process.env.NODE_ENV
		let socketUrl=chache.has('merchantInfo')?chache.get('merchantInfo').merchantSetting.publishDomain:''
		let u=config.domain.split(':')
		let t1 = ''
		// #ifdef H5
		if (dev === 'development') {
		  t1 = 'wss://' + socketUrl + '/ws'
		} else {
		  t1 = (u[0] === 'https' ? 'wss://' : 'ws://') + socketUrl + '/ws'
		}
		// #endif
		// #ifndef H5
		  t1 = (u[0] === 'https' ? 'wss://' : 'ws://') + socketUrl + '/ws'
		// #endif
		await commit('CONNECTSOCKET',t1)
		openSocket()
		// 返回的数据
		state.socketTask.onMessage((rs)=>{
			commit('GETMARKETDATA',rs.data)
		})
		// 监听关闭
		state.socketTask.onClose(()=>{
			console.log('watch close socket')
		})
		// 监听出错
		state.socketTask.onError(res =>{
			console.log('socket connect err:'+JSON.stringify(res))
		})
		function openSocket(){
			// 打开socket并发送数据
			state.socketTask.onOpen((rs)=>{
				console.log("WebSocket connect normal...")
				commit('SOCKETISOPEN',true)
				// state.socketTask._webSocket.binaryType = 'arraybuffer'
				state.socketTask.send({
					data:res,
					success() {
						console.log("message send success...");
					}
				})
			})
		}
	},
	// 获取单个品种详情
	async getSingleMarketDetails({commit},res){
		const getMarketDetails=await httpUtils.get(address.marketTrade.marketDetail,res);
		if(getMarketDetails.status){
			commit('GETMARKETDETAILS',getMarketDetails.data)
		}
		return getMarketDetails
	},
	// 获取单个商品号的价格信息
	async getMarketGoodsDetails({commit},res){
		const getMarketGoodsDetails=await httpUtils.get(`/futures/v2/market/${res.commodityCode}/${res.contractCode}`);
		if(getMarketGoodsDetails.status){
			commit('GETMARKETGOODSDETAILS',getMarketGoodsDetails.data)
		}
		return getMarketGoodsDetails
	},
	// 获取行情图数据
	async getHistoryChartDas({commit},res){
		const getHistoryChart=await httpUtils.get(`/futures/v2/market/${res.commodityCode}/${res.contractCode}/minsline`);
		if(getHistoryChart.status){
			commit('GETHISTORYCHART',getHistoryChart.data)
		}
		return getHistoryChart
	},
	// 关闭marketSocket
	closeSocket({commit}){
		commit('CLOSESOCKET')
	},
	// 重置行情和交易
	async resetAllMarket({commit}){
		commit('RESETMARKET')
	}
}