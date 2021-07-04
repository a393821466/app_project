import {state} from './mutations'
 const getters={
	className:state=>state.className,
	token:state=>state.token,
	merchantInfo:state=>state.merchantInfo,
	loginKey:state=>state.loginKey
}

export default getters