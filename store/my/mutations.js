import chache from '@/common/utils/storage'
export const state={
	userBalance:{},
	userAllBalance:[],
	myBankList:[],
	bankList:[],
	bindInfo:{},
	rechargeList:[],
	withdrawList:[],
	tradeMxList:[],
	tradeTypeList:[]
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
		// state.userAllBalance=val.filter(item=>item.walletType!==4);
		let banlances = val.map((item, idx) => {
		  if (item.walletType === 1) {
			item.name = '现金'
			item.oIndex = 0
		  }
		  if (item.walletType === 2) {
			item.name = '积分'
			item.oIndex = 1
		  }
		  if (item.walletType === 3) {
			item.name = '模拟'
			item.oIndex = 2
		  }
		  if (item.walletType === 5) {
			item.name = '佣金'
			item.oIndex = 3
		  }
		  return item
		})
		state.userAllBalance=banlances;
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
	['RECHARGERECORD'](state,val){
		if(val.type==1){
			state.rechargeList=val.record
		}else if(val.type==2){
			state.rechargeList=state.rechargeList.concat(val.record)
		}
	},
	['WITHDRAWRECORD'](state,val){
		if(val.type==1){
			state.withdrawList=val.withdraw
		}else if(val.type==2){
			state.withdrawList=state.withdrawList.concat(val.withdraw)
		}
	},
	['TRADERECORD'](state,val){
		if(val.type==1){
			state.tradeMxList=val.record
		}else if(val.type==2){
			if(val.pageNum==1) state.tradeMxList=[]
			state.tradeMxList=state.tradeMxList.concat(val.record)
		}
	},
	['TRADETYPELIST'](state,val){
		state.tradeTypeList=val
	},
	['RESETMY'](state){
		state.userBalance={}
		state.userAllBalance=[]
		state.myBankList=[]
		state.bankList=[]
		state.bindInfo={}
		state.rechargeList=[]
		state.withdrawList=[]
		state.tradeMxList=[]
		state.tradeTypeList=[]
	}
}
