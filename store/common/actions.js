import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import chache from '@/common/utils/storage'
import {state} from './mutations'

export default{
	// 颜色
	appFontSize({commit},name){
		commit('THEMEFONTSIZE',name)
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
	// 获取验证码
	async getVerifyImg({commit}){
		let verifyImg=await httpUtils.get(address.common.verifyImg);
		if(verifyImg.status){
			commit('VERIFYIMG',verifyImg)
		}
		return verifyImg;
	},
	// 获取手机验证码
	async sendVerifyCode({commit},das){
		let merchant=chache.get('merchantInfo');
		const data={
			phone:das.phone,
			imgCode:das.imgCode,
			templateType:das.templateType,
			merchantCode:merchant.merchantCode
		}
		let sendCode=await httpUtils.post(address.common.sendCode+'?imgCode='+das.imgCode,{data:das});
		return sendCode;
	},
	// 设置登陆密码
	async setPassword({commit},das){
		const uuid = chache.get('userInfo')
		  ? chache.get('userInfo').uuid
		  : '';
		const merchantCode = chache.get('userInfo')
		  ? chache.get('userInfo').merchantCode
		  : '';
		let params={
		    phone: das.phone,
		    merchantCode: merchantCode,
		    templateType: das.templateType, // '2' or '3'
		    userId: uuid,
		    pass: das.password,
		    msgCode:das.phoneCode
		}
		const setPwd=await httpUtils.post(address.common.setPass,{data:params});
		return setPwd;
	},
	// 设置支付密码
	async setFundsPassword({commit},das){
		const uuid = chache.get('userInfo')
		  ? chache.get('userInfo').uuid
		  : '';
		const merchantCode = chache.get('userInfo')
		  ? chache.get('userInfo').merchantCode
		  : '';
		const params = {
		  phone: das.phone,
		  merchantCode: merchantCode,
		  templateType: das.templateType,
		  userId: uuid,
		  fundpass: das.password,
		  msgCode: das.phoneCode
		}
		const setFundsPwd=await httpUtils.post(address.common.setFundPass,{data:params});
		return setFundsPwd;
	},
	// 日期
	getTimeList: ({
		commit
	  }) => {
		commit('GETTIMELIST')
	},
	// 改变加载状态
	onLoadState({commit},stateText){
		commit('ONLOADSTATE',stateText)
	},
	// 移除
	resetCommonState({commit}){
		commit('RESETCOMMONSTATE')
	}
}