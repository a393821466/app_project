import Vue from 'vue'
import Vuex from 'vuex'

import homeStore from './home/'
import commonStore from './common/'
import myStore from './my'

Vue.use(Vuex)


export default new Vuex.Store({
	modules:{
		homeStore,
		commonStore,
		myStore
	}
})