import {state} from './mutations'
 const getters={
	 userBalance:state=>state.userBalance,
	 userAllBalance:state=>state.userAllBalance,
	 bankList:state=>state.bankList
}

export default getters