import CryptoJS from 'crypto-js'
// // rsa加密库
import JSEncrypt from '../jsencrypt/wx_rsa'
class Tools {
	// 随机生成字符串
	ramdomString(len){
		const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		let nums = ''
		for (let i = 0; i < len; i++) {
		  const r = parseInt(Math.random() * 61)
		  nums += data[r]
		}
		return nums
	}
	//加密
	encrypt (data, key) {
	    let keys = CryptoJS.enc.Latin1.parse(key)
	    let ivs = CryptoJS.enc.Latin1.parse('123456789abcdef0')
	    let encrypted = CryptoJS.AES.encrypt(data, keys, {
	      iv: ivs,
	      mode: CryptoJS.mode.CBC,
	      padding: CryptoJS.pad.ZeroPadding
	    })
	    return encrypted.toString()
	 }
	//解码
	decrypt (word, key) {
		let keys = CryptoJS.enc.Latin1.parse(key)
		let ivs = CryptoJS.enc.Latin1.parse('123456789abcdef0')
		let decrypt = CryptoJS.AES.decrypt(word, keys, {
		  iv: ivs,
		  mode: CryptoJS.mode.CBC,
		  padding: CryptoJS.pad.ZeroPadding
		}).toString(CryptoJS.enc.Utf8)
		return decrypt
	}
	// rsa加密
	rsaEncrypt (publicKey, data) {
		var jse = new JSEncrypt()
		jse.setPublicKey(publicKey)
		return jse.encrypt(data)
	}
	// 对象拷贝
	deepCopy(p,c){
		 c=c || {};
		for(let i in p){
			if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {};
				deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}
	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	}
	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	}
	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
}


let utils=new Tools()

export default utils;