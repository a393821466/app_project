import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import {state} from './mutations'

export default{
	async getNotice({commit}){
		const res=await httpUtils.get(address.common.announce);
		commit('NOTICE',res)
		return res;
	},
	async getTemplate({commit}){
		const res=await httpUtils.get(address.common.templateBox);
		commit('TEMPLATELIST',res)
		return res;
	}
}