import httpUtils from '../../config/http_service';
import address from '../../config/address.config'
import {state} from './mutations'

export default{
	async getNotice({commit}){
		const res=await httpUtils.get(address.common.announce);
		commit('NOTICE',res.data)
		return res;
	},
	async getTemplate({commit}){
		const res=await httpUtils.get(address.common.templateBox);
		commit('TEMPLATELIST',res.data)
		return res;
	}
}