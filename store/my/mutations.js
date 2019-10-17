import chache from '@/common/utils/storage'
export const state={
	userBalance:{},
	userAllBalance:[],
	myBankList:[],
	bankList:[],
	bindInfo:{}
}


export const mutations={
	['GETMINE'](state,val){
		let filterMine=val.filter((item)=>item.walletType==1)
		let formartAmount={
			balance:filterMine[0].balance==0?'0':filterMine[0].balance.toFixed(2),
			amountUseable:filterMine[0].amountUseable==0?'0':filterMine[0].amountUseable.toFixed(2),
			amountFrozen:filterMine[0].amountFrozen==0?'0':filterMine[0].amountFrozen.toFixed(2)
		}
		state.userBalance=formartAmount
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
	['GETBINDINFO'](state,val){
		val.isPhone=1;
		let countScore=100;
		let num=0;
		let count=0;
		let lastSum=0;
		for(var i in val){
			count++;
			if(val[i]==1){
				num++;
			}
		}
		lastSum=(countScore/count)*num;
		val.surplus=lastSum;
		state.bindInfo=val;
	},
	['RESETMY'](state){
		state.userBalance={}
		state.userAllBalance=[]
		state.myBankList=[]
		state.bankList=[]
		state.bindInfo={}
	}
}
