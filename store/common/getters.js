import {
	state
} from './mutations'
const getters = {
	className: state => state.className,
	token: state => state.token,
	merchantInfo: state => state.merchantInfo,
	loginKey: state => state.loginKey,
	userInfo: state => state.userInfo,
	stateText: state => state.stateText,
	verifyImg: state => state.verifyImg
}

export default getters
