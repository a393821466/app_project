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
	reg: {
		name: "行情",
		path: "/pages/market/market"
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
	notice:{
		name:"公告",
		path:"/pages/annount/annount"
	},
	myBlance:{
		name:'钱包',
		path:"/pages/my/userCenter/myBalance/myBalance"
	},
	setting:{
		name:'设置',
		path:"/pages/my/userCenter/setting/setting"
	},
	bank:{
		name:'银行卡',
		path:"/pages/my/userCenter/bank/bank"
	},
	addBank:{
		name:'添加银行卡',
		path:"/pages/my/userCenter/addBank/addBank"
	},
	securityCenter:{
		name:'安全中心',
		path:"/pages/my/userCenter/securityCenter/securityCenter"
	}
}
