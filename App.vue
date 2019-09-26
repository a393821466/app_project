<script>
	import Vue from 'vue'
	export default {
		name: 'App',
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.statusBar = e.statusBarHeight
					// #ifndef MP
					if (e.platform == 'android') {
						Vue.prototype.customBar = e.statusBarHeight + 50
					} else {
						Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif
		
					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect()
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif
		
					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
					
					// #ifdef H5
					Vue.prototype.customBar = e.statusBarHeight+45
					// this.$AppEntryController.handleH5BrowserAddressBarAuth();
					// #endif
				}
			})
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
