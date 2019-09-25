import Vue from 'vue'
import App from './App'
import minRouter from './common/router'
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'

import store from './store'
Vue.config.productionTip = false

// 注册路由组件
Vue.component('router-link',routerLink)

// store赋值给vue原型链
Vue.prototype.$store=store;
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()