/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $routers
 * 作用：调用$routerConfig对象的方法 传入以下对应的路由对象，详细见common/router目录下的routerConfig.js
 * 示例：this.$routers.push({route:this.$routerConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	// 权限路由
	trade: {
		name: "交易",
		path: "/pages/trade/trade",
		requiresAuth: true
	},
	my: {
		name: "我的",
		path: "/pages/my/my",
		requiresAuth: true
	},

	// 非权限路由
	index: {
		name: "首页",
		path: "/pages/index/index"
	},
	market: {
		name: "行情",
		path: "/pages/market/market"
	},
	marketList:{
		name: "行情列表",
		path: "/pages/market/marketList/marketList"
	},
	marketDetail:{
		name: "行情详情",
		path: "/pages/market/marketChart/marketChart"
	},
	news: {
		name: "资讯",
		path: "/pages/news/news"
	},
	login: {
		name: "登录",
		path: "/pages/userAuth/login"
	},
	register: {
		name: "注册",
		path: "/pages/userAuth/register",
		requiresAuth: true
	},
	webViewUi: {
		name: "客服或活动",
		path: "/pages/webViewUi/webViewUi",
		requiresAuth: true
	},
	notice: {
		name: "公告",
		path: "/pages/annount/annount"
	},
	/*个人中心*/
	myBlance: {
		name: "钱包",
		path: "/pages/my/userCenter/myBalance/myBalance"
	},
	setting: {
		name: "设置",
		path: "/pages/my/userCenter/setting/setting"
	},
	bank: {
		name: "银行卡",
		path: "/pages/my/userCenter/bank/bank"
	},
	addBank: {
		name: "添加银行卡",
		path: "/pages/my/userCenter/addBank/addBank"
	},
	securityCenter: {
		name: "安全中心",
		path: "/pages/my/userCenter/securityCenter/securityCenter"
	},
	realName: {
		name: "实名认证",
		path: "/pages/my/userCenter/realName/realName"
	},
	withdraw: {
		name: "提现",
		path: "/pages/my/userCenter/withdraw/withdraw"
	},
	withdrawSuccess:{
		name: "提现申请",
		path: "/pages/my/userCenter/withdraw/withdrawSuccess/withdrawSuccess"
	},
	rechargeRecord:{
		name: "充值记录",
		path: "/pages/my/userCenter/rechargeRecord/rechargeRecord"
	},
	withdrawRecord:{
		name: "提现记录",
		path: "/pages/my/userCenter/withdrawRecord/withdrawRecord"
	},
	tradeRecord:{
		name: "交易记录",
		path: "/pages/my/userCenter/tradeRecord/tradeRecord"
	},
	/* 设置 */
	setUser:{
		name: "设置个人资料",
		path: "/pages/my/userCenter/setting/setUserInfo/setUserInfo"
	},
	setLoginPassword:{
		name: "设置登陆密码",
		path: "/pages/my/userCenter/setting/setLoginPassword/setLoginPassword"
	},
	setFundsPassword:{
		name: "设置资金密码",
		path: "/pages/my/userCenter/setting/setFundsPassword/setFundsPassword"
	},
	fontSizePage:{
		name: "字体大小",
		path: "/pages/my/userCenter/setting/fontSizePage/fontSizePage"
	}
}
