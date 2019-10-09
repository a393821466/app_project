import http from './request.config';

let basicUrl=''
if(process.env.NODE_ENV==='development'){
	// #ifdef H5
	basicUrl='/apis'
	// #endif
	
	// #ifndef H5
	basicUrl='http://cxx.99qupai.com/apis'
	// #endif
}else{
	// #ifdef H5
	basicUrl='/apis'
	// #endif
	
	// #ifndef H5
	basicUrl='https://tmk.rvsii.com/apis'
	// #endif
}

// 设置http请求地址
http.setConfig((config) => { /* config 为默认全局配置*/
    config.baseUrl = basicUrl /* 根域名 */
    config.header = {
		'Content-Type': 'application/json;charset=utf-8'
	}
    return config
})

export default{
	common:{
		merchant: `/console/subsystem/merchant`, // 品牌信息
		carouselMap:`/console/subsystem/carouselMap`, // 轮播与活动
		announce: `/console/subsystem/announce`, // 公告
		templateBox: `/getHomeTemplate`, // 套餐
		getPublicKey: `/getPublicKey`, //登录key
		login: `/login`, //登录
		logout: `/logout`, // 登出
		verifyImg: `/verifyImg`, // 验证码
		register: `/accountOpen` // 注册开户
	},
	my:{
		mine: `/trade/wallet/find/mine`, // 钱包余额
		regBag: `/trade/wallet/redBag/find`  // 红包
	}
}