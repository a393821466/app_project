import Vue from 'vue'
import App from './App'
import store from './store'
import utils from './common/utils'
import routers from './common/router'
// import mRouter from './common/router/router.config'
// import chache from './common/utils/storage'
import $AppEntryController from './common/utils/appEntryController.js'
import './common/router/router_auth'

import fontsIcon from './components/ui-font/'
import './static/js/marketMq.js'
Vue.config.productionTip = false

Vue.component('fonts-icon',fontsIcon)
// 挂载路由
Vue.prototype.$store=store
// Vue.prototype.$routers = routers
// Vue.prototype.$mRouter = mRouter
Vue.prototype.$market=proto
Vue.prototype.$AppEntryController = $AppEntryController

// store赋值给vue原型链
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()