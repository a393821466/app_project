import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import chache from '@/common/utils/storage'
import {state} from './mutations'

export default{
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
	async addmyBank({commit},res){
		const params={
			data:res
		}
		const addBank=await httpUtils.post(address.my.addBank,params);
		return addBank;
	},
	async logout({commit}){
		const logoutAction=await httpUtils.get(address.common.logout);
		return logoutAction;
	},
	
	resetMy({commit}){
		commit('RESETMY')
	}
}