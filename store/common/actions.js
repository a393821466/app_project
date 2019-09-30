import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import chache from '@/common/utils/storage'
import {state} from './mutations'

export default{
	// 颜色
	appColor({commit},name){
		commit('CLASSNAME',name)
	},
	// 获取登录Key
	async getKey({commit}){
		let key=await httpUtils.get(address.common.getPublicKey);
		commit('GETKEYS',key)
		return key;
	},
	// 获取品牌信息
	async getMerchant({commit}){
		if(!chache.has('merchantInfo')){
			let merchant=await httpUtils.get(address.common.merchant);
			commit('MERCHANT',merchant)
			return merchant;
		}
	},
	// 登录
	async loginApp({commit},userInfo){
		let merchantCode=chache.get('merchantInfo').merchantCode;
		const das = {
		  userPhone: userInfo.username.trim(),
		  userPass: userInfo.password,
		  merchantCode: merchantCode
		}
		let loginUser=await httpUtils.post(address.common.login,{data:das});
		if(loginUser.status){
			commit('LOGIN',loginUser.data)
		}
		return loginUser;
	},
	resetState({commit}){
		commit('RESETSTATE')
	}
}