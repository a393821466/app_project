import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import chache from '@/common/utils/storage'
import {state} from './mutations'

export default{
	// 获取钱包余额
	async getMine({commit}){
		const getMoneyBagNum=await httpUtils.get(address.my.mine);
		if(!getMoneyBagNum){
			return
		}
		if(getMoneyBagNum.status){
			commit('GETMINE',getMoneyBagNum.data)
		}
		return getMoneyBagNum
	},
	// 获取账号银行卡列表
	async queryBank({commit},das){
		const params={
			data:das
		}
		const getBankList=await httpUtils.post(address.my.queryBank,params);
		if(getBankList.status){
			commit('GETMYBANKLIST',getBankList.data)
		}
		return getBankList
	},
	// 获取银行卡信息列表
	async getBankListInfo({commit},res){
		const findBankList=await httpUtils.get(address.common.findAllBankInfo,res);
		if(findBankList.status){
			commit('GETBANKLISTINFO',findBankList.data)
		}
		return findBankList;
	},
	// 添加银行卡
	async addmyBank({commit},res){
		const params={
			data:res
		}
		const addBank=await httpUtils.post(address.my.addBank,params);
		return addBank;
	},
	// 获取安全中心各项绑定状况
	async getUserBindInfo({commit}){
		const getBindInfo=await httpUtils.get(address.my.security);
		if(getBindInfo.status){
			commit('GETBINDINFO',getBindInfo.data)
		}
		return getBindInfo;
	},
	// 移除银行卡
	async delMyBank({commit},res){
		const deleteBank=await httpUtils.post(address.my.delBank,res);
		return deleteBank;
	},
	// 实名认证
	async bindRealNameStore({commit},res){
		const userRealName=await httpUtils.post(address.my.realName,res);
		return userRealName;
	},
	// 提现
	async withdraw({commit},res){
		const userWithdraw=await httpUtils.post(address.my.withdraw,res);
		return userWithdraw;
	},
	// 充值记录
	async getRecharRecord({commit},res){
		const getRecord=await httpUtils.get(address.my.rechargeRecord,res);
		if(getRecord.status){
			let das={
				record:getRecord.data.result,
				type:1
			}
			commit('RECHARGERECORD',das)
		}
		return getRecord;
	},
	// 追加充值记录
	async addRecharRecord({commit},res){
		const addRecord=await httpUtils.get(address.my.rechargeRecord,res);
		if(addRecord.status){
			let das={
				record:addRecord.data.result,
				type:2
			}
			commit('RECHARGERECORD',das)
		}
		return addRecord;
	},
	// 提现记录
	async withdrawRecordsList({commit},res){
		const getWithdrawRecord=await httpUtils.get(address.my.withdrawRecord,res);
		if(getWithdrawRecord.status){
			let das={
				withdraw:getWithdrawRecord.data.result,
				type:1
			}
			commit('WITHDRAWRECORD',das)
		}
		return getWithdrawRecord;
	},
	// 追加提现记录
	async addWithdrawRecordsList({commit},das){
		const addWithdrawRecord=await httpUtils.get(address.my.withdrawRecord,res);
		if(addWithdrawRecord.status){
			let das={
				withdraw:addWithdrawRecord.data.result,
				type:2
			}
			commit('WITHDRAWRECORD',das)
		}
		return addWithdrawRecord;
	},
	// 交易明细
	async getTradeRecordList({commit},res){
		const tradeRecord=await httpUtils.get(address.my.tradeRecord,res);
		if(tradeRecord.status){
			let das={
				record:tradeRecord.data.result,
				type:1
			}
			commit('TRADERECORD',das)
		}
		return tradeRecord;
	},
	// 交易明细类型
	async getTradeType({commit},res){
		const tradeTypeList=await httpUtils.get(address.my.tradeType);
		if(tradeTypeList.status){
			commit('TRADETYPELIST',tradeTypeList.data)
		}
		return tradeTypeList;
	},
	// 设置用户资料
	async setUserInfo({commit},res){
		const setUser=await httpUtils.post(address.my.setUserInfo,res);
		return setUser;
	},
	// 登出操作
	async logout({commit}){
		const logoutAction=await httpUtils.get(address.common.logout);
		return logoutAction;
	},
	// 移除store
	resetMy({commit}){
		commit('RESETMY')
	}
}