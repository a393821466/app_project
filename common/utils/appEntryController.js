import Vue from "vue"

/* 
 * APP入口页面控制器
 * 中心思想：动态入口解决方案 描述见：http://ask.dcloud.net.cn/question/63270
 */

class AppEntryController extends Vue {
	constructor(arg) {
		super();
	}
	// 处理H5端 直接通过地址栏访问地址的情况 需要鉴权
	handleH5BrowserAddressBarAuth() {
		// #ifdef H5
		let hashPath = window.location.hash.substr(1);
		hashPath = hashPath.split("?")[0];
		if (!/\/pages\//.test(hashPath)) return;
		for (let routeKey in this.$mRoutesConfig) {
			let route = this.$mRoutesConfig[routeKey];
			// 如果当前访问的路由是权限页面，判断登录状态
			if (route.path == hashPath) {
				if (route.requiresAuth && !this.$store.getters.hasLogin) {
					console.log("没有登录,无权进入")
					this.$mRouter.redirectTo({
						route: this.$mRoutesConfig.login,
						query: {

						}
					})
				}
				break;
			}
		}
		// #endif
	}
}

export default new AppEntryController()
