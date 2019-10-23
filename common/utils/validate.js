// 验证用户名格式
export function isUsername(str) {
	const userRegexp = /^[a-zA-Z0-9_-]{5,16}$/
	return userRegexp.test(str.trim())
}
// 验证手机格式
export function isPhone(str) {
	const phoneRegexp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	return phoneRegexp.test(str)
}
// 验证密码格式
export function isPssword(str) {
	const userRegexp = /^[a-zA-Z0-9_-]{6,16}$/
	return userRegexp.test(str)
}

// 验证中文姓名+特殊字符
export function isRealName(str) {
	const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
	return reg.test(str)
}

// 验证邮箱
export function isEmail(str) {
	const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	return reg.test(str)
}

// 验证身份证号
export function isCardNo(str) {
	const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
	return reg.test(str)
}
