import {state} from './mutations'
 const getters={
	bannerData:state=>state.bannerData,
	actList:state=>state.actList,
	notice:state=>state.notice,
	temList:state=>state.temList,
	breakUrl:state=>state.breakUrl
}

export default getters