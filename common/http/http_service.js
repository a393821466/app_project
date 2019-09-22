import request from '@/components/pocky-request/index.js';
const instance=new request();
instance.interceptors.scoped.request.use(config => {
	console.log('📑 request config: ', config)
	
	return config;
	// return false;
},err=>{
	Promise.reject(err)
})

// 局部响应拦截器
instance.interceptors.scoped.response.use((res, config) => {
	console.log('is scoped response')

	return res;
	// return false;
	// return Promise.reject('xxx')
}, err => {
	console.error('scoped response: ', err)

	return Promise.reject(err)
});

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
	get:(url, params = {}) => {
		const {
		  query,
		  options
		} = params
		return instance.get({url:url,data:query,options});
	},
	// POST请求
	post:(url, params = {}) => {
		const {
			data,
			options
		} = params
		const config=mathQuery(options);
		return instance.post({url:url,data:data,config});
	},
	// PUT请求
	put:(url, params = {})=>{
		const {
			data,
			options
		} = params
		const config=mathQuery(options);
		return instance.put({url:url,data:data,config});
	},
	// DELETE请求
	del:(url,params={},config={})=>{
		const {
		  query
		} = params
		return instance.delete({url:url,data:query,config});
	},
	// 上传
	upload:(url,name,filePath,formData)=>{
		return instance.upload({url:url,name:name,filePath:filePath,formData:formData});
	},
	// 下载
	dowload:(url)=>{
		return instance.dowload({url:url});
	}
}
