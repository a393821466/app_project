import chache from '@/common/utils/storage'
export const state={
	userBalance:{},
	userAllBalance:[],
	bankList:[]
}


export const mutations={
	['GETMINE'](state,val){
		let filterMine=val.filter((item)=>item.walletType==1)
		state.userBalance=filterMine[0]
		state.userAllBalance=val.filter(item=>item.walletType!==4);
	},
	['GETBANKLIST'](state,val){
		state.bankList=val;
	},
	['RESETMY'](state){
		state.userBalance={}
		state.userAllBalance=[]
		state.bankList=[]
	}
}
