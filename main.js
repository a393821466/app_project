import Vue from 'vue'
import App from './App'
import store from './store'
import utils from './common/utils'
import routers from './common/router'
import mRouter from './common/router/router.config'
import chache from './common/utils/storage'
import $AppEntryController from './common/utils/appEntryController.js'
import './common/router/router_auth'

import fontsIcon from './components/ui-font/'
import HeaderView from './components/header/header.vue'
import FooterView from './components/footer/footer.vue'

Vue.config.productionTip = false

Vue.component('fonts-icon',fontsIcon)
Vue.component('footer-view',FooterView)
Vue.component('header-view',HeaderView)
// 挂载路由
Vue.prototype.$store=store
Vue.prototype.$routers = routers
Vue.prototype.$mRouter = mRouter
Vue.prototype.$AppEntryController = $AppEntryController

// store赋值给vue原型链
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()