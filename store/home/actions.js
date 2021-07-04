import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import {state} from './mutations'

export default{
	async getBannerActivity({commit}){
		const res=await httpUtils.get(address.common.carouselMap);
		if(res.status){
			commit('BANNERACTIVITY',res.data)
		}
		return res;
	},
	async getNotice({commit}){
		const res=await httpUtils.get(address.common.announce);
		if(res.status){
			commit('NOTICE',res)
		}
		return res;
	},
	async getTemplate({commit}){
		const res=await httpUtils.get(address.common.templateBox);
		commit('TEMPLATELIST',res)
		return res;
	},
	sendUrl: ({commit}, url) => {
		commit('BIMGURL', url)
    },
	resetHomeState:({commit})=>{
		commit('RESETHOMESTATE')
	}
}