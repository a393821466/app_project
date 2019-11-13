import {
	state
} from './mutations'
const getters = {
	marketTitle:state=>state.marketTitle,
	marketList:state=>state.marketList,
	socketTask:state=>state.socketTask,
	marketSocketList:state=>state.marketSocketList
}

export default getters
