import http from './request.config';

let basicUrl=''
if(process.env.NODE_ENV==='development'){
	// #ifdef H5
	basicUrl='/apis'
	// #endif
	
	// #ifndef H5
	basicUrl='https://tmk.rvsii.com/apis'
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
		merchant: `/console/subsystem/merchant`,
		announce: `/console/subsystem/announce`,
		templateBox: `/getHomeTemplate`,
		getPublicKey: `/getPublicKey`,
		login: `/login`,
		logout: `/logout`,
		verifyImg: `/verifyImg`,
		register: `/accountOpen`
	}
}