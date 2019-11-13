import chache from '@/common/utils/storage'
export const state={
	socketTask:null,
	socketIsOpen:false,
	marketTitle:[],
	marketList:[],
	marketSocketList:[]
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
		state.socketTask=uni.connectSocket({
			url:u,
			success(data){
				console.log('websocket连接成功')
			}
		})
	},
	// 保证socket打开
	['SOCKETISOPEN'](state,flat){
		state.socketIsOpen=flat
	},
	// 获取行情数据
	['GETMARKETDATA'](state,it){
		state.marketSocketList=it
	},
	// 手动关闭socket
	['CLOSESOCKET'](state){
		state.socketTask.close({
			success(res){
				state.socketIsOpen=false
				console.log("关闭成功:"+JSON.stringify(res))
			},
			fail(err){
				console.log('关闭socket失败:'+err)
			}
		})
	},
	['RESETMARKET'](state){
		state.marketTitle=[]
		state.merketList=[]
		state.socketTask=null
		state.marketSocketList=[]
		state.socketIsOpen=false
	}
}
