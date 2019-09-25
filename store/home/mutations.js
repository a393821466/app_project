export const state={
	notice:[],
	temList:[]
}

export const mutations={
	['NOTICE'](state,val){
		if(val.status){
			state.notice=val.data.content
		}
	},
	['TEMPLATELIST'](state,val){
		if(val.status){
			state.temList=val.data
		}
	}
}

