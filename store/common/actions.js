import httpUtils from '@/common/http/http_service';
import address from '@/common/http/address.config'
import {state} from './mutations'

export default{
	appColor({commit},name){
		commit('CLASSNAME',name)
	},
}