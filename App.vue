<script>
	import Vue from 'vue'
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		name: 'App',
		computed: {
			/*
			** 公告，模板数据
			*/
			...mapGetters(['className']),
		},
		watch:{
			className(n,o){
				console.log(n)
			}
		},
		onLaunch: function() {
		// 	uni.getSystemInfo({
		// 		success: function(e) {
		// 			Vue.prototype.statusBar = e.statusBarHeight
		// 			// #ifndef MP
		// 			if (e.platform == 'android') {
		// 				Vue.prototype.customBar = e.statusBarHeight + 50
		// 				Vue.prototype.customFooter=e.statusBarHeight+40
		// 			} else {
		// 				Vue.prototype.customBar = e.statusBarHeight + 45
		// 				Vue.prototype.customFooter=e.statusBarHeight+40
		// 			}
		// 			// #endif
		// 
		// 			// #ifdef MP-WEIXIN
		// 			let custom = wx.getMenuButtonBoundingClientRect()
		// 			Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
		// 			// #endif
		// 
		// 			// #ifdef MP-ALIPAY
		// 			Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
		// 			// #endif
		// 			
		// 			// #ifdef H5
		// 			Vue.prototype.customBar = e.statusBarHeight+45
		// 			Vue.prototype.customFooter=e.statusBarHeight+55
		// 			// this.$AppEntryController.handleH5BrowserAddressBarAuth();
		// 			// #endif
		// 			// Vue.prototype.phoneHeight=e.windowHeight-(Vue.prototype.customBar+Vue.prototype.customFooter);
		// 		}
		// 	})
		},
		onShow() {
			console.log(111);
		}
	}
</script>

<style lang='scss'>
	@import "./common/style/daytime.scss";
	@import "./common/style/evening.scss";
</style>
