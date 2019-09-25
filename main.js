import Vue from 'vue'
import App from './App'
import utils from './common/utils'
import routers from './common/router'
import mRouter from './common/router/router.config'
// import './common/router/router_auth'
import chache from './common/utils/storage'
import $AppEntryController from './common/utils/appEntryController.js'
import store from './store'
Vue.config.productionTip = false

// 挂载路由
Vue.prototype.$store=store;
Vue.prototype.$routers = routers;
Vue.prototype.$mRouter = mRouter;
Vue.prototype.$AppEntryController = $AppEntryController;


mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));
	if (to.route.path === routers.login.path && chache.get('token')) {
		uni.redirectTo({
			url: utils.objParseUrlAndParam(routers.index.path, to.query)
		})
		return;
	}
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (chache.get('token')) {
			// 已经登录
			uni[navType]({
				url: utils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (chache.get('token')) {
				uni.redirectTo({
					url: utils.objParseUrlAndParam(routers.login.path, query)
				})
			} else {
				uni.navigateTo({
					url: utils.objParseUrlAndParam(routers.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: utils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})
// store赋值给vue原型链
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()