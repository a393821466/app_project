import {
	state
} from './mutations'
const getters = {
	marketTitle:state=>state.marketTitle,
	marketList:state=>state.marketList,
	socketTask:state=>state.socketTask,
	marketSocketList:state=>state.marketSocketList,
	marketGoods:state=>state.marketGoods,
	historyData:state=>state.historyData,
	marketDetails:state=>state.marketDetails
}

export default getters
