import Vue from 'vue'
import App from './App'
import MinRouter from './common/router/router.config'
import minRouter from './common/router'
import pageLink from './components/page-link/page-link.vue'
import store from './store'
Vue.config.productionTip = false

// 注册路由配置
Vue.use(MinRouter)

// 注册路由组件
Vue.component('page-link',pageLink)

// store赋值给vue原型链
Vue.prototype.$store=store;
App.mpType = 'app'
const app = new Vue({
    ...App,
	minRouter,
	store
})
app.$mount()
