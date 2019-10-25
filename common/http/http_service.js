import http from './request.config'
import utils from '../utils'
import chache from '../utils/storage'
import store from '@/store'

import {
	showUiModel,
	showUiToast,
	appToast
} from '../utils/dialog.config'
let n = 0;
// 发送请求前的拦截器
http.interceptor.request((config, cancel) => {
	config.header = {
		...config.header
	}
	store.dispatch('onLoadState','开始请求')
	if (store.state.homeStore.token || chache.has('token')) {
		let token = !store.state.homeStore.token ? chache.get('token') : store.state.homeStore.token;
		config.header['Authorization'] = token;
	} else {
		config.header['Authorization'] = 'null';
	}
	return config;
}, error => {
	uni.stopPullDownRefresh();
	Promise.reject(error)
})

// 相应的拦截器
http.interceptor.response((response) => {
	let res = response.data;
	if (res.status === false) {
		if (res.errorCode === 'LOGIN_INVALID') {
			showUiModel({'content':res.msg,'showCancel':true},(e)=>{
				if(e.confirm){
					uni.navigateTo({
						url:'/pages/userAuth/login'
					})
				}
				store.dispatch('resetCommonState')
				store.dispatch('resetHomeState')
				store.dispatch('resetMy')
				chache.clear()
			})
			return
		}
		if (!res.msg) {
			return
		}
		errToast(res.msg)
	}
	store.dispatch('onLoadState','请求完成')
	return Promise.resolve(res)
}, (err) => {
	if (err.errMsg == 'request:fail timeout') {
		let msg=!apiUrl[err.config.url]?'请求超时':`${apiUrl[err.config.url]}超时`
		errToast(msg)
	}
	uni.stopPullDownRefresh();
	store.dispatch('onLoadState','请求失败')
	return err;
})

// 验证器
http.validateStatus = (response) => {
	console.log(response);
	return response.statusCode === 200
}

http.validateStatus = (response) => {
	/** http 状态码为200 并且服务器返回状态码也是200， 则进入响应拦截器响应成功函数和http.get().then(() => {满足条件进入这里}).catch(() => {没有满足进入这里}) */
	return response.statusCode === 200 && response.data.code === 200
}

http.validateStatus = (response) => {
	return response.statusCode >= 200 && response.statusCode < 300
}

// 针对API提示错误
const apiUrl = {
	'/console/subsystem/merchant':'获取品牌信息',
	'/console/subsystem/announce': '获取公告',
	'/getHomeTemplate': '获取套餐',
	'/getPublicKey':'获取密钥',
	'/login':'登录',
	'/register':'注册',
	'/verifyImg':'验证码',
	'/trade/wallet/find/mine':'获取钱包余额',
	'/trade/wallet/redBag/find':'获取红包'
}

// token失效的时候做的事情
const reqError = (msg) => {
	errToast(msg)
	// setTimeout(()=>{
	// 	uni.reLaunch({
	// 		url: '/pages/userAuth/login'
	// 	})
	// },2000)
}
// 轻弹
const errToast = (title) => {
	// #ifndef APP-PLUS
	showUiToast(title)
	// #endif

	// #ifdef APP-PLUS
	appToast(title)
	// #endif
}

const mathQuery = options => {
	const newOptions = {
		header: {}
	}
	if (options) {
		newOptions.header = Object.assign(options.header, {
			'Content-Type': options.header['Content-Type'] || 'application/json'
		})
	} else {
		newOptions.header = {
			'Content-Type': 'application/json'
		}
	}
	return newOptions
}

export default {
	// GET请求
	get: (url, query, options) => {
		options = {
			header: {},
			dataType: 'json'
		}
		let queryString = ''
		if (query) {
		  queryString = utils.objParseUrlAndParam(url,query)
		} else {
		  queryString = url
		}
		return http.get(queryString,options)
	},
	// POST请求
	post: (url, params = {}) => {
		const {
			data
		} = params
		let das = typeof data === 'string' ? data : JSON.stringify(data)
		let key = store.getters.key || chache.get('key')
		let ramdom=utils.ramdomString(16)
		let aesPass=utils.encrypt(das,ramdom)
		let rsaPass=utils.rsaEncrypt(key,ramdom)
		let opt={
			header:{
				'Content-Type': 'application/json; charset=UTF-8',
				'key': rsaPass,
				'merchantCode': !chache.get('merchantInfo') ? '' : chache.get('merchantInfo').merchantCode
			}
		}
		const config = mathQuery(opt);
		return http.post(url,aesPass,config);
	},
	// PUT请求
	put: (url, params = {}) => {
		const {
			data
		} = params
		let das = typeof data === 'string' ? data : JSON.stringify(data)
		let key = store.getters.key || chache.get('key')
		let ramdom=utils.ramdomString(16)
		let aesPass=utils.encrypt(das,ramdom)
		let rsaPass=utils.rsaEncrypt(key,ramdom)
		let opt={
			header:{
				'Content-Type': 'application/json; charset=UTF-8',
				'key': rsaPass,
				'merchantCode': !chache.get('merchantInfo') ? '' : chache.get('merchantInfo').merchantCode
			}
		}
		const config = mathQuery(opt);
		return http.put(url,aesPass,config);
	},
	// DELETE请求
	del: (url, options) => {
		const {
			query
		} = params
		options = {
			params: {},
			header: {},
			dataType: 'json'
		}
		return http.delete(url, options);
	},
	// 上传
	upload: (url, name, filePath, formData) => {
		return http.upload({
			url: url,
			name: name,
			filePath: filePath,
			formData: formData
		});
	},
	// 下载
	dowload: (url) => {
		return http.dowload({
			url: url
		});
	}
}
