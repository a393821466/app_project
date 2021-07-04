export const state={
	token:'',
	annountData:''
}

export const mutations={
	['ANNOUNT'](state,val){
		state.annountData=val.data.data.content;
	}
}

export const getters={
	annountData:state=>state.annountData
}
