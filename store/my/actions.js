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
			commit('GETBANKLIST',getBankList.data)
		}
		return getBankList
	},
	resetMy({commit}){
		commit('RESETMY')
	},
	async logout({commit}){
		const logoutAction=await httpUtils.get(address.common.logout);
		return logoutAction;
	}
	
}