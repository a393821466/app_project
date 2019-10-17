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
		const dats={
			params:res
		}
		const findBankList=await httpUtils.get(address.common.findAllBankInfo,dats);
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