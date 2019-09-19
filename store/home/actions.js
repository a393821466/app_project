import httpUtils from '../../config/http_service';
import address from '../../config/address.config'
import {state} from './mutations'

export default{
	getAnnount:({commit})=>{
		httpUtils.get(address.common.announce).then(res=>{
			commit('ANNOUNT',res)
		})
	}
}