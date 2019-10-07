import chache from '@/common/utils/storage'
export const state={
	className:'daytime',
	token:'' || chache.get('token'),
	merchantInfo:chache.get('merchantInfo'),
	loginKey:''
}

export const mutations={
	// 颜色
	['CLASSNAME'](state,val){
		state.className=val;
	},
	// 获取登录key
	['GETKEYS'](state,val){
		if(val.status){
			state.loginKey=val.data;
			chache.set('key',val.data)
		}
	},
	// 获取品牌信息
	['MERCHANT'](state,val){
		if(val.status){
			state.merchantInfo=val.data
			chache.set('merchantInfo',val.data)
		}
	},
	// 登录
	['LOGIN'](state,val){
		state.token=val.token;
		chache.set('token',val.token);
		chache.set('userInfo',val)
	},
	//重置state
	['RESETCOMMONSTATE'](state){
		state.token='';
		state.merchantInfo='';
		state.loginKey=''
	}
}

