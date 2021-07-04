import chache from '@/common/utils/storage'
import socket from 'plus-websocket'
export const state={
	socketTask:null,
	socketIsOpen:false,
	marketTitle:[],
	marketList:[],
	marketSocketList:[],
	marketDetails:{},
	marketGoods:{},
	historyData:[]
}


export const mutations={
	// 处理行情列表数据
	['GETMARKETLIST'](state,res){
		state.marketList = res
		if (!res) {
		  return
		}
		let das = []
		if(state.marketList.length>0){
			state.marketTitle=[]
			state.marketList=[]
		}
		for(let i=0;i<res.length;i++){
			if(!das[res[i].productType]){
				let arr=[]
				arr.push(res[i])
				das[res[i].productType]=arr
			}else{
				das[res[i].productType].push(res[i])
			}
		}
		for (let k in das) {
		  state.marketTitle = state.marketTitle.concat(k)
		  das[k].map(x => {
			x.upDropSpeed = ((x.lastPrice - x.openPrice) / x.openPrice).toFixed(2)
			return x
		  })
		  state.marketList.push(das[k])
		}
	},
	// 行情websocket
	['CONNECTSOCKET'](state,u){
		state.socketTask=socket.connectSocket({
			url:u,
			success(data){
				console.log('Websocket connect')
			}
		})
	},
	// 保证socket打开
	['SOCKETISOPEN'](state,flat){
		state.socketIsOpen=flat
	},
	// 获取行情数据 (socket返回的数据)
	['GETMARKETDATA'](state,it){
		state.marketSocketList=it
	},
	// 获取单个行情详情（商品信息以及止盈止损等）
	['GETMARKETDETAILS'](state,it){
		state.marketDetails=it
	},
	// 获取行情数据（商品价格信息及时间等）
	['GETMARKETGOODSDETAILS'](state,it){
		state.marketGoods=it
	},
	// 获取行情图历史数据
	['GETHISTORYCHART'](state,it){
		state.historyData=it
	},
	// 手动关闭socket
	['CLOSESOCKET'](state){
		state.socketTask.close({
			success(res){
				state.socketIsOpen=false
				console.log("close ok!")
			},
			fail(err){
				console.log('close socket fail:'+err)
			}
		})
	},
	['RESETMARKET'](state){
		state.marketTitle=[]
		state.merketList=[]
		state.socketTask=null
		state.marketSocketList=[]
		state.socketIsOpen=false
		state.marketSocketList={}
		state.marketGoods={}
		state.historyData=[]
	}
}
