import http from './request.config';
import config from '../utils/config'
let basicUrl=''
if(process.env.NODE_ENV==='development'){
	// #ifdef APP-PLUS
		basicUrl='https://tmk.eanjee.com/apis'
	// #endif
	
	// #ifndef APP-PLUS
		basicUrl='/apis'
	// #endif
}else{
	// #ifdef APP-PLUS
		basicUrl='https://tmk.eanjee.com/apis'
	// #endif
	
	// #ifndef APP-PLUS
		basicUrl='/apis'
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
		register: `/accountOpen`, // 注册开户
		findAllBankInfo: `/finance/bank/find`, // 查找银行卡列表
		sendCode: `/sendMsg`, // 手机验证码
		setPass: `/business/setPass`, // 设置登陆密码
		setFundPass: `/business/setFundPass` // 设置资金密码
	},
	my:{
		mine: `/trade/wallet/find/mine`, // 钱包余额
		regBag: `/trade/wallet/redBag/find`,  // 红包
		queryBank: `/business/queryBankInfo`, // 查找银行卡
		addBank: `/business/addBank`, //添加银行卡
		delBank: `/business/closeBank`, //移除银行卡
		security: `/user/userInfo/checkUserInfo`, // 安全中心
		realName: `/business/userVerified`, // 实名认证
		withdraw: `/business/withdraw`, // 提现
		setUserInfo: `/business/addUserDetial`, // 设置用户资料
		rechargeRecord: `/finance/deposit/find/page`, //充值记录
		withdrawRecord: `/finance/withdraw/find/page`, //提现记录
		tradeRecord: `/trade/flow/find/page`, // 交易明细
		tradeType: `/trade/tradeType/find` // 交易明细类型
	},
	marketTrade:{
		marketList: `/business/getQuotaList`, // 行情列表
		marketDetail: `/business/getQuotaInfo` ,// 单个行情品种详情
	}
}