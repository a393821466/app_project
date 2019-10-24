import chache from '@/common/utils/storage'
import utils from '@/common/utils'
export const state={
	className:'daytime',
	stateText:'',
	token:'' || chache.get('token'),
	merchantInfo:chache.get('merchantInfo'),
	loginKey:'',
	userInfo:chache.get('userInfo'),
	verifyImg:'',
	timeList: []
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
		state.userInfo=val
		chache.set('userInfo',val)
	},
	// 加载...
	['ONLOADSTATE'](state,text){
		state.stateText=text;
	},
	// 图形验证码
	['VERIFYIMG'](state,val){
		state.verifyImg=val.data
	},
	['GETTIMELIST'](state){
		let list = []
		let das = {}
		let oneDay = utils.formartNow('0', Date.now()) + ' ' + '23:59:59'
		for (let i = 1; i <= 3; i++) {
		  if (i === 1) {
			das = {
			  startTimes: utils.getBeforeNow(1, new Date()),
			  endTimes: new Date(oneDay).toISOString(),
			  name: '当天',
			  date: 1,
			  status: 0
			}
			list = list.concat(das)
		  }
		  if (i === 2) {
			das = {
			  startTimes: utils.getBeforeNow(7, new Date()),
			  endTimes: new Date(oneDay).toISOString(),
			  name: '一周',
			  date: 7,
			  status: 1
			}
			list = list.concat(das)
		  }
		  if (i === 3) {
			das = {
			  startTimes: utils.getBeforeNow(30, new Date()),
			  endTimes: new Date(oneDay).toISOString(),
			  name: '一个月',
			  date: 30,
			  status: 2
			}
			list = list.concat(das)
		  }
		}
		state.timeList = list
	},
	//重置state
	['RESETCOMMONSTATE'](state){
		state.token='';
		state.merchantInfo='';
		state.loginKey='';
		state.userInfo={};
	}
}

