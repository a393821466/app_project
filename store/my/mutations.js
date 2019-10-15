import chache from '@/common/utils/storage'
export const state={
	userBalance:{},
	userAllBalance:[],
	myBankList:[],
	bankList:[]
}


export const mutations={
	['GETMINE'](state,val){
		let filterMine=val.filter((item)=>item.walletType==1)
		state.userBalance=filterMine[0]
		state.userAllBalance=val.filter(item=>item.walletType!==4);
	},
	['GETMYBANKLIST'](state,val){
		state.myBankList=val;
	},
	['GETBANKLISTINFO'](state,val){
		let arr=[]
		val.forEach((item)=>{
			let data={
				id:item.id,
				value:item.bankCode,
				label:item.bankName
			}
			arr.push(data);
		})
		state.bankList=arr;
	},
	['RESETMY'](state){
		state.userBalance={}
		state.userAllBalance=[]
		state.myBankList=[]
		state.bankList=[]
	}
}
