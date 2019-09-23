import http from './request.config';

// 发送请求前的拦截器
http.interceptor.request((config, cancel) => { 
    config.header = {
        ...config.header,
		Authorization:'null'
    }
	console.log('This is config:'+JSON.stringify(config));
    return config;
})

// 相应的拦截器
http.interceptor.response((response) => {
    console.log(response);
    return response;
}, (err) => {
       console.log(err);
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
	get:(url, options) => {
		options={
			params:{},
			header:{
			},
			dataType:'json'
		}
		return http.get(url, options)
	},
	// POST请求
	post:(url, params = {}) => {
		const {
			data,
			options
		} = params
		const config=mathQuery(options);
		return http.post({url:url,data:data,config});
	},
	// PUT请求
	put:(url, params = {})=>{
		const {
			data,
			options
		} = params
		const config=mathQuery(options);
		return http.put({url:url,data:data,config});
	},
	// DELETE请求
	del:(url,params={},config={})=>{
		const {
		  query
		} = params
		return http.delete({url:url,data:query,config});
	},
	// 上传
	upload:(url,name,filePath,formData)=>{
		return http.upload({url:url,name:name,filePath:filePath,formData:formData});
	},
	// 下载
	dowload:(url)=>{
		return http.dowload({url:url});
	}
}
