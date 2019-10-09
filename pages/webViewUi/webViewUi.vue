<template>
	<view>
		<!-- #ifndef APP-PLUS -->
			<web-view :src="getBreakUrl"></web-view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
			<view></view>
		<!-- #endif -->
	</view>
</template>

<script>
	import chache from '@/common/utils/storage'
	import utils from '@/common/utils/'
	export default {
		name:'webViewUi',
		data() {
			return {
				
			}
		},
		onLoad(option){
			uni.setNavigationBarTitle({
				title:!option.title?'http://****.com':option.title
			})
		},
		onReady(){
			let wv;
			// #ifdef APP-PLUS
			wv = plus.webview.create("","custom-webview",{
				plusrequire:"none", 
				'uni-app': 'none', 
				top:uni.getSystemInfoSync().statusBarHeight
			})
			wv.loadURL(this.getBreakUrl)
			var currentWebview = this.$mp.page.$getAppWebview() 
			currentWebview.append(wv);
			setTimeout(function() {
				console.log(wv.getStyle())
			}, 1000);
		// #endif
		},
		computed:{
			getBreakUrl(){
				return chache.has('baseUrl')?chache.get('baseUrl'):'http://baidu.com'
			}
		}
	}
</script>

<style>

</style>
