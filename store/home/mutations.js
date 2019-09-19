export const state={
	token:'',
	annount:[]
}

export const mutations={
	['ANNOUNT'](state,val){
		state.annount=val.data.data.content
	}
}

