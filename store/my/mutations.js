import chache from '@/common/utils/storage'
export const state={
	userBalance:{}
}


export const mutations={
	['GETMINE'](state,val){
		let filterMine=val.filter((item)=>item.walletType==1)
		state.userBalance=filterMine[0]
	},
	['RESETMY'](state){
		state.userBalance={}
	}
}
