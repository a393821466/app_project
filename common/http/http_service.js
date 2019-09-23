import http from './request.config';
import chache from '../utils/storage'
import store from '@/store'
import {
	showUiToast,
	appToast
} from '../utils/dialog.config'
let n = 0;
// 发送请求前的拦截器
http.interceptor.request((config, cancel) => {
	config.header = {
		...config.header
	}
	if (store.state.homeStore.token !== '' || chache.has('token')) {
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
			reqError(res.msg)
			return
		}
		if (!res.msg) {
			return
		}
		errToast(res.msg)
	}
	return Promise.resolve(res)
}, (err) => {
	if (err.errMsg == 'request:fail timeout') {
		errToast(apiUrl[err.config.url] + '请求超时')
	}
	uni.stopPullDownRefresh();
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
	'/console/subsystem/announce': '公告',
	'/getHomeTemplate': '套餐'
}

// token失效的时候做的事情
const reqError = (msg) => {
	errToast(msg) 
	chache.clear()
	uni.reLaunch('pages/index/index')
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
		headers: {}
	}
	if (options) {
		newOptions.headers = Object.assign(options.headers, {
			'Content-Type': options.headers['Content-Type'] || 'application/json'
		})
	} else {
		newOptions.headers = {
			'Content-Type': 'application/json'
		}
	}
	return newOptions
}

export default {
	// GET请求
	get: (url, options) => {
		options = {
			params: {},
			header: {},
			dataType: 'json'
		}
		return http.get(url, options)
	},
	// POST请求
	post: (url, params = {}) => {
		const {
			data,
			options
		} = params
		const config = mathQuery(options);
		return http.post({
			url: url,
			data: data,
			config
		});
	},
	// PUT请求
	put: (url, params = {}) => {
		const {
			data,
			options
		} = params
		const config = mathQuery(options);
		return http.put({
			url: url,
			data: data,
			config
		});
	},
	// DELETE请求
	del: (url, params = {}, config = {}) => {
		const {
			query
		} = params
		return http.delete({
			url: url,
			data: query,
			config
		});
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
