import httpUtils from '../../config/http_service.js';
import {state} from './mutations'

export default{
	getAnnount:({commit})=>{
		httpUtils.get('https://tmk.rvsii.com/apis/console/subsystem/announce').then(res=>{
			commit('ANNOUNT',res)
		})
	}
}