import {state} from './mutations'
 const getters={
	 userBalance:state=>state.userBalance,
	 userAllBalance:state=>state.userAllBalance,
	 myBankList:state=>state.myBankList,
	 bankList:state=>state.bankList,
	 bindInfo:state=>state.bindInfo
}

export default getters